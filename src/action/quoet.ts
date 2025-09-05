'use server'

import { createClient } from '@supabase/supabase-js';

export async function submitQuote(formData: FormData) {
  const quote = formData.get('quote') as string
  
  console.log('=== SERVER ACTION CALLED ===')
  console.log('Quote received:', quote)
  
  if (!quote || quote.trim() === '') {
    return { success: false, error: 'Quote cannot be empty' }
  }


  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  console.log('Environment check:')
  console.log('SUPABASE_URL exists:', !!supabaseUrl)
  console.log('SUPABASE_KEY exists:', !!supabaseKey)

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
    return { 
      success: false, 
      error: 'Database configuration error. Please check environment variables.' 
    }
  }

  try {
    console.log('Creating Supabase client...')
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    console.log('Supabase client created successfully')
    console.log('Attempting to insert quote:', quote.trim())
    
    const { data, error } = await supabase
      .from('quotes')
      .insert([
        {
          content: quote.trim()
        }
      ])
      .select()

    console.log('Insert result:')
    console.log('Data:', data)
    console.log('Error:', error)

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return { success: false, error: `Database error: ${error.message}` }
    }

    console.log('Quote inserted successfully:', data)
    return { success: true, message: 'Quote saved to database successfully!' }
  } catch (error) {
    console.error('Catch block error:', error)
    return { success: false, error: 'Failed to submit quote to database' }
  }
}


