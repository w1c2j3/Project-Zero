import { CharactersResponse, CharacterDetailResponse, UserStats } from '../interfaces/platform.interface';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const platformService = {
  getCharacters: async (token?: string): Promise<CharactersResponse> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/platform/characters`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get characters');
      }

      return await response.json();
    } catch (error) {
      console.error('Get characters error:', error);
      throw error;
    }
  },

  getCharacterDetail: async (characterId: string, token?: string): Promise<CharacterDetailResponse> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/platform/characters/${characterId}`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get character details');
      }

      return await response.json();
    } catch (error) {
      console.error('Get character detail error:', error);
      throw error;
    }
  },

  getUserStats: async (token?: string): Promise<UserStats> => {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_URL}/platform/stats`, {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to get user stats');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user stats error:', error);
      throw error;
    }
  }
};