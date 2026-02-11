# Component Documentation

## Architecture Overview

This e-commerce application follows a component-based architecture with clear separation between:
- **Presentational Components**: UI-focused components (Button, Input, Card, etc.)
- **Container Components**: Logic and data management (ProductList, Cart, Checkout)
- **Layout Components**: App structure (Header, Footer)
- **Page Components**: Route-level components (Home)

---

## Component Hierarchy

```
App
├── Header
│   └── CartIcon (with badge)
├── Routes
│   ├── Home
│   │   └── ProductCard (multiple)
│   ├── ProductList
│   │   ├── Filters
│   │   └── ProductCard (multiple)
│   ├── ProductDetail
│   │   ├── ImageGallery
│   │   ├── Rating
│   │   ├── Reviews
│   │   └── RelatedProducts
│   ├── Cart
│   │   ├── CartItem (multiple)
│   │   └── OrderSummary
│   ├── Checkout
│   │   ├── ShippingForm
│   │   ├── PaymentForm
│   │   └── OrderReview
│   └── OrderSuccess
└── Footer
```

---

## Common Components

### Button
**Purpose**: Reusable, styled button with multiple variants  
**Props**:
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `fullWidth`: boolean
- `loading`: boolean
- `disabled`: boolean

**Usage**:
```tsx
<Button variant="primary" size="large" onClick={handleClick}>
  Add to Cart
</Button>
```

**Features**:
- Hover and focus states
- Loading spinner
- Responsive sizing
- Accessibility support

---

### Input
**Purpose**: Form input with validation and error display  
**Props**:
- `label`: string
- `error`: string
- `helperText`: string
- `fullWidth`: boolean
- `required`: boolean

**Usage**:
```tsx
<Input
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>
```

**Features**:
- Built-in validation states
- Error message display
- Helper text support
- Accessible labels

---

### Card
**Purpose**: Container component for content grouping  
**Props**:
- `hoverable`: boolean (adds hover effect)
- `onClick`: function (makes card clickable)
- `className`: string

**Usage**:
```tsx
<Card hoverable onClick={handleClick}>
  <h3>Product Title</h3>
  <p>Product description</p>
</Card>
```

---

### Rating
**Purpose**: Display star ratings  
**Props**:
- `value`: number (0-5)
- `max`: number (default: 5)
- `size`: 'small' | 'medium' | 'large'
- `showValue`: boolean
- `reviewCount`: number

**Usage**:
```tsx
<Rating value={4.5} showValue reviewCount={123} />
```

---

### Modal
**Purpose**: Accessible modal dialog  
**Props**:
- `isOpen`: boolean
- `onClose`: function
- `title`: string
- `showCloseButton`: boolean

**Usage**:
```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm">
  <p>Are you sure?</p>
</Modal>
```

**Features**:
- Escape key to close
- Click outside to close
- Body scroll lock
- Focus management

---

## Product Components

### ProductCard
**Purpose**: Display product in grid layout  
**Features**:
- Product image with hover effect
- Discount badge
- Stock warning badge
- Rating display
- Add to cart button
- Click to view details

**Optimizations**:
- React.memo to prevent unnecessary re-renders
- Lazy image loading
- Responsive layout

---

### ProductList
**Purpose**: Product listing with filtering and sorting  
**Features**:
- Category filter (multi-select)
- Price range filter
- Search functionality
- Sort by: popularity, price, rating
- Responsive grid layout
- Empty state handling

**State Management**:
- Uses URL search params for filters
- Memoized filtering and sorting
- Debounced search

---

### ProductDetail
**Purpose**: Detailed product view  
**Features**:
- Image gallery with zoom
- Quantity selector
- Customer reviews
- Related products
- Stock information
- Add to cart

**Image Gallery**:
- Thumbnail navigation
- Hover to zoom
- Smooth transitions

---

## Shopping Flow

### Cart
**Purpose**: Shopping cart management  
**Features**:
- View all cart items
- Update quantities
- Remove items
- Order summary (subtotal, tax, shipping)
- Empty cart state
- Free shipping indicator

