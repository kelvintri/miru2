'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    username: formData.get('username') as string,
  }

  if (!data.email || !data.password || !data.username || !data.confirmPassword) {
    redirect('/error')
  }

  if (data.password !== data.confirmPassword) {
    redirect('/error')
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
    console.error('Signup error:', signUpError)
    redirect('/error')
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
      console.error('Profile creation error:', profileError)
      redirect('/error')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
} 