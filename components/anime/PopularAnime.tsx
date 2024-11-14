'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getPopularAnime } from '@/lib/anilist'
import Link from 'next/link'

export default function PopularAnime() {
  const [anime, setAnime] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPopularAnime() {
      try {
        const data = await getPopularAnime()
        setAnime(data.Page.media)
      } catch (error) {
        console.error('Error fetching popular anime:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularAnime()
  }, [])

  if (loading) return <div>Loading popular anime...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Popular Right Now</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {anime.map((item) => (
          <Link 
            href={`/anime/${item.id}`} 
            key={item.id}
            className="group hover:opacity-80 transition-opacity"
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
              <Image
                src={item.coverImage.large}
                alt={item.title.userPreferred}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
            </div>
            <h3 className="mt-2 text-sm font-medium line-clamp-2">
              {item.title.userPreferred}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
} 