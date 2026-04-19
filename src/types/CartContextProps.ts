import type { BookData } from "./BookData";
import type { CartState } from "./CartState";

export interface CartContextProps {
    state: CartState,
    addItem: (book: BookData) => void;
    removeItem: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    checkout: (dueDate: string) => Promise<void>;
}