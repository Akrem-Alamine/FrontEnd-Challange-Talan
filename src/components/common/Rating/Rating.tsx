import React from 'react';
import styles from './Rating.module.css';

/**
 * Rating component props
 */
interface RatingProps {
  /** Rating value (0-5) */
  value: number;
  /** Maximum rating (default: 5) */
  max?: number;
  /** Size of stars */
  size?: 'small' | 'medium' | 'large';
  /** Show numeric value */
  showValue?: boolean;
  /** Number of reviews */
  reviewCount?: number;
}

/**
 * Rating Component
 * Displays star rating with optional review count
 */
export function Rating({ 
  value, 
  max = 5, 
  size = 'medium', 
  showValue = false,
  reviewCount 
}: RatingProps) {
  const percentage = (value / max) * 100;

  return (
    <div className={styles.ratingContainer}>
      <div className={`${styles.stars} ${styles[size]}`} aria-label={`Rating: ${value} out of ${max}`}>
        <div className={styles.starsEmpty}>
          {'★'.repeat(max)}
        </div>
        <div className={styles.starsFilled} style={{ width: `${percentage}%` }}>
          {'★'.repeat(max)}
        </div>
      </div>
      {showValue && <span className={styles.value}>{value.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className={styles.reviewCount}>({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}
