import React, { useState } from 'react';
import styles from './CartPage.module.scss';
import { useCart } from '../../hooks/useCart';
import { CartItem } from '../../components/CartItem/CartItem';
import { ReservationForm } from '../../components/ReservationForm/ReservationForm';

const CartPage: React.FC = () => {
  const { state, removeItem, checkout } = useCart();
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

  if (state.items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>Your cart is empty</h2>
        <p>Browse the catalog to add some books!</p>
      </div>
    );
  }

  return (
    <div className={styles.pageLayout}>
      <section className={styles.itemsList}>
        <h1>My Cart ({state.totalItems})</h1>
        {state.items.map((book) => (
          <CartItem 
            key={book.id} 
            item={book} 
            onRemove={removeItem} 
          />
        ))}
      </section>

      <aside className={styles.summarySidebar}>
        <h3>Reservation Details</h3>
        <p>Total books: <strong>{state.totalItems}</strong></p>
        
        {error && <p className={styles.errorMessage}>{error}</p>}
        
        <ReservationForm 
          onSubmit={handleCheckout} 
          isSubmitting={loading} 
        />
      </aside>
    </div>
  );
};

export default CartPage;