import { 
  TRENDING_ANIME_QUERY, 
  UPCOMING_ANIME_QUERY, 
  POPULAR_SEASON_QUERY 
} from '@/src/lib/anilist'
import AnimeSection from '@/src/components/anime/AnimeSection'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <AnimeSection 
        title="TRENDING NOW" 
        query={TRENDING_ANIME_QUERY} 
      />
      <AnimeSection 
        title="UPCOMING NEXT SEASON" 
        query={UPCOMING_ANIME_QUERY} 
      />
      <AnimeSection 
        title="POPULAR THIS SEASON" 
        query={POPULAR_SEASON_QUERY} 
      />
    </div>
  )
} 