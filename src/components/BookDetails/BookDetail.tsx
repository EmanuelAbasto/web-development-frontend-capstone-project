import React from 'react';
import { Link } from 'react-router-dom';
import type { BookProps } from '../../types/BookProps';
import styles from './BookDetail.module.scss';
import { useCart } from '../../hooks/useCart';

const BookDetail: React.FC<BookProps> = ({ data }) => {
  const { addItem } = useCart();
  const { 
    title, 
    author, 
    cover_image, 
    categories, 
    metrics, 
    status, 
    summary, 
    published_at 
  } = data;

  const publishYear: number = new Date(published_at).getFullYear();

  const handleBorrow = (): void => {
        addItem(data);
  }

  return (
    <main className={styles.container}>
      <nav className={styles.navigation} aria-label="Breadcrumb">
        <Link to="/" className={styles.backLink}>
          ← Back to catalog
        </Link>
      </nav>

      <section className={styles.contentLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.imageWrapper}>
            <img src={cover_image} alt={`Cover of ${title}`} loading="eager" />
            <span
              className={`${styles.statusBadge} ${status.is_available ? styles.available : styles.unavailable}`}
            >
              {status.is_available ? 'Available' : 'Not Available'}
            </span>
          </div>

          <button className={styles.borrowButton} disabled={!status.is_available} type="button" onClick={handleBorrow}>
            {status.is_available ? 'Borrow Book' : 'Currently Unavailable'}
          </button>
        </aside>

        <article className={styles.details}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.meta}>
              <span className={styles.author}>👤 {author.name}</span>
              <span className={styles.rating}>⭐ {metrics.rating}</span>
            </div>
          </header>

          <div className={styles.categories} aria-label="Categories">
            {categories.map((cat: string) => (
              <span key={cat} className={styles.categoryBadge}>
                {cat}
              </span>
            ))}
          </div>

          <section className={styles.summarySection}>
            <h2>About this book</h2>
            <p>{summary}</p>
          </section>

          <hr className={styles.divider} />

          <section className={styles.extraDetails}>
            <h3> Book Details</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Published Year</label>
                <p>{publishYear}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Current Status</label>
                <p>{status.is_available ? 'Ready to pickup' : 'Expected soon'}</p>
              </div>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
};

export default BookDetail;