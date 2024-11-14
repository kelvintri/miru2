'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { fetchAnilist } from '@/lib/anilist'
import type { AnimePageResponse, AnimeMedia } from '@/types/anilist'

interface AnimeSectionProps {
  title: string
  query: string
}

export default function AnimeSection({ title, query }: AnimeSectionProps) {
  const [anime, setAnime] = useState<AnimeMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAnime() {
      try {
        const data = await fetchAnilist<AnimePageResponse>(query, {
          page: 1,
          perPage: 12,
        })
        setAnime(data.Page.media)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch anime')
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [query])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button className="text-sm text-blue-500 hover:underline">View All</button>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
        {anime.map((item) => (
          <div key={item.id} className="group cursor-pointer">
            <div className="relative w-full pt-[140%] mb-1">
              <Image
                src={item.coverImage.large}
                alt={item.title.english || item.title.romaji}
                fill
                sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw"
                className="object-cover absolute top-0 left-0 transition-transform duration-300 group-hover:scale-105"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <div className="text-xs text-white font-medium line-clamp-2">
                    {item.title.english || item.title.romaji}
                  </div>
                  {item.episodes && (
                    <div className="text-[11px] text-gray-300 mt-0.5">
                      {item.episodes} Episodes
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h3 className="text-xs font-medium line-clamp-2 text-gray-800 px-0.5">
              {item.title.english || item.title.romaji}
            </h3>
          </div>
        ))}
      </div>
    </section>
  )
} 