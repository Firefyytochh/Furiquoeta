'use server'

import { createClient } from '@supabase/supabase-js';

export async function getRandomQuote() {
  console.log('=== GET RANDOM QUOTE CALLED ===')
  

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables')
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
