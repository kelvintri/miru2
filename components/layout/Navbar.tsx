'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ModeToggle } from '../ThemeToggle'
import { User } from '@supabase/supabase-js'
import ProfileDropdown from '../dashboard/ProfileDropdown'

interface NavItem {
  name: string
  href: string
  requiresAuth: boolean
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/', requiresAuth: false },
  { name: 'Anime', href: '/anime', requiresAuth: false },
  { name: 'Manga', href: '/manga', requiresAuth: false },
  { name: 'Dashboard', href: '/dashboard', requiresAuth: true },
  { name: 'Anime List', href: '/dashboard/anime', requiresAuth: true },
  { name: 'Watchlist', href: '/dashboard/watchlist', requiresAuth: true },
]

interface NavbarProps {
  user?: User | null
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const filteredNav = navigation.filter(item => !item.requiresAuth || (item.requiresAuth && user))

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold text-primary dark:text-primary-dark">
            AniHub
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href
                    ? 'text-primary dark:text-primary-dark'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-dark'
                } transition-colors`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Theme Toggle */}
            <ModeToggle />

            {user ? (
              <ProfileDropdown user={user} />
            ) : (
              <Link 
                href="/login" 
                className="bg-primary dark:bg-primary-dark text-white px-4 py-2 rounded-md hover:bg-primary/90 dark:hover:bg-primary-dark/90 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ModeToggle />
            <button className="p-2">
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}