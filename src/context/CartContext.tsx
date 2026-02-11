import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { useLocalStorage } from '@/hooks';
import { calculateTax, calculateShipping } from '@/utils/helpers';

/**
 * Cart context type definition
 */
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Component
 * Manages shopping cart state with localStorage persistence
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  // Recalculate totals whenever cart items change
  useEffect(() => {
    const calculatedSubtotal = items.reduce((sum, item) => {
      const price = item.product.discountPrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);

    const calculatedTax = calculateTax(calculatedSubtotal);
    const calculatedShipping = calculateShipping(calculatedSubtotal);
    const calculatedTotal = calculatedSubtotal + calculatedTax + calculatedShipping;

    setSubtotal(calculatedSubtotal);
    setTax(calculatedTax);
    setShipping(calculatedShipping);
    setTotal(calculatedTotal);
  }, [items]);

  /**
   * Add a product to the cart
   * @param product Product to add
   * @param quantity Quantity to add (default: 1)
   */
  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.product.id === product.id);

      if (existingItem) {
        // Update quantity if item already exists
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
            : item
        );
      }

      // Add new item
      return [...currentItems, { product, quantity: Math.min(quantity, product.stock) }];
    });
  };

  /**
   * Remove a product from the cart
   * @param productId ID of product to remove
   */
  const removeFromCart = (productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.product.id !== productId));
  };

  /**
   * Update quantity of a cart item
   * @param productId ID of product to update
   * @param quantity New quantity
   */
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item
      )
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setItems([]);
  };

  /**
   * Get total number of items in cart
   */
  const getItemCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  /**
   * Get cart total value
   */
  const getCartTotal = (): number => {
    return total;
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getItemCount,
    subtotal,
    tax,
    shipping,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * Hook to use cart context
 * @throws Error if used outside CartProvider
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
