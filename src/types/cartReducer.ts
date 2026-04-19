import type { CartAction } from "./CartAction";
import type { CartState } from "./CartState";
import type { CartItem } from "./CartItem";

const calculateTotalItems = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + (item.quantity || 1), 0);
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                const newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
                return { ...state, items: newItems, totalItems: calculateTotalItems(newItems) };
            }

            const newItem = { ...action.payload, quantity: 1 };
            const newItems = [...state.items, newItem];
            return { ...state, items: newItems, totalItems: calculateTotalItems(newItems) };
        }
        case 'INCREMENT_QUANTITY': {
            const newItems = state.items.map(item =>
                item.id === action.payload
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
            return { ...state, items: newItems, totalItems: calculateTotalItems(newItems) };
        }
        case 'DECREMENT_QUANTITY': {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                const newItems = state.items.map(i =>
                    i.id === action.payload
                        ? { ...i, quantity: i.quantity - 1 }
                        : i
                );
                return { ...state, items: newItems, totalItems: calculateTotalItems(newItems) };
            }
            return state;
        }
        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            return { ...state, items: newItems, totalItems: calculateTotalItems(newItems) };
        }
        case 'CLEAR_CART':
            return { items: [], totalItems: 0 };
        case 'SYNC_CART':
            return action.payload;
        default:
            return state;
    }
};