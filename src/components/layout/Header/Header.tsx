import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useDebounce } from '@/hooks';
import styles from './Header.module.css';

/**
 * Header Component
 * Main navigation bar with logo, search, and cart
 */
export function Header() {
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const itemCount = getItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(debouncedSearch)}`);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛍️</span>
          <span className={styles.logoText}>ShopHub</span>
        </Link>

        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" className={styles.searchButton} aria-label="Search">
            🔍
          </button>
        </form>

        <nav className={styles.nav}>
          <Link to="/products" className={styles.navLink}>
            Products
          </Link>
          <Link to="/cart" className={styles.cartLink}>
            <span className={styles.cartIcon}>🛒</span>
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
