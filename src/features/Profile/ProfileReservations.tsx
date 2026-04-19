import React from 'react';
import { Calendar, BookOpen } from 'lucide-react';
import { useReservations } from '../../hooks/useReservations';
import styles from './ProfileReservations.module.scss';

export const ProfileReservations: React.FC = () => {
    const { reservations, isLoading } = useReservations();

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

                        <div className={styles.items}>
                            <label>Books in this reservation:</label>
                            <ul>
                                {reservation.items.map((item) => (
                                    <li key={item.bookId}>
                                        {item.title || `Book ${item.bookId.substring(0, 8)}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
