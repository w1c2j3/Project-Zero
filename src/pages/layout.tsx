// src/app/layout.tsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { authState, authActions } from '../states/auth';
import './globals.sass';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const auth = useSnapshot(authState);

  useEffect(() => {
    // Check authentication on mount
    authActions.checkAuth();
  }, []);

  // Check if current route is login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="layout">
      <header className="header">
        <div className="header__logo">
          <Link to="/">miHoYa</Link>
        </div>

        <nav className="header__nav">
          <Link to="/" className="header__nav-link">首页</Link>
          <Link to="/platform" className="header__nav-link">产品信息</Link>
          <Link to="/about" className="header__nav-link">了解我们</Link>
          <Link to="/join" className="header__nav-link">加入我们</Link>
          <Link to="/news" className="header__nav-link">新闻动态</Link>
          <button className="header__lang-button">CN</button>
        </nav>

        <div className="header__actions">
          {auth.isAuthenticated ? (
            <button
              className="header__auth-button"
              onClick={authActions.logout}
            >
              退出
            </button>
          ) : (
            !isLoginPage && (
              <Link to="/login" className="header__auth-button">
                登录
              </Link>
            )
          )}
        </div>
      </header>

      <main className="main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
