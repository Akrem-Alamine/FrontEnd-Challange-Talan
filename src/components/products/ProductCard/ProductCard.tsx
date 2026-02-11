import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button, Card, Rating } from '@/components/common';
import { formatCurrency } from '@/utils/helpers';
import styles from './ProductCard.module.css';

/**
 * ProductCard component props
 */
interface ProductCardProps {
  /** Product data */
  product: Product;
}

/**
 * ProductCard Component
 * Displays individual product in grid layout
 */
export const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;

  return (
    <Card className={styles.card} onClick={handleClick} hoverable>
      <div className={styles.imageContainer}>
        <img
          src={product.images[0]}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />
        {hasDiscount && (
          <span className={styles.discountBadge}>
            -{Math.round((1 - product.discountPrice! / product.price) * 100)}%
          </span>
        )}
        {product.stock < 10 && product.stock > 0 && (
          <span className={styles.stockBadge}>Only {product.stock} left</span>
        )}
        {product.stock === 0 && (
          <span className={styles.outOfStockBadge}>Out of Stock</span>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.brand}>{product.brand}</p>

        <Rating 
          value={product.rating} 
          size="small" 
          showValue 
          reviewCount={product.reviewCount}
        />

        <div className={styles.priceContainer}>
          <span className={styles.price}>{formatCurrency(displayPrice)}</span>
          {hasDiscount && (
            <span className={styles.originalPrice}>{formatCurrency(product.price)}</span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          fullWidth
          size="small"
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </Card>
  );
});
