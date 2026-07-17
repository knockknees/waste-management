import React, { useState } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useWasteHistory } from '../hooks/useWasteHistory';
import { ImageUploader } from './ImageUploader';
import { ResultDisplay } from './ResultDisplay';
import { WasteItem } from '../types/index';
import '../styles/Dashboard.css';

interface DashboardProps {
  userId: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  const { profile, loading: profileLoading, getTotalEcoPoints, getCurrentLevel, getCarbonSaved } = useUserProfile(userId);
  const { items, analytics, addItem } = useWasteHistory(userId);
  const [classificationResult, setClassificationResult] = useState<WasteItem | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'stats'>('upload');

  if (profileLoading) {
    return <div className="loading-spinner">Loading dashboard...</div>;
  }

  const handleClassificationResult = (result: WasteItem) => {
    setClassificationResult(result);
  };

  const handleSaveResult = (item: WasteItem) => {
    addItem(item);
    setClassificationResult(null);
    setActiveTab('stats');
  };

  const handleDismissResult = () => {
    setClassificationResult(null);
  };

  const totalPoints = getTotalEcoPoints();
  const currentLevel = getCurrentLevel();
  const carbonSaved = getCarbonSaved();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🌍 Waste Management System</h1>
          <div className="user-stats">
            <div className="stat">
              <span className="label">Level</span>
              <span className="value">{currentLevel}</span>
            </div>
            <div className="stat">
              <span className="label">Eco Points</span>
              <span className="value">{totalPoints}</span>
            </div>
            <div className="stat">
              <span className="label">CO₂ Saved</span>
              <span className="value">{carbonSaved.toFixed(1)}kg</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button
          className={`nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          📸 Upload & Classify
        </button>
        <button
          className={`nav-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          📋 History ({items.length})
        </button>
        <button
          className={`nav-btn ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          📊 Statistics
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'upload' && (
          <div className="tab-content">
            <h2>Classify Your Waste</h2>
            <ImageUploader
              onClassified={handleClassificationResult}
              onError={(error) => console.error(error)}
            />
            
            {classificationResult && (
              <ResultDisplay
                result={classificationResult}
                onDismiss={handleDismissResult}
                onSave={handleSaveResult}
              />
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="tab-content">
            <h2>Waste Classification History</h2>
            {items.length === 0 ? (
              <p className="empty-state">No waste items classified yet. Start by uploading an image!</p>
            ) : (
              <div className="history-list">
                {items.map((item) => (
                  <div key={item.id} className="history-item">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.objectName} className="history-thumbnail" />
                    )}
                    <div className="history-info">
                      <h4>{item.objectName}</h4>
                      <p className="material">{item.material}</p>
                      <small>{new Date(item.timestamp).toLocaleDateString()}</small>
                    </div>
                    <div className="history-stats">
                      <span className="priority">{item.classification.priority.toUpperCase()}</span>
                      <span className="points">+{item.ecoPoints}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="tab-content">
            <h2>Your Impact Statistics</h2>
            {analytics ? (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Items Scanned</h3>
                  <p className="big-number">{analytics.totalWasteScanned}</p>
                </div>

                <div className="stat-card">
                  <h3>Material Breakdown</h3>
                  <div className="material-chart">
                    {Object.entries(analytics.wasteByMaterial).map(([material, count]) => (
                      <div key={material} className="chart-item">
                        <span>{material}</span>
                        <div className="chart-bar">
                          <div className="bar-fill" style={{
                            width: `${(count / analytics.totalWasteScanned) * 100}%`
                          }}></div>
                        </div>
                        <span>{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="stat-card">
                  <h3>Priority Distribution</h3>
                  <div className="priority-chart">
                    <div className="priority-bar reduce">
                      <span>Reduce</span>
                      <span>{analytics.wasteByPriority.reduce}</span>
                    </div>
                    <div className="priority-bar reuse">
                      <span>Reuse</span>
                      <span>{analytics.wasteByPriority.reuse}</span>
                    </div>
                    <div className="priority-bar recycle">
                      <span>Recycle</span>
                      <span>{analytics.wasteByPriority.recycle}</span>
                    </div>
                    <div className="priority-bar dispose">
                      <span>Dispose</span>
                      <span>{analytics.wasteByPriority.dispose}</span>
                    </div>
                  </div>
                </div>

                <div className="stat-card full">
                  <h3>Environmental Impact</h3>
                  <p className="impact">
                    🌱 You've saved approximately <strong>{analytics.carbonFootprintSaved.toFixed(2)} kg</strong> of CO₂ through proper waste management!
                  </p>
                </div>
              </div>
            ) : (
              <p className="empty-state">No statistics available yet. Start classifying waste items!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};