/**
 * Core product interface representing items in the e-commerce store
 */
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  brand: string;
  tags: string[];
}

/**
 * Customer review for a product
 */
export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

/**
 * Item in the shopping cart
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Shopping cart state
 */
export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

/**
 * Shipping address information
 */
export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

/**
 * Payment method types
 */
export type PaymentMethod = 'credit-card' | 'debit-card' | 'paypal' | 'apple-pay';

/**
 * Payment information
 */
export interface PaymentInfo {
  method: PaymentMethod;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  cvv?: string;
}

/**
 * Order status types
 */
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Complete order information
 */
export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: Omit<PaymentInfo, 'cardNumber' | 'cvv'>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
}

/**
 * Filter options for product listing
 */
export interface ProductFilters {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating?: number;
  inStock?: boolean;
}

/**
 * Sort options for product listing
 */
export type SortOption = 'popularity' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

/**
 * User session information
 */
export interface User {
  id: string;
  email: string;
  name: string;
  isGuest: boolean;
}
