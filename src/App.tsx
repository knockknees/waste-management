import React, { useEffect, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import './styles/App.css';

interface AppProps {
  userId?: string;
}

export const App: React.FC<AppProps> = ({ userId = 'user_default' }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="app-loading">Loading...</div>;
  }

  return (
    <div className="app">
      <Dashboard userId={userId} />
    </div>
  );
};

export default App;