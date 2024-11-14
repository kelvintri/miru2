import Image from 'next/image';
import { AnimeDetails } from '@/types/anime';

interface AnimeDetailHeaderProps {
  anime: AnimeDetails;
}

export default function AnimeDetailHeader({ anime }: AnimeDetailHeaderProps) {
  return (
    <div className="relative mb-8">
      {anime.bannerImage && (
        <div className="absolute inset-0 w-full h-64 overflow-hidden">
          <Image 
            src={anime.bannerImage} 
            alt={anime.title.romaji} 
            fill 
            className="object-cover opacity-50"
          />
        </div>
      )}
      <div className="relative z-10 flex items-center">
        <Image 
          src={anime.coverImage.large} 
          alt={anime.title.romaji} 
          width={200} 
          height={300} 
          className="rounded-lg shadow-lg"
        />
        <div className="ml-6">
          <h1 className="text-2xl font-bold">{anime.title.romaji}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <button>Add to Watchlist</button>
          </div>
        </div>
      </div>
    </div>
  );
} 