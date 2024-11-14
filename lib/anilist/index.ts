const ANILIST_API_ENDPOINT = 'https://graphql.anilist.co'

import { AnimeDetails } from '@/types/anime';

export async function fetchAnilist<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const response = await fetch(ANILIST_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(json.errors[0].message)
  }

  return json.data
}

export const TRENDING_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        sort: TRENDING_DESC, 
        type: ANIME, 
        status: RELEASING, 
        isAdult: false,
        countryOfOrigin: "JP"
      ) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        description
        episodes
        genres
        averageScore
        popularity
      }
    }
  }
`

export const UPCOMING_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        sort: POPULARITY_DESC, 
        type: ANIME, 
        status: NOT_YET_RELEASED, 
        isAdult: false,
        countryOfOrigin: "JP"
      ) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        description
        episodes
        genres
        averageScore
        popularity
      }
    }
  }
`

export const POPULAR_SEASON_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(
        sort: POPULARITY_DESC, 
        type: ANIME, 
        status: RELEASING, 
        season: WINTER, 
        seasonYear: 2024,
        isAdult: false,
        countryOfOrigin: "JP"
      ) {
        id
        title {
          romaji
          english
          native
        }
        coverImage {
          large
          medium
        }
        description
        episodes
        genres
        averageScore
        popularity
      }
    }
  }
`

export const ANIME_DETAIL_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      extraLarge
      large
      medium
    }
    bannerImage
    description
    status
    episodes
    season
    seasonYear
    genres
    averageScore
    popularity
    trailer {
      id
      site
      thumbnail
    }
    characters(page: 1, perPage: 6) {
      edges {
        node {
          id
          name {
            full
          }
          image {
            large
          }
        }
        voiceActors(language: JAPANESE, sort: RELEVANCE) {
          id
          name {
            full
            native
          }
          image {
            large
            medium
          }
          language
        }
        role
      }
    }
  }
}`;

export async function getPopularAnime() {
  const query = `
    query {
      Page(page: 1, perPage: 10) {
        media(sort: POPULARITY_DESC, type: ANIME) {
          id
          title {
            userPreferred
          }
          coverImage {
            large
          }
          popularity
        }
      }
    }
  `;

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch popular anime');
  }

  return response.json().then(data => data.data);
}



export async function getAnimeDetails(id: number): Promise<AnimeDetails> {
  try {
    const data = await fetchAnilist<{ Media: AnimeDetails }>(ANIME_DETAIL_QUERY, { id });
    return data.Media;
  } catch (error) {
    console.error('Error fetching anime details:', error);
    throw error;
  }
} 