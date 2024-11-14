import { AnimeTrailer as TrailerType } from '@/types/anime';

interface AnimeTrailerProps {
  trailer?: TrailerType;
}

export default function AnimeTrailer({ trailer }: AnimeTrailerProps) {
  if (!trailer || !trailer.id) return null;

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Trailer</h2>
      {trailer.site === 'youtube' && (
        <iframe
          width="100%"
          height="250"
          src={`https://www.youtube.com/embed/${trailer.id}`}
          title="Anime Trailer"
          allowFullScreen
          className="rounded-lg"
        />
      )}
    </div>
  );
} 