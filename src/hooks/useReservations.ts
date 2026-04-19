import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import type { Reservation } from '../types/Reservation';
import { ENV } from '../config/environment';

export const useReservations = () => {
    const { isAuthenticated } = useAuth();
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) {
            setReservations([]);
            return;
        }

        const fetchReservations = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem(ENV.SB_TOKEN_STORAGE_KEY);
                const response = await fetch(ENV.API_RESERVATIONS_URL + '/my-reservations', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error loading reservations');
                }

                const data: Reservation[] = await response.json();
                setReservations(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Unknown error loading reservations');
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchReservations();
    }, [isAuthenticated]);

    return { reservations, isLoading, error };
};
