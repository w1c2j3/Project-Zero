import { proxy } from 'valtio';
import { Character } from '../api/interfaces/platform.interface';
import { platformService } from '../api/services/platform.service';
import { authState } from './auth';

interface PlatformState {
  characters: Character[];
  selectedCharacter: Character | null;
  isDevelopmentMode: boolean;
  activeUsers: number;
  isLoading: boolean;
  error: string | null;
}

export const platformState = proxy<PlatformState>({
  characters: [],
  selectedCharacter: null,
  isDevelopmentMode: true,
  activeUsers: 0,
  isLoading: false,
  error: null,
});

export const platformActions = {
  // Fetch characters
  fetchCharacters: async (): Promise<boolean> => {
    platformState.isLoading = true;
    platformState.error = null;

    try {
      const response = await platformService.getCharacters(authState.token || undefined);
      platformState.characters = response.characters;
      return true;
    } catch (error) {
      platformState.error = error instanceof Error ? error.message : 'Failed to fetch characters';
      return false;
    } finally {
      platformState.isLoading = false;
    }
  },

  // Select character
  selectCharacter: async (characterId: string): Promise<boolean> => {
    if (platformState.selectedCharacter?.id === characterId) return true;

    platformState.isLoading = true;
    platformState.error = null;

    try {
      const response = await platformService.getCharacterDetail(characterId, authState.token || undefined);
      platformState.selectedCharacter = response.character;

      // Update selection status for all characters
      platformState.characters = platformState.characters.map(char => ({
        ...char,
        isSelected: char.id === characterId
      }));

      return true;
    } catch (error) {
      platformState.error = error instanceof Error ? error.message : 'Failed to select character';
      return false;
    } finally {
      platformState.isLoading = false;
    }
  },

  // Toggle development mode
  toggleMode: (): void => {
    platformState.isDevelopmentMode = !platformState.isDevelopmentMode;
  },

  // Fetch active users
  fetchActiveUsers: async (): Promise<boolean> => {
    try {
      const stats = await platformService.getUserStats(authState.token || undefined);
      platformState.activeUsers = stats.activeUsers;
      return true;
    } catch (error) {
      console.error('Failed to fetch active users:', error);
      return false;
    }
  },
};