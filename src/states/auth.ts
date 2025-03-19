import { proxy, subscribe } from 'valtio';
import { loginService } from '../api/services/login.service';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: {
    id: string | null;
    name: string | null;
    role: string | null;
  };
  isLoading: boolean;
  error: string | null;
}

export const authState = proxy<AuthState>({
  isAuthenticated: false,
  token: null,
  user: {
    id: null,
    name: null,
    role: null,
  },
  isLoading: false,
  error: null,
});

export const authActions = {
  // Check if user is already authenticated (on app load)
  checkAuth: async (): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    authState.isLoading = true;
    try {
      const response = await loginService.verifyToken(token);
      if (response.valid && response.user) {
        authState.isAuthenticated = true;
        authState.token = token;
        authState.user = {
          id: response.user.id,
          name: response.user.name,
          role: response.user.role,
        };
      } else {
        // Token is invalid, clear local storage
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('auth_token');
    } finally {
      authState.isLoading = false;
    }
  },

  // Login user
  login: async (username: string, password: string): Promise<boolean> => {
    authState.isLoading = true;
    authState.error = null;

    try {
      const response = await loginService.login({ username, password });
      authState.isAuthenticated = true;
      authState.token = response.token;
      authState.user = {
        id: response.user.id,
        name: response.user.name,
        role: response.user.role,
      };

      // Save token to local storage
      localStorage.setItem('auth_token', response.token);
      return true;
    } catch (error) {
      authState.error = error instanceof Error ? error.message : 'Login failed';
      return false;
    } finally {
      authState.isLoading = false;
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    if (authState.token) {
      try {
        await loginService.logout(authState.token);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    // Clear auth state
    authState.isAuthenticated = false;
    authState.token = null;
    authState.user = {
      id: null,
      name: null,
      role: null,
    };

    // Remove token from local storage
    localStorage.removeItem('auth_token');
  },
};