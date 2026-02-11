import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header, Footer } from './components/layout';
import { Home } from './pages/Home';
import { ProductList } from './components/products/ProductList';
import { ProductDetail } from './components/products/ProductDetail';
import { Cart } from './components/cart';
import { Checkout, OrderSuccess } from './components/checkout';
import './App.css';

/**
 * Main App Component
 * Root component with routing and global providers
 */
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success/:orderNumber" element={<OrderSuccess />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
