import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { platformState, platformActions, authState } from '../../states/auth';
import './platform.module.sass';

const UserStats: React.FC = () => {
  const platform = useSnapshot(platformState);
  const auth = useSnapshot(authState);

  useEffect(() => {
    // Fetch user stats on mount and then every 30 seconds
    platformActions.fetchActiveUsers();

    const interval = setInterval(() => {
      platformActions.fetchActiveUsers();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleMode = () => {
    // If switching to production mode, require auth
    if (platform.isDevelopmentMode && !auth.isAuthenticated) {
      alert('您需要登录才能切换到生产模式');
      return;
    }

    platformActions.toggleMode();
  };

  return (
    <div className="user-stats">
      <div className="user-stats__card">
        <h3 className="user-stats__title">当前在线用户</h3>
        <div className="user-stats__count">
          {platform.activeUsers}
        </div>
      </div>

      <div className="user-stats__card">
        <h3 className="user-stats__title">系统模式</h3>
        <div className="user-stats__mode">
          {platform.isDevelopmentMode ? '开发模式' : '生产模式'}
        </div>
        <button
          className="user-stats__toggle"
          onClick={handleToggleMode}
        >
          切换至{platform.isDevelopmentMode ? '生产模式' : '开发模式'}
        </button>

        {!platform.isDevelopmentMode && !auth.isAuthenticated && (
          <div className="user-stats__warning">
            注意：生产模式需要登录才能访问所有功能
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;
