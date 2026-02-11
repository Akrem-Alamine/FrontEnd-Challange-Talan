import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShippingAddress, PaymentInfo, Order } from '@/types';
import { Button, Input } from '@/components/common';
import { 
  formatCurrency, 
  generateOrderNumber, 
  calculateDeliveryDate,
  validateEmail,
  validatePhone,
  validateZipCode 
} from '@/utils/helpers';
import styles from './Checkout.module.css';

/**
 * Checkout Component
 * Multi-step checkout process with form validation
 */
export function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, tax, shipping, total, clearCart } = useCart();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'credit-card',
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  if (items.length === 0) {
    return (
      <div className={styles.emptyCheckout}>
        <h2>Your cart is empty</h2>
        <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
      </div>
    );
  }

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!shippingAddress.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!shippingAddress.addressLine1.trim()) {
      newErrors.addressLine1 = 'Address is required';
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!shippingAddress.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!validateZipCode(shippingAddress.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code';
    }
    if (!validatePhone(shippingAddress.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!paymentInfo.cardHolder?.trim()) {
      newErrors.cardHolder = 'Cardholder name is required';
    }
    if (!paymentInfo.cardNumber || paymentInfo.cardNumber.length < 13) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!paymentInfo.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
    }
    if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) {
      newErrors.cvv = 'Invalid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep('payment');
      setErrors({});
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePayment()) {
      setStep('review');
      setErrors({});
    }
  };

  const handlePlaceOrder = () => {
    const order: Order = {
      id: generateOrderNumber(),
      orderNumber: generateOrderNumber(),
      items,
      shippingAddress,
      paymentInfo: {
        method: paymentInfo.method,
        cardHolder: paymentInfo.cardHolder,
        expiryDate: paymentInfo.expiryDate,
      },
      subtotal,
      tax,
      shipping,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: calculateDeliveryDate(7),
    };

    // Store order in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    navigate(`/order-success/${order.orderNumber}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>

      {/* Progress Steps */}
      <div className={styles.steps}>
        <div className={`${styles.stepItem} ${step === 'shipping' ? styles.stepActive : ''} ${
          step === 'payment' || step === 'review' ? styles.stepCompleted : ''
        }`}>
          <div className={styles.stepNumber}>1</div>
          <span className={styles.stepLabel}>Shipping</span>
        </div>
        <div className={styles.stepLine} />
        <div className={`${styles.stepItem} ${step === 'payment' ? styles.stepActive : ''} ${
          step === 'review' ? styles.stepCompleted : ''
        }`}>
          <div className={styles.stepNumber}>2</div>
          <span className={styles.stepLabel}>Payment</span>
        </div>
        <div className={styles.stepLine} />
        <div className={`${styles.stepItem} ${step === 'review' ? styles.stepActive : ''}`}>
          <div className={styles.stepNumber}>3</div>
          <span className={styles.stepLabel}>Review</span>
        </div>
      </div>

      <div className={styles.content}>
        {/* Forms Section */}
        <div className={styles.formsSection}>
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className={styles.form}>
              <h2 className={styles.sectionTitle}>Shipping Information</h2>
              
              <Input
                label="Full Name"
                value={shippingAddress.fullName}
                onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                error={errors.fullName}
                required
                fullWidth
              />
              
              <Input
                label="Address Line 1"
                value={shippingAddress.addressLine1}
                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                error={errors.addressLine1}
                required
                fullWidth
              />
              
              <Input
                label="Address Line 2"
                value={shippingAddress.addressLine2}
                onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine2: e.target.value })}
                placeholder="Apartment, suite, etc. (optional)"
                fullWidth
              />
              
              <div className={styles.formRow}>
                <Input
                  label="City"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  error={errors.city}
                  required
                  fullWidth
                />
                
                <Input
                  label="State"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  error={errors.state}
                  required
                  fullWidth
                />
              </div>
              
              <div className={styles.formRow}>
                <Input
                  label="ZIP Code"
                  value={shippingAddress.zipCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                  error={errors.zipCode}
                  required
                  fullWidth
                />
                
                <Input
                  label="Phone"
                  type="tel"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  error={errors.phone}
                  required
                  fullWidth
                />
              </div>
              
              <Button type="submit" size="large" fullWidth>
                Continue to Payment
              </Button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className={styles.form}>
              <h2 className={styles.sectionTitle}>Payment Information</h2>
              
              <div className={styles.paymentMethods}>
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    value="credit-card"
                    checked={paymentInfo.method === 'credit-card'}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value as any })}
                  />
                  <span>💳 Credit Card</span>
                </label>
                <label className={styles.paymentMethod}>
                  <input
                    type="radio"
                    value="debit-card"
                    checked={paymentInfo.method === 'debit-card'}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value as any })}
                  />
                  <span>💳 Debit Card</span>
                </label>
              </div>
              
              <Input
                label="Cardholder Name"
                value={paymentInfo.cardHolder}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardHolder: e.target.value })}
                error={errors.cardHolder}
                required
                fullWidth
              />
              
              <Input
                label="Card Number"
                type="text"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value.replace(/\s/g, '') })}
                error={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                required
                fullWidth
              />
              
              <div className={styles.formRow}>
                <Input
                  label="Expiry Date"
                  type="text"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                  error={errors.expiryDate}
                  placeholder="MM/YY"
                  required
                  fullWidth
                />
                
                <Input
                  label="CVV"
                  type="text"
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                  error={errors.cvv}
                  placeholder="123"
                  maxLength={4}
                  required
                  fullWidth
                />
              </div>
              
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setStep('shipping')}>
                  Back
                </Button>
                <Button type="submit">Continue to Review</Button>
              </div>
            </form>
          )}

          {step === 'review' && (
            <div className={styles.review}>
              <h2 className={styles.sectionTitle}>Review Order</h2>
              
              <div className={styles.reviewSection}>
                <h3>Shipping Address</h3>
                <p>{shippingAddress.fullName}</p>
                <p>{shippingAddress.addressLine1}</p>
                {shippingAddress.addressLine2 && <p>{shippingAddress.addressLine2}</p>}
                <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
                <p>{shippingAddress.phone}</p>
                <button className={styles.editButton} onClick={() => setStep('shipping')}>
                  Edit
                </button>
              </div>
              
              <div className={styles.reviewSection}>
                <h3>Payment Method</h3>
                <p>{paymentInfo.method === 'credit-card' ? 'Credit Card' : 'Debit Card'}</p>
                <p>Ending in {paymentInfo.cardNumber?.slice(-4)}</p>
                <button className={styles.editButton} onClick={() => setStep('payment')}>
                  Edit
                </button>
              </div>
              
              <div className={styles.reviewSection}>
                <h3>Order Items</h3>
                {items.map((item) => (
                  <div key={item.product.id} className={styles.reviewItem}>
                    <img src={item.product.images[0]} alt={item.product.title} />
                    <div>
                      <p className={styles.reviewItemTitle}>{item.product.title}</p>
                      <p className={styles.reviewItemDetails}>
                        Qty: {item.quantity} × {formatCurrency(item.product.discountPrice || item.product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.formActions}>
                <Button variant="outline" onClick={() => setStep('payment')}>
                  Back
                </Button>
                <Button onClick={handlePlaceOrder} size="large">
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className={styles.summarySection}>
          <div className={styles.summary}>
            <h2>Order Summary</h2>
            
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : formatCurrency(shipping)}</span>
            </div>
            
            <div className={styles.summaryDivider} />
            
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
