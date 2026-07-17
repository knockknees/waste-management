import { WasteItem, Badge, UserProfile } from '../types/index';

export interface EcoPointsConfig {
  basePoints: number;
  streakBonus: number;
  milestoneBonus: Record<number, number>;
  badgeThresholds: Record<string, number>;
}

export const DEFAULT_CONFIG: EcoPointsConfig = {
  basePoints: 50,
  streakBonus: 10,
  milestoneBonus: {
    100: 50,
    500: 250,
    1000: 500,
    5000: 2000
  },
  badgeThresholds: {
    'eco_warrior': 500,
    'sustainability_champion': 1500,
    'planet_protector': 3000,
    'waste_master': 5000,
    'recycling_rockstar': 2000,
    'reduce_ruler': 1000,
    'reuse_guru': 1200
  }
};

export class EcoPointsEngine {
  private config: EcoPointsConfig;

  constructor(config: Partial<EcoPointsConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Calculate points for a waste item
   */
  calculatePoints(wasteItem: WasteItem, streak: number = 0): number {
    let points = wasteItem.ecoPoints || this.config.basePoints;

    // Apply streak bonus
    const streakBonus = Math.floor(streak / 5) * this.config.streakBonus;
    points += streakBonus;

    return points;
  }

  /**
   * Check and unlock badges based on total points
   */
  checkBadges(totalPoints: number, existingBadges: Badge[] = []): Badge[] {
    const newBadges = [...existingBadges];
    const badgeDefinitions = this.getBadgeDefinitions();

    badgeDefinitions.forEach((badgeDef) => {
      const alreadyHas = existingBadges.some(b => b.id === badgeDef.id);

      if (!alreadyHas && totalPoints >= this.config.badgeThresholds[badgeDef.id]) {
        newBadges.push({
          ...badgeDef,
          unlockedAt: new Date()
        });
      }
    });

    return newBadges;
  }

  /**
   * Calculate user level based on points
   */
  calculateLevel(totalPoints: number): number {
    const pointsPerLevel = 500;
    return Math.floor(totalPoints / pointsPerLevel) + 1;
  }

  /**
   * Get points needed for next level
   */
  pointsToNextLevel(totalPoints: number): number {
    const currentLevel = this.calculateLevel(totalPoints);
    const pointsForCurrentLevel = (currentLevel - 1) * 500;
    const pointsForNextLevel = currentLevel * 500;
    return pointsForNextLevel - totalPoints;
  }

  /**
   * Calculate carbon footprint saved (estimate)
   */
  calculateCarbonSaved(wasteItems: WasteItem[]): number {
    // Rough estimates in kg CO2 per item
    const carbonByPriority: Record<string, number> = {
      'reduce': 2.5,
      'reuse': 1.5,
      'recycle': 0.8,
      'dispose': 0
    };

    return wasteItems.reduce((total, item) => {
      return total + (carbonByPriority[item.classification.priority] || 0);
    }, 0);
  }

  /**
   * Get bonus points for milestones
   */
  getMilestoneBonus(totalPoints: number): number {
    let bonus = 0;

    Object.entries(this.config.milestoneBonus).forEach(([threshold, reward]) => {
      if (totalPoints >= Number(threshold)) {
        bonus = Math.max(bonus, reward);
      }
    });

    return bonus;
  }

  /**
   * Calculate streak multiplier
   */
  getStreakMultiplier(streak: number): number {
    if (streak === 0) return 1;
    if (streak < 7) return 1.1;
    if (streak < 30) return 1.25;
    if (streak < 60) return 1.5;
    return 2;
  }

  /**
   * Get all available badges
   */
  private getBadgeDefinitions(): Badge[] {
    return [
      {
        id: 'eco_warrior',
        name: 'Eco Warrior',
        description: 'Classified 500 items',
        iconUrl: '🛡️'
      },
      {
        id: 'recycling_rockstar',
        name: 'Recycling Rockstar',
        description: 'Earned 2000 eco points',
        iconUrl: '⭐'
      },
      {
        id: 'reduce_ruler',
        name: 'Reduce Ruler',
        description: 'Focused on reduction - 1000 points',
        iconUrl: '👑'
      },
      {
        id: 'reuse_guru',
        name: 'Reuse Guru',
        description: 'Mastered reuse - 1200 points',
        iconUrl: '🧠'
      },
      {
        id: 'sustainability_champion',
        name: 'Sustainability Champion',
        description: 'Earned 1500 eco points',
        iconUrl: '🏆'
      },
      {
        id: 'planet_protector',
        name: 'Planet Protector',
        description: 'Earned 3000 eco points',
        iconUrl: '🌍'
      },
      {
        id: 'waste_master',
        name: 'Waste Master',
        description: 'Earned 5000 eco points',
        iconUrl: '👨‍🎓'
      }
    ];
  }

  /**
   * Generate achievement summary
   */
  getAchievementSummary(userProfile: UserProfile): {
    totalPoints: number;
    currentLevel: number;
    pointsToNextLevel: number;
    totalBadges: number;
    carbonSaved: number;
  } {
    const totalPoints = userProfile.totalEcoPoints;
    const carbonSaved = this.calculateCarbonSaved(userProfile.wasteClassifications);

    return {
      totalPoints,
      currentLevel: this.calculateLevel(totalPoints),
      pointsToNextLevel: this.pointsToNextLevel(totalPoints),
      totalBadges: userProfile.badges.length,
      carbonSaved
    };
  }
}