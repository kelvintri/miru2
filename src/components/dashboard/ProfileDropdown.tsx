'use client'

import { User } from '@supabase/supabase-js'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from '@/src/lib/actions/auth'
import { UserCircleIcon } from '@heroicons/react/24/outline'

export default function ProfileDropdown({ user }: { user: User }) {
  return (
    <Menu as="div" className="relative ml-3">
      <Menu.Button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        <span className="sr-only">Open user menu</span>
        <UserCircleIcon className="h-8 w-8 text-gray-700" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            <p className="font-medium">{user.email}</p>
          </div>
          <Menu.Item>
            {({ active }) => (
              <a
                href="/dashboard/profile"
                className={`${
                  active ? 'bg-gray-100' : ''
                } block px-4 py-2 text-sm text-gray-700`}
              >
                Profile Settings
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <form action={signOut}>
                <button
                  type="submit"
                  className={`${
                    active ? 'bg-gray-100' : ''
                  } block w-full text-left px-4 py-2 text-sm text-red-700`}
                >
                  Sign Out
                </button>
              </form>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
} 