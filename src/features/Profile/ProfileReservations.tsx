import React, { useEffect, useState } from 'react';
import { Calendar, BookOpen } from 'lucide-react';
import { useReservations } from '../../hooks/useReservations';
import { ENV } from '../../config/environment';
import type { BookData } from '../../types/BookData';
import styles from './ProfileReservations.module.scss';

export const ProfileReservations: React.FC = () => {
    const { reservations, isLoading } = useReservations();
    const [bookDetails, setBookDetails] = useState<Record<string, BookData>>({});
    const [loadingBooks, setLoadingBooks] = useState(false);

    useEffect(() => {
        if (reservations.length === 0) return;

        setLoadingBooks(true);
        const bookIds = new Set<string>();
        
        reservations.forEach(reservation => {
            reservation.items.forEach(item => {
                bookIds.add(item.bookId);
            });
        });

        const fetchBookDetails = async () => {
            const details: Record<string, BookData> = {};
            
            for (const bookId of bookIds) {
                if (!bookDetails[bookId]) {
                    try {
                        const response = await fetch(ENV.getBookDetailURL(bookId));
                        if (response.ok) {
                            const book = await response.json();
                            details[bookId] = book;
                        }
                    } catch (error) {
                        void error;
                    }
                }
            }
            
            setBookDetails(prev => ({ ...prev, ...details }));
            setLoadingBooks(false);
        };

        fetchBookDetails();
    }, [reservations]);

    if (isLoading) {
        return (
            <div className={styles.tabPane}>
                <h2>My Reservations</h2>
                <div className={styles.loadingState}>
                    <p>Loading reservations...</p>
                </div>
            </div>
        );
    }

    if (reservations.length === 0) {
        return (
            <div className={styles.tabPane}>
                <h2>My Reservations</h2>
                <div className={styles.emptyState}>
                    <BookOpen size={48} />
                    <h3>No reservations yet</h3>
                    <p>When you make a reservation, it will appear here</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.tabPane}>
            <h2>My Reservations ({reservations.length})</h2>
            <div className={styles.reservationsList}>
                {reservations.map((reservation) => (
                    <div key={reservation.id} className={styles.reservationCard}>
                        <div className={styles.reservationHeader}>
                            <h3>Reservation {reservation.id.substring(0, 8)}</h3>
                            <span className={`${styles.status} ${styles[reservation.status]}`}>
                                {reservation.status}
                            </span>
                        </div>

                        <div className={styles.reservationDetails}>
                            <div className={styles.detail}>
                                <Calendar size={18} />
                                <div>
                                    <label>Reservation Date</label>
                                    <p>{new Date(reservation.createdAt).toLocaleDateString('en-US')}</p>
                                </div>
                            </div>

                            <div className={styles.detail}>
                                <Calendar size={18} />
                                <div>
                                    <label>Due Date</label>
                                    <p>{new Date(reservation.dueDate).toLocaleDateString('en-US')}</p>
                                </div>
                            </div>

                            <div className={styles.detail}>
                                <BookOpen size={18} />
                                <div>
                                    <label>Number of Books</label>
                                    <p>{reservation.items.length} book(s)</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.booksGrid}>
                            <label>Books in this reservation:</label>
                            <div className={styles.bookCards}>
                                {reservation.items.map((item) => {
                                    const book = bookDetails[item.bookId];
                                    return (
                                        <div key={item.bookId} className={styles.bookCard}>
                                            <h4>{book?.title || item.title || `Book ${item.bookId.substring(0, 8)}`}</h4>
                                            {book?.author && <p className={styles.author}>{book.author.name}</p>}
                                            {book?.published_at && <p className={styles.year}>{new Date(book.published_at).getFullYear()}</p>}
                                            {book?.categories && book.categories.length > 0 && (
                                                <span className={styles.category}>{book.categories[0]}</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            {loadingBooks && <p className={styles.loadingBooks}>Loading book details...</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
