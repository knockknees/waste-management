import React, { useRef, useState } from 'react';
import { useImageClassifier } from '../hooks/useImageClassifier';
import '../styles/ImageUploader.css';

interface ImageUploaderProps {
  onClassified: (result: any) => void;
  onError?: (error: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onClassified, onError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { classify, isLoading, error, progress } = useImageClassifier();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    // Validate file
    if (!file.type.startsWith('image/')) {
      const errorMsg = 'Please select a valid image file';
      onError?.(errorMsg);
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      const errorMsg = 'Image size must be less than 5MB';
      onError?.(errorMsg);
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Classify
    try {
      const result = await classify(file);
      onClassified(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Classification failed';
      onError?.(errorMsg);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  return (
    <div className="image-uploader">
      <div
        className="upload-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          disabled={isLoading}
          className="hidden-input"
        />

        {previewUrl && !isLoading && (
          <img src={previewUrl} alt="Preview" className="preview-image" />
        )}

        {!previewUrl && !isLoading && (
          <div className="upload-placeholder">
            <div className="icon">📸</div>
            <p>Drop an image here or click to select</p>
            <small>Supported formats: JPG, PNG, GIF, WebP</small>
          </div>
        )}

        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Classifying image...</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <small>{progress}%</small>
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};