import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from '../../components/BookCard/BookProps';
import type { BookData } from '../../types/BookData';
import { ENV } from '../../config/environment';

export const Home = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(ENV.getHomeBooksURL())
      .then((response: Response) => response.json())
      .then((payload: { books: BookData[] }) => {
        setBooks(payload.books || []);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const memoizedBooks = useMemo((): BookData[] => {
    return books; 
  }, [books]);

  if (isLoading) {
    return <div className="container">Loading catalog...</div>;
  }

  return (
    <div className="container">
      <header style={{ padding: '4rem 0 2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.8rem', color: 'var(--text-h)' }}>
          Explore the Library
        </h1>
      </header>
      <main style={{ paddingBottom: '5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {memoizedBooks.map((book: BookData) => (
            <Link
              key={book.id}
              to={`/book/${book.id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <BookCard data={book} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};