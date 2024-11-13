const ANILIST_API_ENDPOINT = 'https://graphql.anilist.co'

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