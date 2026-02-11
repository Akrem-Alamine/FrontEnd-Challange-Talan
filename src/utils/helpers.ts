/**
 * Format a number as currency with proper locale and symbol
 * @param {number} amount The amount to format
 * @param {string} currency The currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Calculate tax amount based on subtotal
 * @param {number} subtotal The subtotal amount
 * @param {number} taxRate The tax rate (default: 0.08 for 8%)
 * @returns {number} Tax amount
 */
export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return Math.round(subtotal * taxRate * 100) / 100;
}

/**
 * Calculate shipping cost based on subtotal
 * @param {number} subtotal The subtotal amount
 * @returns {number} Shipping cost
 */
export function calculateShipping(subtotal: number): number {
  if (subtotal >= 100) return 0; // Free shipping over $100
  if (subtotal >= 50) return 5.99;
  return 9.99;
}

/**
 * Generate a unique order number
 * @returns {string} Order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

/**
 * Format a date string to a readable format
 * @param {string} dateString ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Calculate estimated delivery date
 * @param {number} daysToAdd Number of days to add
 * @returns {string} ISO date string
 */
export function calculateDeliveryDate(daysToAdd: number = 7): string {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString();
}

/**
 * Validate email format
 * @param {string} email Email address to validate
 * @returns {boolean} True if valid email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone Phone number to validate
 * @returns {boolean} True if valid phone format
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate ZIP code format (US)
 * @param {string} zip ZIP code to validate
 * @returns {boolean} True if valid ZIP format
 */
export function validateZipCode(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

/**
 * Truncate text to a maximum length
 * @param {string} text Text to truncate
 * @param {number} maxLength Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Mask credit card number for display
 * @param {string} cardNumber Full card number
 * @returns {string} Masked card number
 */
export function maskCardNumber(cardNumber: string): string {
  if (!cardNumber || cardNumber.length < 4) return '****';
  return `**** **** **** ${cardNumber.slice(-4)}`;
}
