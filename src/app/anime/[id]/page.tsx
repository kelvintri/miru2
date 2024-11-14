import { getAnimeDetails } from '@/src/lib/anilist';
import AnimeDetailHeader from '@/src/components/anime/detail/AnimeDetailHeader';
import AnimeDetailInfo from '@/src/components/anime/detail/AnimeDetailInfo';
import AnimeCharacters from '@/src/components/anime/detail/AnimeCharacters';
import AnimeTrailer from '@/src/components/anime/detail/AnimeTrailer';

export default async function AnimeDetailPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const animeId = parseInt(params.id);
  const anime = await getAnimeDetails(animeId);

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimeDetailHeader anime={anime} />
      <div className="grid md:grid-cols-[3fr_1fr] gap-8">
        <div>
          <AnimeDetailInfo anime={anime} />
          <AnimeCharacters characters={anime.characters.edges} />
        </div>
        <AnimeTrailer trailer={anime.trailer} />
      </div>
    </div>
  );
} 