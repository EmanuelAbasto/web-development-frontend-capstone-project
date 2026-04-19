import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../components/CartItem/CartItem';
import styles from './ProfileCart.module.scss';

export const ProfileCart: React.FC = () => {
    const { state: cartState, removeItem } = useCart();

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
                    />
                ))}
            </div>
        </div>
    );
};
