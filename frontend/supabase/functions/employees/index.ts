import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface Employee {
  id?: number
  name: string
  email: string
  position?: string
  department_id?: number
  hire_date?: string
  salary?: number
  created_at?: string
  updated_at?: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
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
          const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('id', parseInt(id))
            .single()

          if (error) throw error
          return new Response(JSON.stringify({ data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        } else {
          const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) throw error
          return new Response(JSON.stringify({ data }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

      case 'POST':
        const employeeData: Employee = await req.json()
        
        const { data, error } = await supabase
          .from('employees')
          .insert([employeeData])
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 201,
        })

      case 'PUT':
        if (!id) {
          return new Response(JSON.stringify({ error: 'Employee ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        const updateData: Partial<Employee> = await req.json()
        
        const { data, error } = await supabase
          .from('employees')
          .update(updateData)
          .eq('id', parseInt(id))
          .select()
          .single()

        if (error) throw error
        return new Response(JSON.stringify({ data }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

      case 'DELETE':
        if (!id) {
          return new Response(JSON.stringify({ error: 'Employee ID required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        const { error } = await supabase
          .from('employees')
          .delete()
          .eq('id', parseInt(id))

        if (error) throw error
        return new Response(JSON.stringify({ message: 'Employee deleted successfully' }), {
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
