# Quick Reference Guide

## 🚀 Getting Started (30 seconds)

```bash
cd /home/alamino/Desktop/BootCampTalanWeek1/LLMFrontEndComp
npm install
npm run dev
```

Open: `http://localhost:5173`

---

## 📂 File Count Summary

- **TypeScript/TSX Files**: 40
- **CSS Modules**: 22
- **Components**: 22
- **Pages**: 1
- **Hooks**: 3
- **Context Providers**: 1
- **Type Definitions**: 1 file (9 interfaces)
- **Utilities**: 12+ functions
- **Documentation Files**: 4

**Total Project Files**: 80+

---

## 🗺️ Application Routes

```
/ ............................ Home page (featured products)
/products .................... Product listing (all products)
/products/:id ................ Product detail page
/cart ........................ Shopping cart
/checkout .................... Checkout flow (3 steps)
/order-success/:orderNumber .. Order confirmation
```

---

## 🎨 Component Quick Reference

### Common Components (`src/components/common/`)
```tsx
<Button variant="primary" size="large" />
<Input label="Email" error={error} />
<Card hoverable onClick={fn} />
<Rating value={4.5} showValue />
<Modal isOpen={true} onClose={fn} />
```

### Layout (`src/components/layout/`)
```tsx
<Header />  // Logo, search, cart
<Footer />  // Links, info
```

### Products (`src/components/products/`)
```tsx
<ProductCard product={product} />
<ProductList />
<ProductDetail />
```

### Cart & Checkout (`src/components/cart/`, `src/components/checkout/`)
```tsx
<Cart />
<Checkout />
<OrderSuccess />
```

---

## 🔧 Context & Hooks

### CartContext
```tsx
import { useCart } from '@/context/CartContext';

const { 
  items,           // CartItem[]
  addToCart,       // (product, qty) => void
  removeFromCart,  // (id) => void
  updateQuantity,  // (id, qty) => void
  clearCart,       // () => void
  subtotal,        // number
  tax,             // number
  shipping,        // number
  total,           // number
  getItemCount     // () => number
} = useCart();
```

### Custom Hooks
```tsx
// Persist state in localStorage
const [value, setValue] = useLocalStorage<T>('key', initialValue);

// Debounce rapidly changing values
const debouncedValue = useDebounce(value, 300);

// Responsive breakpoints
const { isMobile, isTablet, isDesktop } = useMediaQuery();
```

---

## 🛠️ Utility Functions (`src/utils/helpers.ts`)

```tsx
// Currency
formatCurrency(299.99) → "$299.99"

// Date
formatDate("2026-02-11") → "February 11, 2026"
calculateDeliveryDate(7) → ISO date string

// Calculations
calculateTax(100) → 8.00
calculateShipping(100) → 0 (free over $100)

// Validation
validateEmail(email) → boolean
validatePhone(phone) → boolean
validateZipCode(zip) → boolean

// Other
generateOrderNumber() → "ORD-ABC123"
truncateText(text, 50) → "Text..."
maskCardNumber("1234567890123456") → "**** **** **** 3456"
```

---

## 📦 Type Definitions (`src/types/index.ts`)

```typescript
Product              // Full product data
CartItem             // Product + quantity
Review               // Customer review
ShippingAddress      // Delivery address
PaymentInfo          // Payment details
Order                // Complete order
ProductFilters       // Filter options
SortOption           // Sort types
User                 // User session
```

---

## 🎯 Common Tasks

### Add a Product
Edit `src/data/products.ts`:
```tsx
{
  id: '16',
  title: 'New Product',
  description: '...',
  price: 99.99,
  category: 'Electronics',
  images: ['url1', 'url2'],
  rating: 4.5,
  reviewCount: 100,
  stock: 50,
  brand: 'Brand',
  tags: ['tag1', 'tag2']
}
```

### Change Colors
Edit component CSS modules:
```css
/* Primary: #4f46e5 */
/* Success: #059669 */
/* Danger: #dc2626 */
/* Warning: #f59e0b */
```

### Add a Route
Edit `src/App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```

---

## 📊 Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Context Action (if cart-related)
    ↓
State Update
    ↓
localStorage (if cart-related)
    ↓
Re-render
    ↓
UI Update
```

---

## 🧪 Testing Workflow (Recommended)

```bash
# Install testing dependencies (not included)
npm install -D @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test

# Example test
test('adds product to cart', () => {
  const { getByText } = render(<ProductCard product={mockProduct} />);
  fireEvent.click(getByText('Add to Cart'));
  expect(getItemCount()).toBe(1);
});
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
.component { /* Base: mobile */ }

@media (min-width: 768px) {  /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1920px) { /* Wide */ }
```

---

## 🔍 Debugging Tips

### View Cart State
```tsx
console.log('Cart:', useCart());
```

### Check localStorage
```javascript
// Browser console
localStorage.getItem('shopping-cart')
localStorage.getItem('orders')
```

### Clear All Data
```javascript
localStorage.clear()
```

### TypeScript Errors
```bash
npm run build  # Shows all TS errors
```

---

## ⚡ Performance Tips

1. **React.memo** for expensive components
2. **useMemo** for expensive calculations
3. **useCallback** for event handlers
4. **Lazy loading** for images
5. **Code splitting** for routes

---

## 🚢 Deployment Checklist

- [ ] `npm run build` succeeds
- [ ] Test production build: `npm run preview`
- [ ] Update environment variables
- [ ] Configure base URL (if subdirectory)
- [ ] Test all routes
- [ ] Check responsive design
- [ ] Verify cart persistence
- [ ] Test checkout flow

---

## 📚 Documentation Files

- `README.md` - Main documentation
- `SETUP.md` - Installation & setup guide
- `COMPONENTS.md` - Component documentation
- `PROJECT_SUMMARY.md` - Project evaluation & metrics
- `QUICK_REFERENCE.md` - This file

---

## 🎓 Learning Resources

**This project demonstrates:**
- React 18 with hooks
- TypeScript strict mode
- Context API
- Custom hooks
- CSS Modules
- Responsive design
- Form validation
- localStorage persistence
- React Router
- Component composition

---

## 💡 Common Issues & Solutions

### Port in use
```bash
npm run dev -- --port 3000
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Types not working
```bash
npx tsc --noEmit
```

### Build fails
Check `tsconfig.json` paths and imports

---

## ⌨️ VS Code Tips

### Recommended Extensions
- ESLint
- TypeScript and JavaScript Language Features
- CSS Modules

### Keyboard Shortcuts
- `Ctrl+P` - Quick file open
- `Ctrl+Shift+F` - Search in files
- `F12` - Go to definition
- `Shift+F12` - Find all references

---

## 📈 Project Stats at a Glance

```
Components:        22
TypeScript Files:  40
CSS Modules:       22
Custom Hooks:      3
Routes:            6
Products:          15
Reviews:           4
Type Interfaces:   9
Utility Functions: 12+
Documentation:     4 files
Lines of Code:     ~2,800
```

---

## 🎯 Next Steps

1. **Run the app**: `npm run dev`
2. **Browse products**: Go to /products
3. **Test cart**: Add items, checkout
4. **Read docs**: Check README.md
5. **Customize**: Modify products, colors, styles
6. **Deploy**: Build and host

---

**Quick Start: 3 commands away from running!**

```bash
npm install && npm run dev
```

**Open: http://localhost:5173 🚀**
