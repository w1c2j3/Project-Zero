import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import { authState, authActions } from '../../state';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const auth = useSnapshot(authState);

  useEffect(() => {
    // Check authentication on mount
    authActions.checkAuth();
  }, []);

  // Check if current route is login page
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">miHoYa</Link>
        </div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>首页</Link>
          <Link to="/characters" className={styles.navLink}>产品信息</Link>
          <Link to="/about" className={styles.navLink}>了解我们</Link>
          <Link to="/join" className={styles.navLink}>加入我们</Link>
          <Link to="/news" className={styles.navLink}>新闻动态</Link>
          <button className={styles.langButton}>CN</button>
        </nav>

        <div className={styles.actions}>
          {auth.isAuthenticated ? (
            <button
              className={styles.authButton}
              onClick={() => authActions.logout()}
            >
              退出
            </button>
          ) : (
            !isLoginPage && (
              <Link to="/login" className={styles.authButton}>
                登录
              </Link>
            )
          )}
        </div>
      </header>

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};