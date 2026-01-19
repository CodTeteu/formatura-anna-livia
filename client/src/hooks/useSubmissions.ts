import { useState, useEffect, useCallback } from 'react';
import { supabase, type RSVPSubmission, type InsertRSVP } from '@/lib/supabase';

interface UseSubmissionsState {
    submissions: RSVPSubmission[];
    loading: boolean;
    error: string | null;
}

export function useSubmissions() {
    const [state, setState] = useState<UseSubmissionsState>({
        submissions: [],
        loading: true,
        error: null,
    });

    const fetchSubmissions = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const { data, error } = await supabase
            .from('rsvp_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            setState(prev => ({ ...prev, loading: false, error: error.message }));
            return;
        }

        setState({
            submissions: data || [],
            loading: false,
            error: null,
        });
    }, []);

    useEffect(() => {
        fetchSubmissions();
    }, [fetchSubmissions]);

    const deleteSubmission = useCallback(async (id: string) => {
        const { error } = await supabase
            .from('rsvp_submissions')
            .delete()
            .eq('id', id);

        if (error) {
            return { success: false, error: error.message };
        }

        setState(prev => ({
            ...prev,
            submissions: prev.submissions.filter(s => s.id !== id),
        }));

        return { success: true, error: null };
    }, []);

    return {
        ...state,
        refetch: fetchSubmissions,
        deleteSubmission,
    };
}

export async function submitRSVP(data: InsertRSVP): Promise<{ success: boolean; error: string | null }> {
    const { error } = await supabase
        .from('rsvp_submissions')
        .insert([data]);

    if (error) {
        console.error('Error submitting RSVP:', error);
        return { success: false, error: error.message };
    }

    return { success: true, error: null };
}
