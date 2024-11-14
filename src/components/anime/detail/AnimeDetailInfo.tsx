import { AnimeDetails } from '@/src/types/anime';

interface AnimeDetailInfoProps {
  anime: AnimeDetails;
}

export default function AnimeDetailInfo({ anime }: AnimeDetailInfoProps) {
  return (
    <div className="bg-gray-100 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Anime Information</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Status:</strong> {anime.status}
        </div>
        <div>
          <strong>Episodes:</strong> {anime.episodes ?? 'Unknown'}
        </div>
        <div>
          <strong>Season:</strong> {anime.season} {anime.seasonYear}
        </div>
        <div>
          <strong>Score:</strong> {anime.averageScore ?? 'N/A'}%
        </div>
        <div className="col-span-2">
          <strong>Genres:</strong> {anime.genres.join(', ')}
        </div>
      </div>
      <div className="mt-4">
        <strong>Description:</strong>
        <p 
          className="text-gray-700" 
          dangerouslySetInnerHTML={{
            __html: anime.description || 'No description available'
          }} 
        />
      </div>
    </div>
  );
} 