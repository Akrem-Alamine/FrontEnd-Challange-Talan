import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Button } from '@/components/common';
import { ProductCard } from '@/components/products/ProductCard';
import styles from './Home.module.css';

/**
 * Home Component
 * Landing page with featured products and categories
 */
export function Home() {
  const navigate = useNavigate();
  
  // Featured products (discounted items)
  const featuredProducts = products.filter(p => p.discountPrice).slice(0, 4);
  
  // New arrivals (latest products)
  const newArrivals = products.slice(0, 4);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to ShopHub</h1>
          <p className={styles.heroSubtitle}>
            Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, free shipping on orders over $100.
          </p>
          <div className={styles.heroActions}>
            <Button size="large" onClick={() => navigate('/products')}>
              Shop Now
            </Button>
            <Button size="large" variant="outline" onClick={() => navigate('/products')}>
              Browse Categories
            </Button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <span className={styles.heroEmoji}>🛍️</span>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🚚</span>
          <h3 className={styles.featureTitle}>Free Shipping</h3>
          <p className={styles.featureText}>On orders over $100</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>🔒</span>
          <h3 className={styles.featureTitle}>Secure Payment</h3>
          <p className={styles.featureText}>100% secure transactions</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>↩️</span>
          <h3 className={styles.featureTitle}>Easy Returns</h3>
          <p className={styles.featureText}>30-day return policy</p>
        </div>
        <div className={styles.feature}>
          <span className={styles.featureIcon}>⭐</span>
          <h3 className={styles.featureTitle}>Quality Products</h3>
          <p className={styles.featureText}>Verified & authentic</p>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Deals</h2>
            <Button variant="outline" onClick={() => navigate('/products')}>
              View All
            </Button>
          </div>
          <div className={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>New Arrivals</h2>
          <Button variant="outline" onClick={() => navigate('/products')}>
            View All
          </Button>
        </div>
        <div className={styles.productGrid}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>Ready to Start Shopping?</h2>
        <p className={styles.ctaText}>
          Explore our full collection of products and find exactly what you're looking for.
        </p>
        <Button size="large" onClick={() => navigate('/products')}>
          Browse All Products
        </Button>
      </section>
    </div>
  );
}
