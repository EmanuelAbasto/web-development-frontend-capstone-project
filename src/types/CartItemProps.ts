import type { BookData } from "./BookData";

export interface CartItemProps {
    item: BookData;
    onRemove: (id: string) => void;
}