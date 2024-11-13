'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signIn(formData: FormData) {
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

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    username: formData.get('username') as string,
  }

  if (!data.email || !data.password || !data.username || !data.confirmPassword) {
    return { error: 'Please fill in all fields.' }
  }

  if (data.password !== data.confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (data.password.length < 8) {
    return { error: 'Password must be at least 8 characters long.' }
  }

  const { data: existingUser } = await supabase
    .from('users')
    .select()
    .eq('email', data.email)
    .single()

  if (existingUser) {
    return { error: 'This email is already registered.' }
  }

  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        username: data.username,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (signUpError) {
    if (signUpError.message.includes('not authorized')) {
      return { 
        error: 'This email domain is not authorized. Please use an authorized email domain or contact support.' 
      }
    }
    return { error: signUpError.message }
  }

  if (user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert([{ 
        id: user.id, 
        username: data.username, 
        email: data.email 
      }])

    if (profileError) {
      return { error: 'Failed to create user profile.' }
    }

    return {
      message: 'Registration successful! Please check your email to verify your account.',
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut(): Promise<void> {
  
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Error signing out:', error)
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}
