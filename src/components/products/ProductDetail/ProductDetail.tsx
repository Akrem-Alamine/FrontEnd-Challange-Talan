import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products, getProductReviews, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Button, Rating } from '@/components/common';
import { ProductCard } from '../ProductCard';
import { formatCurrency, formatDate } from '@/utils/helpers';
import styles from './ProductDetail.module.css';

/**
 * ProductDetail Component
 * Detailed product view with image gallery, reviews, and related products
 */
export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find((p) => p.id === id);
  const reviews = product ? getProductReviews(product.id) : [];
  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const displayPrice = product.discountPrice || product.price;
  const hasDiscount = !!product.discountPrice;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate('/products')}>
        ← Back to Products
      </button>

      <div className={styles.productSection}>
        {/* Image Gallery */}
        <div className={styles.imageSection}>
          <div 
            className={`${styles.mainImage} ${isZoomed ? styles.zoomed : ''}`}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className={styles.image}
            />
          </div>
          
          {product.images.length > 1 && (
            <div className={styles.thumbnails}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${
                    selectedImage === index ? styles.thumbnailActive : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.infoSection}>
          <div className={styles.category}>{product.category}</div>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.brand}>by {product.brand}</p>

          <div className={styles.ratingSection}>
            <Rating 
              value={product.rating} 
              size="large" 
              showValue 
              reviewCount={product.reviewCount}
            />
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>{formatCurrency(displayPrice)}</span>
            {hasDiscount && (
              <>
                <span className={styles.originalPrice}>{formatCurrency(product.price)}</span>
                <span className={styles.discount}>
                  Save {formatCurrency(product.price - displayPrice)}
                </span>
              </>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.stockInfo}>
            {product.stock > 0 ? (
              <span className={styles.inStock}>✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className={styles.outOfStock}>Out of Stock</span>
            )}
          </div>

          <div className={styles.quantitySection}>
            <label className={styles.quantityLabel}>Quantity:</label>
            <div className={styles.quantityControl}>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className={styles.quantityValue}>{quantity}</span>
              <button
                className={styles.quantityButton}
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              onClick={handleAddToCart}
              size="large"
              fullWidth
              disabled={product.stock === 0}
            >
              Add to Cart
            </Button>
          </div>

          <div className={styles.tags}>
            {product.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <div className={styles.reviewsSection}>
          <h2 className={styles.sectionTitle}>Customer Reviews</h2>
          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div>
                    <p className={styles.reviewAuthor}>{review.userName}</p>
                    <p className={styles.reviewDate}>{formatDate(review.date)}</p>
                  </div>
                  <Rating value={review.rating} size="small" />
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
                <button className={styles.helpfulButton}>
                  👍 Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.sectionTitle}>Related Products</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
