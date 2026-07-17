import { WasteItem, UserProfile, AnalyticsData, DailyTrend } from '../types/index';

const STORAGE_KEYS = {
  USER_PROFILE: 'waste_mgmt_user_profile',
  WASTE_ITEMS: 'waste_mgmt_waste_items',
  ANALYTICS: 'waste_mgmt_analytics',
  SETTINGS: 'waste_mgmt_settings'
};

export class StorageService {
  /**
   * Save user profile to localStorage
   */
  static saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save user profile:', error);
    }
  }

  /**
   * Get user profile from localStorage
   */
  static getUserProfile(userId: string): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) {
        const profile = JSON.parse(data) as UserProfile;
        if (profile.id === userId) {
          return profile;
        }
      }
    } catch (error) {
      console.error('Failed to get user profile:', error);
    }
    return null;
  }

  /**
   * Create default user profile
   */
  static createDefaultProfile(userId: string, username: string): UserProfile {
    return {
      id: userId,
      username,
      totalEcoPoints: 0,
      wasteClassifications: [],
      badges: [],
      level: 1,
      createdAt: new Date()
    };
  }

  /**
   * Add waste item to profile
   */
  static addWasteItem(profile: UserProfile, item: WasteItem): UserProfile {
    const updated = {
      ...profile,
      wasteClassifications: [...profile.wasteClassifications, item],
      totalEcoPoints: profile.totalEcoPoints + item.ecoPoints
    };
    this.saveUserProfile(updated);
    return updated;
  }

  /**
   * Get all waste items for user
   */
  static getWasteItems(userId: string): WasteItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WASTE_ITEMS);
      if (data) {
        const items = JSON.parse(data) as WasteItem[];
        return items.filter(item => {
          // Filter by userId if stored
          return true;
        });
      }
    } catch (error) {
      console.error('Failed to get waste items:', error);
    }
    return [];
  }

  /**
   * Save analytics data
   */
  static saveAnalytics(analytics: AnalyticsData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }

  /**
   * Get analytics data
   */
  static getAnalytics(): AnalyticsData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
      if (data) {
        return JSON.parse(data) as AnalyticsData;
      }
    } catch (error) {
      console.error('Failed to get analytics:', error);
    }
    return null;
  }

  /**
   * Update analytics with new item
   */
  static updateAnalytics(item: WasteItem): AnalyticsData {
    let analytics = this.getAnalytics();

    if (!analytics) {
      analytics = {
        totalWasteScanned: 0,
        wasteByMaterial: {},
        wasteByPriority: {
          'reduce': 0,
          'reuse': 0,
          'recycle': 0,
          'dispose': 0
        },
        ecoPointsTrend: [],
        carbonFootprintSaved: 0
      };
    }

    // Update counts
    analytics.totalWasteScanned += 1;
    analytics.wasteByMaterial[item.material] = (analytics.wasteByMaterial[item.material] || 0) + 1;
    analytics.wasteByPriority[item.classification.priority] += 1;
    analytics.carbonFootprintSaved += this.estimateCarbon(item.classification.priority);

    // Update trend
    const today = new Date().toISOString().split('T')[0];
    const todayTrend = analytics.ecoPointsTrend.find(
      trend => trend.date.toString().split('T')[0] === today
    );

    if (todayTrend) {
      todayTrend.points += item.ecoPoints;
      todayTrend.itemsScanned += 1;
    } else {
      analytics.ecoPointsTrend.push({
        date: new Date(),
        points: item.ecoPoints,
        itemsScanned: 1
      });
    }

    this.saveAnalytics(analytics);
    return analytics;
  }

  /**
   * Estimate carbon saved
   */
  private static estimateCarbon(priority: string): number {
    const carbonMap: Record<string, number> = {
      'reduce': 2.5,
      'reuse': 1.5,
      'recycle': 0.8,
      'dispose': 0
    };
    return carbonMap[priority] || 0;
  }

  /**
   * Clear all data
   */
  static clearAllData(): void {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Export data as JSON
   */
  static exportData(userId: string): string {
    const profile = this.getUserProfile(userId);
    const analytics = this.getAnalytics();

    const exportData = {
      profile,
      analytics,
      exportedAt: new Date()
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Import data from JSON
   */
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);

      if (data.profile) {
        this.saveUserProfile(data.profile);
      }

      if (data.analytics) {
        this.saveAnalytics(data.analytics);
      }

      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}