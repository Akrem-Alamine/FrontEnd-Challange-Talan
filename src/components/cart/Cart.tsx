import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/common';
import { formatCurrency } from '@/utils/helpers';
import styles from './Cart.module.css';

/**
 * Cart Component
 * Shopping cart page with item management and checkout
 */
export function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, subtotal, tax, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <div className={styles.emptyContent}>
          <span className={styles.emptyIcon}>🛒</span>
          <h2 className={styles.emptyTitle}>Your cart is empty</h2>
          <p className={styles.emptyText}>
            Add some products to your cart and they will appear here.
          </p>
          <Button onClick={() => navigate('/products')} size="large">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.content}>
        {/* Cart Items */}
        <div className={styles.itemsSection}>
          {items.map((item) => {
            const displayPrice = item.product.discountPrice || item.product.price;
            const itemTotal = displayPrice * item.quantity;

            return (
              <div key={item.product.id} className={styles.cartItem}>
                <div className={styles.itemImage}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    onClick={() => navigate(`/products/${item.product.id}`)}
                  />
                </div>

                <div className={styles.itemInfo}>
                  <h3
                    className={styles.itemTitle}
                    onClick={() => navigate(`/products/${item.product.id}`)}
                  >
                    {item.product.title}
                  </h3>
                  <p className={styles.itemBrand}>{item.product.brand}</p>
                  <p className={styles.itemPrice}>{formatCurrency(displayPrice)} each</p>
                  
                  {item.product.stock < 10 && (
                    <p className={styles.stockWarning}>
                      Only {item.product.stock} left in stock
                    </p>
                  )}
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className={styles.quantityValue}>{item.quantity}</span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      +
                    </button>
                  </div>

                  <p className={styles.itemTotal}>{formatCurrency(itemTotal)}</p>

                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Tax (8%)</span>
              <span>{formatCurrency(tax)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
            </div>

            {subtotal < 100 && shipping > 0 && (
              <p className={styles.shippingNote}>
                Add {formatCurrency(100 - subtotal)} more for free shipping!
              </p>
            )}

            <div className={styles.summaryDivider} />

            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>

            <Button
              onClick={() => navigate('/checkout')}
              size="large"
              fullWidth
            >
              Proceed to Checkout
            </Button>

            <Button
              onClick={() => navigate('/products')}
              variant="outline"
              size="medium"
              fullWidth
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
