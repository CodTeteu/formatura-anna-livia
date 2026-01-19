import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a lazy-loaded Supabase client to prevent SSR issues
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
    if (!_supabase) {
        if (!supabaseUrl || !supabaseAnonKey) {
            console.warn('Supabase credentials not found. Please check your .env file.');
            // Create a dummy client that won't throw during build
        }
        _supabase = createClient(
            supabaseUrl || 'https://placeholder.supabase.co',
            supabaseAnonKey || 'placeholder-key'
        );
    }
    return _supabase;
}

// Export for backward compatibility
export const supabase = typeof window !== 'undefined'
    ? createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder-key')
    : null as unknown as SupabaseClient;

// Type definitions for database tables
export interface RSVPSubmission {
    id: string;
    name: string;
    phone: string;
    email?: string;
    attendance: 'attending' | 'not-attending';
    guest_count: number;
    companion_names?: string[];
    message?: string;
    created_at: string;
    updated_at: string;
}

export interface InsertRSVP {
    name: string;
    phone: string;
    email?: string;
    attendance: 'attending' | 'not-attending';
    guest_count?: number;
    companion_names?: string[];
    message?: string;
}
