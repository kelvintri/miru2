'use client'

import Link from 'next/link'
import { signIn } from '@/services/auth'
import { useActionState } from 'react'

interface AuthResponse {
  error?: string
  success?: boolean
}

const initialState: AuthResponse = {
  error: null,
  success: false
}

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 rounded-lg shadow-md bg-card">
        <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Login</h2>
        <form action={formAction} className="space-y-4">
          {state?.error && (
            <div className="p-2 text-red-500 bg-red-100 rounded text-center">
              {state.error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md bg-background text-foreground border-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md bg-background text-foreground border-input"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            Log in
          </button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}