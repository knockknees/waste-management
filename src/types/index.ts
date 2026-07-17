// Core types for waste management app

export interface WasteItem {
  id: string;
  objectName: string;
  material: MaterialType;
  imageUrl: string;
  timestamp: Date;
  ecoPoints: number;
  classification: WasteClassification;
}

export interface WasteClassification {
  reduce?: string[];
  reuse?: string[];
  recycle?: string[];
  dispose?: string[];
  priority: 'reduce' | 'reuse' | 'recycle' | 'dispose';
}

export type MaterialType = 
  | 'plastic'
  | 'paper'
  | 'glass'
  | 'metal'
  | 'organic'
  | 'textile'
  | 'electronics'
  | 'hazardous'
  | 'mixed';

export interface UserProfile {
  id: string;
  username: string;
  totalEcoPoints: number;
  wasteClassifications: WasteItem[];
  badges: Badge[];
  level: number;
  createdAt: Date;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  unlockedAt?: Date;
}

export interface TipCategory {
  id: string;
  title: string;
  description: string;
  tips: Tip[];
  material: MaterialType;
}

export interface Tip {
  id: string;
  title: string;
  description: string;
  category: 'reduce' | 'reuse' | 'recycle';
  impact: string;
}

export interface AnalyticsData {
  totalWasteScanned: number;
  wasteByMaterial: Record<MaterialType, number>;
  wasteByPriority: Record<'reduce' | 'reuse' | 'recycle' | 'dispose', number>;
  ecoPointsTrend: DailyTrend[];
  carbonFootprintSaved: number;
}

export interface DailyTrend {
  date: Date;
  points: number;
  itemsScanned: number;
}