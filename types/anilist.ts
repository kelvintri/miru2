export interface AnimeTitle {
  romaji: string
  english: string | null
  native: string
}

export interface AnimeCoverImage {
  large: string
  medium: string
}

export interface AnimeMedia {
  id: number
  title: AnimeTitle
  coverImage: AnimeCoverImage
  description: string
  episodes: number
  genres: string[]
  averageScore: number
  popularity: number
}

export interface PageInfo {
  total: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
  perPage: number
}

export interface AnimePageResponse {
  Page: {
    pageInfo: PageInfo
    media: AnimeMedia[]
  }
} 