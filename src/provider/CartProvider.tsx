import { useReducer, type ReactNode, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { cartReducer } from "../types/cartReducer";
import type { BookData } from "../types/BookData";
import { ENV } from "../config/environment";
import { CartContext } from "../context/CartContext";
import type { CartState } from "../types/CartState";

const getInitialCartState = (): CartState => {
    try {
        const savedCart = localStorage.getItem(ENV.CART_STORAGE_KEY);
        return savedCart ? JSON.parse(savedCart) : { items: [], totalItems: 0 };
    } catch {
        return { items: [], totalItems: 0 };
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, getInitialCartState());
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        localStorage.setItem(ENV.CART_STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === ENV.CART_STORAGE_KEY && event.newValue) {
                try {
                    const newState = JSON.parse(event.newValue);
                    dispatch({ type: 'SYNC_CART', payload: newState });
                } catch (err) {
                    void err;
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const addItem = (book: BookData) => dispatch({ type: 'ADD_ITEM', payload: book });
    const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
    const incrementQuantity = (id: string) => dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
    const decrementQuantity = (id: string) => dispatch({ type: 'DECREMENT_QUANTITY', payload: id });

    const checkout = async (dueDate: string) => {
        if (!isAuthenticated) throw new Error("You must be logged in");
        
        const token = localStorage.getItem(ENV.SB_TOKEN_STORAGE_KEY);
        
        if (!dueDate || dueDate.trim() === '') {
            throw new Error("Return date is required");
        }
        
        const dueDateTimestamp = new Date(dueDate).getTime();

        if (isNaN(dueDateTimestamp)) {
            throw new Error("Invalid date: " + dueDate);
        }
        
        const reservationData = {
            dueDate: dueDateTimestamp,
            items: state.items.map(item => ({
                bookId: item.id,
                quantity: item.quantity
            }))
        };

        const response = await fetch(ENV.API_RESERVATIONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reservationData)
        });

        if (!response.ok) throw new Error("Error processing reservation");
        
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider value={{ state, addItem, removeItem, incrementQuantity, decrementQuantity, checkout }}>
            {children}
        </CartContext.Provider>
    );
};