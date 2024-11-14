import Image from 'next/image';
import { AnimeCharacter, CharacterRole } from '@/src/types/anime';

interface AnimeCharactersProps {
  characters: AnimeCharacter[];
}

export default function AnimeCharacters({ characters }: AnimeCharactersProps) {
  // Filter and group characters by their role
  const mainCharacters = characters.filter(char => 
    char.role === CharacterRole.MAIN || char.role === CharacterRole.SUPPORTING
  );

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Characters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mainCharacters.map((characterEdge) => (
          <div 
            key={characterEdge.node.id} 
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
          >
            {/* Character Image */}
            <Image 
              src={characterEdge.node.image.large} 
              alt={characterEdge.node.name.full} 
              width={100} 
              height={150} 
              className="rounded-lg object-cover"
            />
            
            <div>
              {/* Character Details */}
              <div>
                <p className="font-semibold text-lg">{characterEdge.node.name.full}</p>
                <p className="text-sm text-gray-600">{characterEdge.role}</p>
              </div>
              
              {/* Voice Actor (if available) */}
              {characterEdge.voiceActors && characterEdge.voiceActors.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">
                    Voice Actor: {characterEdge.voiceActors[0].name.full}
                  </p>
                  {characterEdge.voiceActors[0].image && (
                    <Image 
                      src={characterEdge.voiceActors[0].image.large} 
                      alt={characterEdge.voiceActors[0].name.full} 
                      width={50} 
                      height={50} 
                      className="rounded-full mt-2"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 