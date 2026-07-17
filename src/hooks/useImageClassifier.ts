import { useState, useCallback, useEffect } from 'react';
import { WasteItem } from '../types/index';
import { getImageClassifier } from '../services/imageClassifier';

export interface UseImageClassifierReturn {
  classify: (file: File) => Promise<WasteItem>;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  result: WasteItem | null;
  progress: number;
}

export function useImageClassifier(): UseImageClassifierReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [result, setResult] = useState<WasteItem | null>(null);
  const [progress, setProgress] = useState(0);

  // Initialize classifier on mount
  useEffect(() => {
    const init = async () => {
      try {
        const classifier = getImageClassifier();
        await classifier.initialize();
        setInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize classifier');
        setInitialized(false);
      }
    };

    init();
  }, []);

  // Classify image
  const classify = useCallback(
    async (file: File): Promise<WasteItem> => {
      if (!initialized) {
        throw new Error('Classifier not initialized');
      }

      setIsLoading(true);
      setError(null);
      setProgress(0);

      try {
        setProgress(25);
        const classifier = getImageClassifier();

        setProgress(50);
        const wasteItem = await classifier.classifyFromFile(file);

        setProgress(100);
        setResult(wasteItem);

        return wasteItem;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Classification failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
        setProgress(0);
      }
    },
    [initialized]
  );

  return {
    classify,
    isLoading,
    error,
    initialized,
    result,
    progress
  };
}