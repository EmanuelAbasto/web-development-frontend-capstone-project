import type { ReservationFormProps } from "../../types/ReservationFormProps";
import React, { useState } from 'react';
import styles from './ReservationForm.module.scss';

export const ReservationForm: React.FC<ReservationFormProps> = ({ onSubmit, isSubmitting }) => {
    const [dueDate, setDueDate] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (dueDate) onSubmit(dueDate);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label htmlFor="dueDate">Return Date</label>
            <input
                id="dueDate"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <button type="submit" disabled={isSubmitting || !dueDate}>
                {isSubmitting ? 'Processing...' : 'Confirm Reservation'}
            </button>
        </form>
    );
};