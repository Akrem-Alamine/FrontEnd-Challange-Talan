import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common';
import { formatCurrency, formatDate } from '@/utils/helpers';
import styles from './OrderSuccess.module.css';

/**
 * OrderSuccess Component
 * Order confirmation page after successful checkout
 */
export function OrderSuccess() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find((o: any) => o.orderNumber === orderNumber);

  if (!order) {
    return (
      <div className={styles.notFound}>
        <h2>Order not found</h2>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.iconContainer}>
          <span className={styles.successIcon}>✓</span>
        </div>

        <h1 className={styles.title}>Order Confirmed!</h1>
        <p className={styles.subtitle}>
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div className={styles.orderNumber}>
          <span className={styles.label}>Order Number:</span>
          <span className={styles.value}>{order.orderNumber}</span>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <h3>📦 Estimated Delivery</h3>
            <p>{formatDate(order.estimatedDelivery)}</p>
          </div>

          <div className={styles.infoCard}>
            <h3>💰 Total Amount</h3>
            <p className={styles.totalAmount}>{formatCurrency(order.total)}</p>
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h2>Order Details</h2>
          
          <div className={styles.addressSection}>
            <h3>Shipping Address</h3>
            <p>{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.addressLine1}</p>
            {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
            <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
            <p>{order.shippingAddress.phone}</p>
          </div>

          <div className={styles.itemsSection}>
            <h3>Items ({order.items.length})</h3>
            {order.items.map((item: any) => (
              <div key={item.product.id} className={styles.orderItem}>
                <img src={item.product.images[0]} alt={item.product.title} />
                <div className={styles.itemInfo}>
                  <p className={styles.itemTitle}>{item.product.title}</p>
                  <p className={styles.itemDetails}>
                    Qty: {item.quantity} × {formatCurrency(item.product.discountPrice || item.product.price)}
                  </p>
                </div>
                <p className={styles.itemTotal}>
                  {formatCurrency((item.product.discountPrice || item.product.price) * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <Button onClick={() => navigate('/products')} size="large" fullWidth>
            Continue Shopping
          </Button>
        </div>

        <p className={styles.emailNote}>
          📧 A confirmation email has been sent to your registered email address.
        </p>
      </div>
    </div>
  );
}
