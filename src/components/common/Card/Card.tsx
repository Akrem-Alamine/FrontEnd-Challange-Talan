import React, { ReactNode } from 'react';
import styles from './Card.module.css';

/**
 * Card component props
 */
interface CardProps {
  /** Card content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Hover effect */
  hoverable?: boolean;
}

/**
 * Reusable Card Component
 * Container component for content grouping
 */
export function Card({ children, className = '', onClick, hoverable = false }: CardProps) {
  const cardClasses = [
    styles.card,
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  );
}
