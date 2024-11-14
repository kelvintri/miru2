'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

interface AuthResponse {
  error?: string
  success?: boolean
}

export async function signIn(prevState: AuthResponse, formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  if (!data.email || !data.password) {
    return { error: 'Please provide both email and password.' }
  }

  const { data: { user, session }, error: signInError } = await supabase.auth.signInWithPassword(data)

  if (signInError) {
    console.error('Login error:', signInError)
    if (signInError.message.includes('Invalid login credentials')) {
      return { error: 'Invalid email or password. Please try again.' }
    }
    if (signInError.message.includes('Email not confirmed')) {
      return { error: 'Please verify your email before logging in.' }
    }
    return { error: signInError.message }
  }

  if (!user || !session) {
    return { error: 'Login failed. Please try again.' }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signUp(prevState: AuthResponse, formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  }

  if (!data.email || !data.password || !data.username) {
    return { error: 'Please provide all required fields.' }
  }

  const { error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username,
      },
    },
  })

  if (signUpError) {
    console.error('Registration error:', signUpError)
    return { error: signUpError.message }
  }

  return { success: true }
}

export async function signOut(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
