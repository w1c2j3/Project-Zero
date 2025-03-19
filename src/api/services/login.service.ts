import { LoginCredentials, LoginResponse, TokenVerifyResponse } from '../interfaces/login.interface';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const loginService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  verifyToken: async (token: string): Promise<TokenVerifyResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return { valid: false };
      }

      return await response.json();
    } catch (error) {
      console.error('Token verification error:', error);
      return { valid: false };
    }
  },

  logout: async (token: string): Promise<void> => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};