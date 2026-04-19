export const ENV = {
    SB_URL: import.meta.env.VITE_SUPABASE_URL as string,
    SB_API_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY as string,

    API_BASE_URL: (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:8080/api",
    
    BOOKS_PAGE_SIZE: 10,
    BOOKS_SEARCH_DEBOUNCE: 300,
    CART_STORAGE_KEY: "app_cart_state",
    SB_TOKEN_STORAGE_KEY: "sb_token",
    SB_USER_STORAGE_KEY: "sb_user",

    get AUTH_LOGIN_URL(): string {
        return `${this.SB_URL}/auth/v1/token?grant_type=password`;
    },
    get AUTH_REGISTER_URL(): string {
        return `${this.SB_URL}/auth/v1/signup`;
    },
    get API_BOOKS_URL_PAGINATED(): string {
        return `${this.API_BASE_URL}/books`;
    },
    get API_CATEGORIES_URL(): string {
        return `${this.API_BASE_URL}/categories`;
    },
    get API_RESERVATIONS_URL(): string {
        return `${this.API_BASE_URL}/reservations`;
    },
    getBookDetailURL(id: string): string {
        return `${this.API_BASE_URL}/books/${id}`;
    },
    getHomeBooksURL(): string {
        return `${this.API_BOOKS_URL_PAGINATED}?page=0&size=${this.BOOKS_PAGE_SIZE}`;
    }
} as const;