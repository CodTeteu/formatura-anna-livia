import { useState, useEffect, useCallback } from 'react';

const ADMIN_EMAIL = 'admin';
const ADMIN_PASSWORD = 'admin12';
const AUTH_STORAGE_KEY = 'anna-livia-admin-auth';

interface AuthState {
    user: { email: string } | null;
    loading: boolean;
    error: string | null;
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        // Check if already logged in
        try {
            const stored = localStorage.getItem(AUTH_STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.email) {
                    setAuthState({ user: parsed, loading: false, error: null });
                    return;
                }
            }
        } catch { /* ignore */ }
        setAuthState(prev => ({ ...prev, loading: false }));
    }, []);

    const signIn = useCallback(async (email: string, password: string) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));

        // Simulate async
        await new Promise(resolve => setTimeout(resolve, 500));

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const user = { email: ADMIN_EMAIL };
            try {
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
            } catch { /* ignore */ }
            setAuthState({ user, loading: false, error: null });
            return { success: true, error: null };
        }

        setAuthState(prev => ({ ...prev, loading: false, error: 'Credenciais inválidas.' }));
        return { success: false, error: 'Credenciais inválidas.' };
    }, []);

    const signOut = useCallback(async () => {
        setAuthState(prev => ({ ...prev, loading: true }));
        try {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        } catch { /* ignore */ }
        setAuthState({ user: null, loading: false, error: null });
        return { success: true, error: null };
    }, []);

    return {
        user: authState.user,
        loading: authState.loading,
        error: authState.error,
        isAuthenticated: !!authState.user,
        signIn,
        signOut,
    };
}
