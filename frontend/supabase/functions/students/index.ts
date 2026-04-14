import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface Student {
  id?: number
  name: string
  email: string
  student_id: string
  course?: string
  year_level?: string
  created_at?: string
  updated_at?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { method } = req
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    switch (method) {
      case 'GET':
        if (id) {
          // Get single student
          const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('id', parseInt(id))
            .single()

          if (error) throw error
          return new Response(JSON.stringify({ data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        } else {
          // Get all students
          const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) throw error
          return new Response(JSON.stringify({ data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

      case 'POST':
        // Create new student
        const studentData: Student = await req.json()
        
        const { data, error } = await supabase
          .from('students')
          .insert([studentData])
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 201,
        })

      case 'PUT':
        // Update student
        if (!id) {
          return new Response(JSON.stringify({ error: 'Student ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        const updateData: Partial<Student> = await req.json()
        
        const { data, error } = await supabase
          .from('students')
          .update(updateData)
          .eq('id', parseInt(id))
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'DELETE':
        // Delete student
        if (!id) {
          return new Response(JSON.stringify({ error: 'Student ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        const { error } = await supabase
          .from('students')
          .delete()
          .eq('id', parseInt(id))

        if (error) throw error
        return new Response(JSON.stringify({ message: 'Student deleted successfully' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      default:
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
