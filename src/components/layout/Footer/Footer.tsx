import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

/**
 * Footer Component
 * Site footer with links and company information
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <h3 className={styles.heading}>About ShopHub</h3>
            <p className={styles.description}>
              Your one-stop shop for quality products at great prices. 
              We're committed to providing the best shopping experience.
            </p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.heading}>Shop</h3>
            <ul className={styles.list}>
              <li><Link to="/products" className={styles.link}>All Products</Link></li>
              <li><Link to="/products?category=Electronics" className={styles.link}>Electronics</Link></li>
              <li><Link to="/products?category=Accessories" className={styles.link}>Accessories</Link></li>
              <li><Link to="/products?category=Home & Kitchen" className={styles.link}>Home & Kitchen</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.heading}>Customer Service</h3>
            <ul className={styles.list}>
              <li><a href="#" className={styles.link}>Contact Us</a></li>
              <li><a href="#" className={styles.link}>Shipping Info</a></li>
              <li><a href="#" className={styles.link}>Returns</a></li>
              <li><a href="#" className={styles.link}>FAQ</a></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.heading}>Legal</h3>
            <ul className={styles.list}>
              <li><a href="#" className={styles.link}>Privacy Policy</a></li>
              <li><a href="#" className={styles.link}>Terms of Service</a></li>
              <li><a href="#" className={styles.link}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} ShopHub. All rights reserved.
          </p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Facebook">📘</a>
            <a href="#" className={styles.socialLink} aria-label="Twitter">🐦</a>
            <a href="#" className={styles.socialLink} aria-label="Instagram">📷</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
