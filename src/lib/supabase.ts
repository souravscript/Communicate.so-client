
import { createClient } from '@supabase/supabase-js'

// Retrieve environment variables with proper type handling
const supabaseUrl: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Ensure the required environment variables exist
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.")
}

export const supabase = createClient(supabaseUrl, supabaseKey)

