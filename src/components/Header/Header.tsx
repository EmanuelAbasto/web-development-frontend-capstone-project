import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart, LogOut, User } from 'lucide-react';
import styles from './Header.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

export const Header: React.FC = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { state: cartState } = useCart();

  const linkClass = ({ isActive }: { isActive: boolean }): string =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={`${styles.nav} container`}>
        <Link to="/" className={styles.logoContainer}>
          <div className={styles.iconBox}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
          <span className={styles.logoText}>Library</span>
        </Link>

        <ul className={styles.links}>
          <li>
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className={linkClass}>
              Explore
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-books" className={linkClass}>
              My Books
            </NavLink>
          </li>
        </ul>

        <div className={styles.actions}>
          <Link to="/cart" className={styles.cartButton} title="My cart">
            <ShoppingCart size={24} />
            {cartState.totalItems > 0 && (
              <span className={styles.cartBadge}>{cartState.totalItems}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/profile" className={styles.btnProfile} title={user?.fullName || 'Profile'}>
                <User size={24} />
              </Link>

              <button onClick={logout} className={styles.btnLogin}>
                <LogOut size={20} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.btnLogin}>
                Login
              </Link>
              <Link to="/register" className={styles.btnSignUp}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};