**Data Flow**:
```
CartContext → Cart Component → Display & Actions
```

---

### Checkout
**Purpose**: Multi-step checkout process  
**Steps**:
1. Shipping Information
2. Payment Details
3. Order Review

**Features**:
- Form validation
- Progress indicator
- Edit previous steps
- Real-time order summary
- Local storage for orders

**Validation**:
- Email format
- Phone number
- ZIP code
- Credit card (basic)
- Required fields

---

### OrderSuccess
**Purpose**: Order confirmation page  
**Features**:
- Order number display
- Delivery estimate
- Order summary
- Shipping details
- Itemized list

---

## State Management

### CartContext
**Purpose**: Global cart state  
**Provides**:
- `items`: CartItem[]
- `addToCart(product, quantity)`
- `removeFromCart(productId)`
- `updateQuantity(productId, quantity)`
- `clearCart()`
- `subtotal`, `tax`, `shipping`, `total`
- `getItemCount()`

**Persistence**:
- Automatically syncs with localStorage
- Survives page refreshes

---

## Custom Hooks

### useLocalStorage
**Purpose**: Persist state in localStorage  
**Returns**: [value, setValue]  
**Features**:
- Automatic JSON serialization
- SSR-safe
- Error handling

---

### useDebounce
**Purpose**: Debounce rapidly changing values  
**Returns**: debouncedValue  
**Use Cases**:
- Search input
- Scroll handling
- API calls

---

### useMediaQuery
**Purpose**: Responsive design hook  
**Returns**:
- `isMobile`: boolean
- `isTablet`: boolean
- `isDesktop`: boolean
- `width`, `height`: number

---

## Utility Functions

### Currency Formatting
```tsx
formatCurrency(299.99) // "$299.99"
```

### Date Formatting
```tsx
formatDate("2026-02-11") // "February 11, 2026"
```

### Validation
```tsx
validateEmail(email)    // boolean
validatePhone(phone)    // boolean
validateZipCode(zip)    // boolean
```

### Calculations
```tsx
calculateTax(subtotal)       // tax amount
calculateShipping(subtotal)  // shipping cost
calculateDeliveryDate(days)  // estimated delivery
```

---

## Styling Approach

### CSS Modules
Each component has scoped styles:
```
Component.tsx
Component.module.css
index.ts
```

### Design Tokens
- **Spacing**: 0.25rem increments
- **Border Radius**: 0.5rem, 0.75rem, 1rem
- **Colors**: Tailwind-inspired palette
- **Shadows**: Multiple elevation levels

### Responsive Strategy
Mobile-first with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Performance Optimizations

1. **React.memo**: ProductCard to prevent re-renders
2. **useMemo**: Filter and sort operations
3. **Lazy Loading**: Images with native loading="lazy"
4. **Code Splitting**: Automatic with Vite
5. **Debouncing**: Search input
6. **Bundle Optimization**: Vendor chunks

---

## Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation
- Focus management
- Form labels and error messages
- Color contrast (WCAG AA)
- Screen reader support

---

## Error Handling

### Form Validation
- Real-time validation
- Clear error messages
- Required field indicators
- Format validation

### Empty States
- Empty cart
- No products found
- Order not found

### User Feedback
- Loading states
- Success messages
- Error boundaries (recommended for production)

---

## Testing Recommendations

### Unit Tests
```typescript
// Button.test.tsx
test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

### Integration Tests
- Cart add/remove operations
- Checkout flow completion
- Filter and sort functionality

### E2E Tests
- Complete purchase flow
- Navigation between pages
- Form submissions

---

## Future Improvements

### Features
- User authentication
- Wishlist
- Product reviews submission
- Order history
- Saved addresses

### Technical
- Server-side rendering (Next.js)
- API integration
- Real payment gateway
- Image CDN
- Analytics tracking
- Error monitoring (Sentry)

### UX Enhancements
- Skeleton loaders
- Optimistic updates
- Undo actions
- Product comparisons
- Quick view modal

---

**This documentation provides a comprehensive overview of all components and their interactions.**
