import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { NavLink, Outlet } from 'react-router-dom';
import { User, ShoppingCart, BookOpen, LogOut } from 'lucide-react';
import styles from './Profile.module.scss';

export const Profile: React.FC = () => {
    const { user, logout } = useAuth();
    const { state: cartState } = useCart();

    if (!user) {
        return (
            <div className={styles.container}>
                <div className={styles.notAuthenticated}>
                    <h1>Access Denied</h1>
                    <p>You must be logged in to view your profile</p>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        logout();
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }): string =>
        isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

    return (
        <div className={styles.container}>
            <div className={styles.profileWrapper}>
                <section className={styles.userSection}>
                    <div className={styles.userCard}>
                        <div className={styles.userAvatar}>
                            <User size={48} />
                        </div>
                        <div className={styles.userInfo}>
                            <h1>{user.fullName}</h1>
                            <p className={styles.userEmail}>{user.email}</p>
                        </div>
                        <button onClick={handleLogout} className={styles.logoutBtn} title="Log out">
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>
                </section>

                <section className={styles.navigationSection}>
                    <nav className={styles.tabsNavigation}>
                        <NavLink to="/profile/info" className={navLinkClass}>
                            <User size={20} />
                            My Information
                        </NavLink>
                        <NavLink to="/profile/reservations" className={navLinkClass}>
                            <BookOpen size={20} />
                            My Reservations
                        </NavLink>
                        <NavLink to="/profile/cart" className={navLinkClass}>
                            <ShoppingCart size={20} />
                            My Cart {cartState.totalItems > 0 && `(${cartState.totalItems})`}
                        </NavLink>
                    </nav>
                </section>

                <section className={styles.contentSection}>
                    <Outlet />
                </section>
            </div>
        </div>
    );
};
