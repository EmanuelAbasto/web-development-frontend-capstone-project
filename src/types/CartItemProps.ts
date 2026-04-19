import type { BookData } from "./BookData";

export interface CartItemProps {
    item: BookData;
    onRemove: (id: string) => void;
    onIncrement?: (id: string) => void;
    onDecrement?: (id: string) => void;
    showQuantityControls?: boolean;
}