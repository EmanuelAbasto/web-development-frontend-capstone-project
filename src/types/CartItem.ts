import type { BookData } from "./BookData";

export interface CartItem extends BookData {
    quantity: number
}