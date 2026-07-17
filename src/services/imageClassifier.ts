import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { getWasteClassification, getMaterialType } from '../utils/wasteDatabase';
import { WasteItem, WasteClassification } from '../types/index';

export class ImageClassifier {
  private model: mobilenet.MobileNet | null = null;
  private isModelLoaded = false;

  /**
   * Initialize the MobileNet model
   */
  async initialize(): Promise<void> {
    try {
      if (!this.isModelLoaded) {
        this.model = await mobilenet.load();
        this.isModelLoaded = true;
        console.log('MobileNet model loaded successfully');
      }
    } catch (error) {
      console.error('Failed to load MobileNet model:', error);
      throw new Error('Could not initialize image classifier');
    }
  }

  /**
   * Classify an image and return waste classification
   */
  async classifyImage(imageElement: HTMLImageElement): Promise<WasteItem> {
    if (!this.isModelLoaded || !this.model) {
      await this.initialize();
    }

    try {
      // Get predictions from MobileNet
      const predictions = await this.model!.classify(imageElement, 5);

      if (predictions.length === 0) {
        throw new Error('Could not classify the image');
      }

      // Use the top prediction
      const topPrediction = predictions[0];
      const objectName = topPrediction.className;
      const confidence = topPrediction.probability;

      // Get waste classification from database
      const classification = getWasteClassification(objectName);
      const materialType = getMaterialType(objectName);

      // Calculate eco points based on priority
      const ecoPoints = this.calculateEcoPoints(classification.priority, confidence);

      // Create waste item
      const wasteItem: WasteItem = {
        id: this.generateId(),
        objectName,
        material: materialType,
        imageUrl: imageElement.src,
        timestamp: new Date(),
        ecoPoints,
        classification
      };

      return wasteItem;
    } catch (error) {
      console.error('Classification error:', error);
      throw error;
    }
  }

  /**
   * Classify from image file input
   */
  async classifyFromFile(file: File): Promise<WasteItem> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        try {
          const img = new Image();
          img.onload = async () => {
            try {
              const wasteItem = await this.classifyImage(img);
              resolve(wasteItem);
            } catch (error) {
              reject(error);
            }
          };
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = e.target?.result as string;
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Classify from URL
   */
  async classifyFromUrl(url: string): Promise<WasteItem> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = async () => {
        try {
          const wasteItem = await this.classifyImage(img);
          resolve(wasteItem);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image from URL'));
      img.src = url;
    });
  }

  /**
   * Calculate eco points based on waste hierarchy
   */
  private calculateEcoPoints(priority: string, confidence: number): number {
    const basePoints: Record<string, number> = {
      'reduce': 100,
      'reuse': 75,
      'recycle': 50,
      'dispose': 25
    };

    const points = basePoints[priority] || 25;
    return Math.round(points * confidence);
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `waste_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Dispose model to free memory
   */
  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.isModelLoaded = false;
      console.log('MobileNet model disposed');
    }
  }
}

// Singleton instance
let classifierInstance: ImageClassifier | null = null;

export function getImageClassifier(): ImageClassifier {
  if (!classifierInstance) {
    classifierInstance = new ImageClassifier();
  }
  return classifierInstance;
}