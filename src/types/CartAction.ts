import type { BookData } from "./BookData";
import type { CartState } from "./CartState";

export type CartAction = 
    | { type: 'ADD_ITEM'; payload: BookData }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'CLEAR_CART' }
    | { type: 'SYNC_CART'; payload: CartState };