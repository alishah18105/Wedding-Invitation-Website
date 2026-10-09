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

export const supabaseConfigurationError =
  'The guestbook is not configured yet. Please try again later.';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient<Database>(supabaseUrl, supabaseAnonKey)
    : null;
