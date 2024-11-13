'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

type State = {
  error: string | null
}

export async function login(prevState: State, formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!data.email || !data.password) {
    return {
      error: 'Please provide both email and password'
    }
  }

  // Attempt to sign in
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error)
    
    if (error.message.includes('Invalid login credentials')) {
      return {
        error: 'Invalid email or password'
      }
    }
    
    return {
      error: error.message
    }
  }

  // Get session to confirm login
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return {
      error: 'Failed to create session'
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
} 