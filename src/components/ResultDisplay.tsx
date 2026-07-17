import React from 'react';
import { WasteItem } from '../types/index';
import '../styles/ResultDisplay.css';

interface ResultDisplayProps {
  result: WasteItem;
  onDismiss: () => void;
  onSave?: (item: WasteItem) => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onDismiss, onSave }) => {
  const { objectName, classification, material, ecoPoints } = result;
  const { reduce, reuse, recycle, dispose, priority } = classification;

  const getPriorityColor = (priority: string): string => {
    const colors: Record<string, string> = {
      'reduce': '#27ae60',
      'reuse': '#f39c12',
      'recycle': '#3498db',
      'dispose': '#e74c3c'
    };
    return colors[priority] || '#95a5a6';
  };

  const getPriorityIcon = (priority: string): string => {
    const icons: Record<string, string> = {
      'reduce': '📉',
      'reuse': '♻️',
      'recycle': '🔄',
      'dispose': '🗑️'
    };
    return icons[priority] || '❓';
  };

  return (
    <div className="result-display">
      <div className="result-card">
        {result.imageUrl && (
          <img src={result.imageUrl} alt={objectName} className="result-image" />
        )}

        <div className="result-header">
          <h2>{objectName}</h2>
          <span className="material-badge">{material}</span>
        </div>

        <div className="priority-section" style={{ borderLeftColor: getPriorityColor(priority) }}>
          <div className="priority-header">
            <span className="priority-icon">{getPriorityIcon(priority)}</span>
            <div>
              <h3>Top Priority: {priority.toUpperCase()}</h3>
              <p>This should be your first choice for this item</p>
            </div>
          </div>
          <div className="eco-points">
            <span className="points-badge">+{ecoPoints} eco points</span>
          </div>
        </div>

        <div className="hierarchy-section">
          {reduce && (
            <div className="hierarchy-item reduce">
              <h4>🛑 REDUCE</h4>
              <ul>
                {reduce.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
              <small>Prevent the problem from the start</small>
            </div>
          )}

          {reuse && (
            <div className="hierarchy-item reuse">
              <h4>♻️ REUSE</h4>
              <ul>
                {reuse.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
              <small>Extend the life of the item</small>
            </div>
          )}

          {recycle && (
            <div className="hierarchy-item recycle">
              <h4>🔄 RECYCLE</h4>
              <ul>
                {recycle.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
              <small>Process into new materials</small>
            </div>
          )}

          {dispose && (
            <div className="hierarchy-item dispose">
              <h4>🗑️ DISPOSE</h4>
              <ul>
                {dispose.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
              <small>Last resort option</small>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button onClick={onDismiss} className="btn btn-secondary">
            Close
          </button>
          {onSave && (
            <button onClick={() => onSave(result)} className="btn btn-primary">
              Save to History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};