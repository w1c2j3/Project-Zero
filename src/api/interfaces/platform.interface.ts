export interface Character {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  isSelected?: boolean;
}

export interface CharactersResponse {
  characters: Character[];
}

export interface CharacterDetailResponse {
  character: Character;
}

export interface UserStats {
  activeUsers: number;
  totalUsers: number;
  lastUpdated: string;
}