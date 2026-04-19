import type { CartAction } from "./CartAction";
import type { CartState } from "./CartState";

export const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state;
            }

            const newItem = { ...action.payload, quantity: 1 };
            
            const newItems = [...state.items, newItem];
            return { ...state, items: newItems, totalItems: newItems.length };
        }
        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            return { ...state, items: newItems, totalItems: newItems.length };
        }
        case 'CLEAR_CART':
            return { items: [], totalItems: 0 };
        case 'SYNC_CART':
            return action.payload;
        default:
            return state;
    }
};