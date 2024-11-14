export interface AnimeTitle {
  romaji: string;
  english: string;
  native: string;
}

export interface AnimeCoverImage {
  extraLarge: string;
  large: string;
  medium: string;
}

export interface AnimeTrailer {
  id?: string;
  site?: string;
  thumbnail?: string;
}

export enum CharacterRole {
  MAIN = 'MAIN',
  SUPPORTING = 'SUPPORTING',
  BACKGROUND = 'BACKGROUND'
}

export interface Character {
  id: number;
  name: {
    full: string;
    native?: string;
    alternative?: string[];
  };
  image: {
    large: string;
    medium: string;
  };
  description?: string;
  gender?: string;
  age?: string;
}

export interface Staff {
  id: number;
  name: {
    full: string;
    native?: string;
  };
  image: {
    large: string;
    medium: string;
  };
  language?: string;
}

export interface MediaCharacter {
  id: number;
  role: CharacterRole;
  roleNotes?: string;
  dubGroup?: string;
  characterName?: string;
  character: Character;
  voiceActor?: Staff;
}

export interface AnimeCharacter {
  node: {
    id: number;
    name: {
      full: string;
    };
    image: {
      large: string;
    };
  };
  voiceActors?: Staff[];
  role: CharacterRole;
}

export interface AnimeDetails {
  id: number;
  title: AnimeTitle;
  coverImage: AnimeCoverImage;
  bannerImage?: string;
  description: string;
  status: string;
  episodes?: number;
  season: string;
  seasonYear: number;
  genres: string[];
  averageScore?: number;
  popularity: number;
  trailer?: AnimeTrailer;
  characters: {
    edges: AnimeCharacter[];
  };
} 