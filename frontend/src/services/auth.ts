import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bivvrelxnkatpaahikvl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string  // UUID from Supabase Auth
  email?: string
  name?: string
  avatar_url?: string
  provider?: string
  role_id?: number  // Reference to roles table
}

// Authentication functions
export const authService = {
  // Sign in with GitHub
  async signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin,
      },
    })
    
    if (error) throw error
    return data
  },

  // Sign in with Google (alternative)
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })
    
    if (error) throw error
    return data
  },

  // Sign in with email/password
  async signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error
    return data
  },

  // Sign up with email/password
  async signUpWithEmail(email: string, password: string, name?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
        },
      },
    })
    
    if (error) throw error
    return data
  },

  // Sign out
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Listen to auth changes
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event: any, session: any) => {
      callback(session?.user || null)
    })
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const user = await this.getCurrentUser()
    return !!user
  },

  // Get user profile from users table
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      throw error
    }
    
    return data
  },

  // Create/update user profile
  async updateUserProfile(userId: string, profile: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .upsert({
        id: userId,
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()
    
    if (error) throw error
    return data
  },
}

export default authService
