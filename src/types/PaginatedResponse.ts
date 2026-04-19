import type { BookData } from "./BookData";

export interface PaginatedResponse {
    books: BookData[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}