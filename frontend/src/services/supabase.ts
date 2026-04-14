import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bivvrelxnkatpaahikvl.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXJwYWJhc2UtYXV0aCIsImVtYWlsIjoic3VwYWJhc2UtYXV0aEBleWxvYmVzbGlub3MuY29tIiwicm9sZSI6ImF1dGhfdXNlcl9zZXJ2aWNlIiwic3ViIjoiYXV0aF9zZXJ2aWNlIiwiaWF0IjoxNzE0NzY4NzE4LCJleHAiOjE3MTQ4MDI1MTh9.pK3hJkWjXx3N8y7LzFfHq2Y7k8gN8M9wQhF0Yg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Edge Functions URL
const EDGE_FUNCTIONS_URL = `${supabaseUrl}/functions/v1`

// Helper function to call edge functions
export async function callEdgeFunction(functionName: string, options: RequestInit = {}) {
  const url = `${EDGE_FUNCTIONS_URL}/${functionName}`
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Edge function error: ${response.statusText}`)
  }

  return response.json()
}
