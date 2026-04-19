import React, { useCallback, useState, useEffect, type ReactNode } from "react";
import type { User } from "../types/User";
import type { SupabaseAuthResponse } from "../types/SupabaseAuthResponse";
import { ENV } from '../config/environment';
import { AuthContext } from "../context/AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkSession = (): void => {
            const token = localStorage.getItem(ENV.SB_TOKEN_STORAGE_KEY);
            const savedUser = localStorage.getItem(ENV.SB_USER_STORAGE_KEY);
            
            if (!token) {
                setIsLoading(false);
                return;
            }

            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                } catch (error) {
                }
            }
            
            setIsLoading(false);
        };
        checkSession();
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<void> => {
        try {
            const response = await fetch(ENV.AUTH_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'apikey': ENV.SB_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data: SupabaseAuthResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.error_description || 'Error de login');
            }

            if (data.access_token) {
                localStorage.setItem(ENV.SB_TOKEN_STORAGE_KEY, data.access_token);
            }
            
            if (data.user) {
                const userData: User = {
                    id: data.user.id,
                    email: data.user.email,
                    fullName: data.user.user_metadata?.full_name || 'User'
                };
                localStorage.setItem(ENV.SB_USER_STORAGE_KEY, JSON.stringify(userData));
                setUser(userData);
            }
        } catch (error: unknown) {
            throw error;
        }
    }, []);

    const register = useCallback(async (email: string, password: string, fullName: string): Promise<void> => {
        try {
            const response = await fetch(ENV.AUTH_REGISTER_URL, {
                method: 'POST',
                headers: {
                    'apikey': ENV.SB_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    data: { full_name: fullName }
                })
            });

            const data: SupabaseAuthResponse = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || data.message || 'Error de registro');
            }
        } catch (error: unknown) {
            throw error;
        }
    }, []);

    const logout = useCallback((): void => {
        localStorage.removeItem(ENV.SB_TOKEN_STORAGE_KEY);
        localStorage.removeItem(ENV.SB_USER_STORAGE_KEY);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated: !!user, 
            login, 
            register, 
            logout 
        }}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};