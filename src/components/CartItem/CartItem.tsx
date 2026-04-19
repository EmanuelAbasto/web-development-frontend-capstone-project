import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import styles from './CartItem.module.scss';
import type { CartItemProps } from '../../types/CartItemProps';

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onIncrement, onDecrement, showQuantityControls = false }) => (
    <div className={styles.itemCard}>
        <img src={item.cover_image} alt={item.title} className={styles.thumbnail} />
        <div className={styles.info}>
            <h4>{item.title}</h4>
            <p>{item.author.name}</p>
            {showQuantityControls && (
                <div className={styles.quantityControls}>
                    <button onClick={() => onDecrement?.(item.id)} className={styles.quantityBtn} disabled={item.quantity === 1}>
                        <Minus size={16} />
                    </button>
                    <span className={styles.quantity}>{item.quantity || 1}</span>
                    <button onClick={() => onIncrement?.(item.id)} className={styles.quantityBtn}>
                        <Plus size={16} />
                    </button>
                </div>
            )}
        </div>
        <button onClick={() => onRemove(item.id)} className={styles.removeBtn} title="Remove from cart">
            <Trash2 size={20} />
        </button>
    </div>
);