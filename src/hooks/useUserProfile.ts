import { useState, useCallback, useEffect } from 'react';
import { UserProfile, Badge, WasteItem } from '../types/index';
import { StorageService } from '../services/storageService';
import { EcoPointsEngine } from '../services/ecoPointsEngine';

export interface UseUserProfileReturn {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addWasteItem: (item: WasteItem) => void;
  addBadge: (badge: Badge) => void;
  getCurrentLevel: () => number;
  getPointsToNextLevel: () => number;
  getCarbonSaved: () => number;
  getTotalEcoPoints: () => number;
}

export function useUserProfile(userId: string): UseUserProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ecoEngine = new EcoPointsEngine();

  // Load profile on mount
  useEffect(() => {
    const loadProfile = () => {
      try {
        let userProfile = StorageService.getUserProfile(userId);

        if (!userProfile) {
          const username = `user_${userId.slice(0, 8)}`;
          userProfile = StorageService.createDefaultProfile(userId, username);
          StorageService.saveUserProfile(userProfile);
        }

        setProfile(userProfile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  // Update profile
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    if (!profile) return;

    const updated = { ...profile, ...updates };
    StorageService.saveUserProfile(updated);
    setProfile(updated);
  }, [profile]);

  // Add waste item
  const addWasteItem = useCallback((item: WasteItem) => {
    if (!profile) return;

    const updated = StorageService.addWasteItem(profile, item);
    setProfile(updated);
  }, [profile]);

  // Add badge
  const addBadge = useCallback((badge: Badge) => {
    if (!profile) return;

    const hasBadge = profile.badges.some(b => b.id === badge.id);
    if (!hasBadge) {
      const updated = {
        ...profile,
        badges: [...profile.badges, badge]
      };
      StorageService.saveUserProfile(updated);
      setProfile(updated);
    }
  }, [profile]);

  // Get current level
  const getCurrentLevel = useCallback(() => {
    if (!profile) return 1;
    return ecoEngine.calculateLevel(profile.totalEcoPoints);
  }, [profile]);

  // Get points to next level
  const getPointsToNextLevel = useCallback(() => {
    if (!profile) return 500;
    return ecoEngine.pointsToNextLevel(profile.totalEcoPoints);
  }, [profile]);

  // Get carbon saved
  const getCarbonSaved = useCallback(() => {
    if (!profile) return 0;
    return ecoEngine.calculateCarbonSaved(profile.wasteClassifications);
  }, [profile]);

  // Get total eco points
  const getTotalEcoPoints = useCallback(() => {
    return profile?.totalEcoPoints || 0;
  }, [profile]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    addWasteItem,
    addBadge,
    getCurrentLevel,
    getPointsToNextLevel,
    getCarbonSaved,
    getTotalEcoPoints
  };
}