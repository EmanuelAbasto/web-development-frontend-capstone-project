import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../components/CartItem/CartItem';
import { ReservationForm } from '../../components/ReservationForm/ReservationForm';
import styles from './ProfileCart.module.scss';

export const ProfileCart: React.FC = () => {
    const { state: cartState, removeItem, incrementQuantity, decrementQuantity, checkout } = useCart();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCheckout = async (dueDate: string) => {
        setLoading(true);
        setError(null);
        try {
            await checkout(dueDate);
            alert("Reservation successful!");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to process reservation. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    if (cartState.items.length === 0) {
        return (
            <div className={styles.tabPane}>
                <h2>My Cart</h2>
                <div className={styles.emptyState}>
                    <ShoppingCart size={48} />
                    <h2>Your cart is empty</h2>
                    <p>Browse the catalog to add books</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tabPane}>
            <h2>My Cart ({cartState.totalItems})</h2>
            <div className={styles.cartItems}>
                {cartState.items.map((book) => (
                    <CartItem
                        key={book.id}
                        item={book}
                        onRemove={removeItem}
                        onIncrement={incrementQuantity}
                        onDecrement={decrementQuantity}
                        showQuantityControls={true}
                    />
                ))}
            </div>
            <div className={styles.checkoutSection}>
                <h3>Reservation Details</h3>
                <p>Total books: <strong>{cartState.items.reduce((sum, item) => sum + (item.quantity || 1), 0)}</strong></p>
                {error && <p className={styles.errorMessage}>{error}</p>}
                <ReservationForm
                    onSubmit={handleCheckout}
                    isSubmitting={loading}
                />
            </div>
        </div>
    );
};
