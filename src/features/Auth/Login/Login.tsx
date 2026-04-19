import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../AuthForm.module.scss';
import { useAuth } from '../../../hooks/useAuth';

export const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            await login(email, password);
            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred while signing in');
            }
        } finally {
            setIsLoading(false);
        }
    }, [email, password, login, navigate]);

    return (
        <div className={styles.authContainer}>
            <form className={styles.authCard} onSubmit={handleSubmit}>
                <header className={styles.header}>
                    <h2>Welcome back!</h2>
                    <p>Log in to your Library account</p>
                </header>

                {error && <div className={styles.errorBanner}>{error}</div>}

                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Sign In'}
                </button>

                <p className={styles.footerText}>
                    New here? <Link to="/register">Create an account</Link>
                </p>
            </form>
        </div>
    );
};