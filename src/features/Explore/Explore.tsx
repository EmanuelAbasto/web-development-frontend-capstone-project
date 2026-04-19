import React, { useState, useEffect } from 'react';
import type { BookData } from '../../types/BookData';
import type { Category } from '../../types/Category';
import type { PaginatedResponse } from '../../types/PaginatedResponse';
import { BookHorizontalCard } from '../../components/BookHorizontalCard/BookHorizontalCard';
import { ENV } from '../../config/environment';
import styles from './Explore.module.scss';

export const Explore: React.FC = () => {
    const [books, setBooks] = useState<BookData[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        fetch(ENV.API_CATEGORIES_URL)
            .then(res => res.json())
            .then((data: Category[]) => setCategories(data))
            .catch(() => {});
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams({
                page: page.toString(),
                size: ENV.BOOKS_PAGE_SIZE.toString(),
                category: activeCategory,
                search: searchTerm
            });

            fetch(`${ENV.API_BOOKS_URL_PAGINATED}?${params.toString()}`)
                .then(res => res.json())
                .then((data: PaginatedResponse) => {
                    setBooks(data?.books || []);
                    setTotalPages(data?.totalPages || 0);
                });
        }, ENV.BOOKS_SEARCH_DEBOUNCE);

        return () => clearTimeout(handler);
    }, [page, activeCategory, searchTerm]);

    return (
        <main className={styles.explorePage}>
            <div className={styles.stickyHeader}>
                <div className="container">
                    <div className={styles.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Search by author or keywords..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                        />
                    </div>
                    <nav className={styles.categoryNav}>
                        <button
                            className={activeCategory === '' ? styles.active : ''}
                            onClick={() => { setActiveCategory(''); setPage(0); }}
                        >
                            All
                        </button>
                        {categories?.map(cat => (
                            <button
                                key={cat.id}
                                className={activeCategory === cat.name ? styles.active : ''}
                                onClick={() => { setActiveCategory(cat.name); setPage(0); }}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className={`container ${styles.results}`}>
                <div className={styles.list}>
                    {books && books.length > 0 ? (
                        books.map(book => (
                            <BookHorizontalCard key={book.id} book={book} />
                        ))
                    ) : (
                        <div className={styles.noResults}>
                            <p>No books found for this search.</p>
                        </div>
                    )}
                </div>

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                            Previous
                        </button>
                        <span>{page + 1} of {totalPages}</span>
                        <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                            Next
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};