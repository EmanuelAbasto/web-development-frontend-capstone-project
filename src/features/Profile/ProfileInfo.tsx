import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './ProfileInfo.module.scss';

export const ProfileInfo: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.tabPane}>
            <h2>Personal Information</h2>
            <div className={styles.infoGrid}>
                <div className={styles.infoItem}>
                    <label>Full Name</label>
                    <p>{user.fullName}</p>
                </div>
                <div className={styles.infoItem}>
                    <label>Email Address</label>
                    <p>{user.email}</p>
                </div>
                <div className={styles.infoItem}>
                    <label>User ID</label>
                    <p className={styles.userId}>{user.id}</p>
                </div>
            </div>
        </div>
    );
};
