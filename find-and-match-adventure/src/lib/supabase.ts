import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Level {
  id: number
  title: string
  image_url: string
  thumbnail: string
  created_at?: string
}

export interface GameObject {
  id: number
  level_id: number
  name: string
  image_url: string
  minx: number
  miny: number
  maxx: number
  maxy: number
  created_at?: string
}

export interface Session {
  id: string
  user_id?: string
  score: number
  current_object_id?: number
  created_at?: string
}
