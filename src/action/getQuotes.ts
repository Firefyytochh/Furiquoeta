'use server'

import { createClient } from '@supabase/supabase-js';

export async function getRandomQuote() {
  console.log('=== GET RANDOM QUOTE CALLED ===')
  
  // Add more detailed environment variable debugging
  console.log('All environment variables check:')
  console.log('NODE_ENV:', process.env.NODE_ENV)
  console.log('Environment variables available:', Object.keys(process.env).filter(key => key.includes('SUPABASE')))
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  console.log('Environment check in getRandomQuote:')
  console.log('SUPABASE_URL exists:', !!supabaseUrl)
  console.log('SUPABASE_KEY exists:', !!supabaseKey)
  console.log('SUPABASE_URL value:', supabaseUrl ? 'Set' : 'Not set')
  console.log('SUPABASE_KEY value:', supabaseKey ? 'Set (length: ' + supabaseKey.length + ')' : 'Not set')

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables in getRandomQuote')
    console.error('URL:', supabaseUrl)
    console.error('Key:', supabaseKey ? 'Present but hidden' : 'Missing')
    return { 
      success: false, 
      error: 'Database configuration error.' 
    }
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { count, error: countError } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Error getting quote count:', countError)
      return { success: false, error: 'Failed to fetch quotes' }
    }

    if (!count || count === 0) {
      return { 
        success: false, 
        error: 'No quotes found in database' 
      }
    }

    const randomOffset = Math.floor(Math.random() * count)
    
    const { data, error } = await supabase
      .from('quotes')
      .select('content')
      .range(randomOffset, randomOffset)
      .single()

    if (error) {
      console.error('Error fetching random quote:', error)
      return { success: false, error: 'Failed to fetch quote' }
    }

    console.log('Random quote fetched:', data)
    return { 
      success: true, 
      quote: data.content 
    }
  } catch (error) {
    console.error('Error in getRandomQuote:', error)
    return { success: false, error: 'Failed to fetch quote' }
  }
}
