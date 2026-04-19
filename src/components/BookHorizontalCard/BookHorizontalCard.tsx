import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BookHorizontalCard.module.scss';
import type { BookData } from '../../types/BookData';

interface BookHorizontalCardProps {
    book: BookData;
}

export const BookHorizontalCard: React.FC<BookHorizontalCardProps> = memo(({ book }) => {
    const navigate = useNavigate();

    if (!book) return null;

    const handleCardClick = (): void => {
        navigate(`/book/${book.id}`);
    };

    return (
        <div 
            className={styles.horizontalCard} 
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
        >
            <div className={styles.coverContainer}>
                <img 
                    src={book.cover_image} 
                    alt={book.title} 
                    className={styles.cover} 
                />
            </div>
            <div className={styles.info}>
                <div className={styles.header}>
                    <h3>{book.title}</h3>
                    <span className={styles.rating}>⭐ {book.metrics?.rating ?? 'N/A'}</span>
                </div>
                <p className={styles.author}>
                    by <span>{book.author?.name ?? 'Unknown Author'}</span>
                </p>
                <p className={styles.description}>
                    {book.summary 
                        ? `${book.summary.substring(0, 150)}...` 
                        : 'No description available'}
                </p>
                <div className={styles.footer}>
                    <div className={styles.categories}>
                        {book.categories?.map((category: string, index: number) => (
                            <span key={`${category}-${index}`} className={styles.categoryBadge}>
                                {category}
                            </span>
                        ))}
                    </div>
                    <button className={styles.btnDetails} onClick={handleCardClick}>
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
});

BookHorizontalCard.displayName = 'BookHorizontalCard';