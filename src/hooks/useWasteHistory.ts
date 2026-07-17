import { useState, useCallback, useEffect } from 'react';
import { WasteItem, AnalyticsData } from '../types/index';
import { StorageService } from '../services/storageService';

export interface UseWasteHistoryReturn {
  items: WasteItem[];
  analytics: AnalyticsData | null;
  addItem: (item: WasteItem) => void;
  removeItem: (itemId: string) => void;
  clearHistory: () => void;
  getItemsByMaterial: (material: string) => WasteItem[];
  getItemsByPriority: (priority: string) => WasteItem[];
  exportHistory: () => string;
  importHistory: (jsonData: string) => boolean;
  loading: boolean;
}

export function useWasteHistory(userId: string): UseWasteHistoryReturn {
  const [items, setItems] = useState<WasteItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const profile = StorageService.getUserProfile(userId);
        if (profile) {
          setItems(profile.wasteClassifications);
        }

        const analyticsData = StorageService.getAnalytics();
        setAnalytics(analyticsData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  // Add item to history
  const addItem = useCallback((item: WasteItem) => {
    setItems(prev => {
      const updated = [...prev, item];
      return updated;
    });

    // Update analytics
    const updatedAnalytics = StorageService.updateAnalytics(item);
    setAnalytics(updatedAnalytics);
  }, []);

  // Remove item from history
  const removeItem = useCallback((itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setItems([]);
    StorageService.clearAllData();
    setAnalytics(null);
  }, []);

  // Get items by material
  const getItemsByMaterial = useCallback((material: string) => {
    return items.filter(item => item.material === material);
  }, [items]);

  // Get items by priority
  const getItemsByPriority = useCallback((priority: string) => {
    return items.filter(item => item.classification.priority === priority);
  }, [items]);

  // Export history
  const exportHistory = useCallback(() => {
    return StorageService.exportData(userId);
  }, [userId]);

  // Import history
  const importHistory = useCallback((jsonData: string) => {
    const success = StorageService.importData(jsonData);
    if (success) {
      const profile = StorageService.getUserProfile(userId);
      if (profile) {
        setItems(profile.wasteClassifications);
      }
      const analyticsData = StorageService.getAnalytics();
      setAnalytics(analyticsData);
    }
    return success;
  }, [userId]);

  return {
    items,
    analytics,
    addItem,
    removeItem,
    clearHistory,
    getItemsByMaterial,
    getItemsByPriority,
    exportHistory,
    importHistory,
    loading
  };
}