import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookDetail from '../../components/BookDetails/BookDetail';
import type { BookData } from '../../types/BookData';
import { ENV } from '../../config/environment';

export const BookDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetch(ENV.getBookDetailURL(id))
        .then((response) => {
          if (!response.ok) throw new Error('Libro no encontrado');
          return response.json();
        })
        .then((data: BookData) => {
          setBook(data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

  if (isLoading) return <div className="container">Loading details...</div>;
  if (!book) return <div className="container"><h2>Book not found</h2></div>;

  return <BookDetail data={book} />;
};