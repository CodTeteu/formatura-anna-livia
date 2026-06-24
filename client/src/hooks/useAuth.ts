import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
    user: User | null;
    session: Session | null;
    loading: boolean;
    error: string | null;
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        session: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
            } else {
                setAuthState({
                    user: session?.user ?? null,
                    session,
                    loading: false,
                    error: null,
                });
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setAuthState({
                    user: session?.user ?? null,
                    session,
                    loading: false,
                    error: null,
                });
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
            return { success: false, error: error.message };
        }

        setAuthState({
            user: data.user,
            session: data.session,
            loading: false,
            error: null,
        });

        return { success: true, error: null };
    }, []);

    const signOut = useCallback(async () => {
        setAuthState(prev => ({ ...prev, loading: true }));

        const { error } = await supabase.auth.signOut();

        if (error) {
            setAuthState(prev => ({ ...prev, loading: false, error: error.message }));
            return { success: false, error: error.message };
        }

        setAuthState({
            user: null,
            session: null,
            loading: false,
            error: null,
        });

        return { success: true, error: null };
    }, []);

    return {
        user: authState.user,
        session: authState.session,
        loading: authState.loading,
        error: authState.error,
        isAuthenticated: !!authState.session,
        signIn,
        signOut,
    };
}
