import React from 'react';
import { Trash2 } from 'lucide-react';
import styles from './CartItem.module.scss';
import type { CartItemProps } from '../../types/CartItemProps';

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => (
    <div className={styles.itemCard}>
        <img src={item.cover_image} alt={item.title} className={styles.thumbnail} />
        <div className={styles.info}>
            <h4>{item.title}</h4>
            <p>{item.author.name}</p>
        </div>
        <button onClick={() => onRemove(item.id)} className={styles.removeBtn} title="Remove from cart">
            <Trash2 size={20} />
        </button>
    </div>
);