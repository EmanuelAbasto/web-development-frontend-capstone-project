import React, { memo } from 'react';
import styles from './BookCard.module.scss';
import type { BookProps } from '../../types/BookProps';

export const BookCard: React.FC<BookProps> = memo(({ data }) => {
  const { 
    title, 
    author, 
    cover_image,
    metrics, 
    status, 
    categories, 
    summary_short 
  } = data;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={cover_image} alt={`Cover of ${title}`} loading="lazy" />
        <span
          className={`${styles.statusBadge} ${status.is_available ? styles.available : styles.unavailable}`}
        >
          {status.is_available ? 'Available' : 'Unavailable'}
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} title={title}> {title} </h3>
        <p className={styles.author}> by {author.name} </p>

        <div className={styles.categoryHeader}>
          {categories.slice(0, 2).map((cat: string, index: number) => (
            <span key={index} className={styles.categoryBadge}>
              {cat}
            </span>
          ))}
        </div>

        <p className={styles.description}> {summary_short} </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.rating}>
          <span className={styles.star}>★</span>
          {metrics.rating.toFixed(1)}
        </div>
        <button className={styles.btnDetails} aria-label={`View details of ${title}`}>
          Details
        </button>
      </div>
    </article>
  );
});