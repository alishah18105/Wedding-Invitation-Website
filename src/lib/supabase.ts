import { createClient } from '@supabase/supabase-js';

interface Database {
  public: {
    Tables: {
      wishes: {
        Row: {
          id: string;
          guest_name: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          guest_name: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          guest_name?: string;
          message?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const missingSupabaseVariables: string[] = [];
if (!supabaseUrl) missingSupabaseVariables.push('VITE_SUPABASE_URL');
if (!supabaseAnonKey) missingSupabaseVariables.push('VITE_SUPABASE_ANON_KEY');

if (missingSupabaseVariables.length > 0 && import.meta.env.DEV) {
  console.error(
    `Supabase is unavailable because these Vite environment variables are missing: ${missingSupabaseVariables.join(', ')}. Set them before starting the development server.`
  );
}

export const supabaseConfigurationError =
  'The guestbook is temporarily unavailable. Please try again later.';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;
