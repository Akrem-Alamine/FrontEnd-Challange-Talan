import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, SortOption } from '@/types';
import { products, getCategories } from '@/data/products';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.css';

/**
 * ProductList Component
 * Main product listing page with filtering, sorting, and search
 */
export function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  
  const searchQuery = searchParams.get('search') || '';
  const categories = getCategories();

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    // Price range filter
    filtered = filtered.filter((p) => {
      const price = p.discountPrice || p.price;
      return price >= priceRange.min && price <= priceRange.max;
    });

    return filtered;
  }, [products, searchQuery, selectedCategories, priceRange]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
      case 'price-desc':
        return sorted.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popularity':
        return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setSearchParams({});
  };

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.filterSection}>
          <div className={styles.filterHeader}>
            <h2 className={styles.filterTitle}>Filters</h2>
            <button className={styles.clearButton} onClick={handleClearFilters}>
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Categories</h3>
            <div className={styles.checkboxGroup}>
              {categories.map((category) => (
                <label key={category} className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className={styles.filterGroup}>
            <h3 className={styles.filterGroupTitle}>Price Range</h3>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: Number(e.target.value) })
                }
                className={styles.priceInput}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: Number(e.target.value) })
                }
                className={styles.priceInput}
              />
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>
              {searchQuery ? `Search results for "${searchQuery}"` : 'All Products'}
            </h1>
            <p className={styles.count}>{sortedProducts.length} products found</p>
          </div>

          <div className={styles.sortContainer}>
            <label htmlFor="sort" className={styles.sortLabel}>
              Sort by:
            </label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className={styles.sortSelect}
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {sortedProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>No products found</p>
            <button className={styles.emptyButton} onClick={handleClearFilters}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
