export interface SupabaseAuthResponse {
    access_token?: string;
    user?: {
        id: string;
        email: string;
        user_metadata: {
            full_name?: string;
        };
    };
    error_description?: string;
    message?: string;
    msg?: string;
}