// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { authState } from './state';
import { MainLayout } from './components/layout/MainLayout';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Characters } from './pages/Characters/Characters';
import { Stats } from './pages/Stats/Stats';
import './styles/global.scss';

// Protected route component
const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const auth = useSnapshot(authState);
  const { isAuthenticated, isLoading } = auth;

  // Show loading state
  if (isLoading) {
    return <div className="loading">加载中...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{element}</>;
};

export const App: React.FC = () => {
  const platform = useSnapshot(authState);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/characters"
            element={
              platform.isAuthenticated ?
                <Characters /> :
                <Navigate to="/login" replace />
            }
          />
          <Route
            path="/stats"
            element={<ProtectedRoute element={<Stats />} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};