import { Product, Review } from '@/types';

/**
 * Mock product data for the e-commerce store
 */
export const products: Product[] = [
  {
    id: '1',
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality. Perfect for travel and focused work.',
    price: 299.99,
    discountPrice: 249.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 1234,
    stock: 45,
    brand: 'AudioTech',
    tags: ['wireless', 'noise-cancelling', 'bluetooth', 'premium'],
  },
  {
    id: '2',
    title: 'Smart Fitness Watch Pro',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 100+ workout modes. Water-resistant up to 50m.',
    price: 399.99,
    category: 'Wearables',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    ],
    rating: 4.6,
    reviewCount: 892,
    stock: 67,
    brand: 'FitTech',
    tags: ['fitness', 'smartwatch', 'health', 'gps'],
  },
  {
    id: '3',
    title: 'Minimalist Leather Backpack',
    description: 'Handcrafted genuine leather backpack with laptop compartment, multiple pockets, and ergonomic design. Perfect for professionals and travelers.',
    price: 189.99,
    discountPrice: 159.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 567,
    stock: 23,
    brand: 'LeatherCraft',
    tags: ['leather', 'backpack', 'professional', 'travel'],
  },
  {
    id: '4',
    title: 'Ultra HD 4K Monitor 32"',
    description: 'Professional-grade 4K monitor with HDR support, 99% sRGB color accuracy, and USB-C connectivity. Ideal for content creators and gamers.',
    price: 549.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 445,
    stock: 34,
    brand: 'ViewPro',
    tags: ['monitor', '4k', 'hdr', 'professional'],
  },
  {
    id: '5',
    title: 'Ergonomic Office Chair',
    description: 'Premium ergonomic chair with adjustable lumbar support, breathable mesh back, and 4D armrests. Supports healthy posture for long work sessions.',
    price: 449.99,
    discountPrice: 379.99,
    category: 'Furniture',
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&q=80',
      'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 723,
    stock: 12,
    brand: 'ErgoComfort',
    tags: ['chair', 'ergonomic', 'office', 'furniture'],
  },
  {
    id: '6',
    title: 'Mechanical Gaming Keyboard RGB',
    description: 'Premium mechanical keyboard with customizable RGB lighting, hot-swappable switches, and programmable macro keys. Built for performance.',
    price: 159.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 1056,
    stock: 89,
    brand: 'KeyMaster',
    tags: ['keyboard', 'mechanical', 'gaming', 'rgb'],
  },
  {
    id: '7',
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 360° sound, 24-hour battery life, and deep bass. Perfect for outdoor adventures and parties.',
    price: 129.99,
    discountPrice: 99.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
      'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=800&q=80',
    ],
    rating: 4.5,
    reviewCount: 834,
    stock: 156,
    brand: 'SoundWave',
    tags: ['speaker', 'bluetooth', 'waterproof', 'portable'],
  },
  {
    id: '8',
    title: 'Premium Coffee Maker',
    description: 'Programmable drip coffee maker with thermal carafe, brew strength control, and auto-shutoff. Makes 12 cups of perfect coffee every time.',
    price: 89.99,
    category: 'Home & Kitchen',
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&q=80',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    ],
    rating: 4.6,
    reviewCount: 1289,
    stock: 78,
    brand: 'BrewMaster',
    tags: ['coffee', 'kitchen', 'appliance', 'programmable'],
  },
  {
    id: '9',
    title: 'Yoga Mat Premium Non-Slip',
    description: 'Extra-thick eco-friendly yoga mat with superior grip and cushioning. Includes carrying strap. Perfect for yoga, pilates, and meditation.',
    price: 49.99,
    discountPrice: 39.99,
    category: 'Sports & Fitness',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 456,
    stock: 234,
    brand: 'ZenFit',
    tags: ['yoga', 'fitness', 'mat', 'eco-friendly'],
  },
  {
    id: '10',
    title: 'Digital Air Fryer XL',
    description: 'Large capacity air fryer with 8 preset cooking programs, digital touchscreen, and non-stick basket. Cook healthier meals with 80% less oil.',
    price: 119.99,
    category: 'Home & Kitchen',
    images: [
      'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 967,
    stock: 45,
    brand: 'HealthyCook',
    tags: ['air-fryer', 'kitchen', 'appliance', 'healthy'],
  },
  {
    id: '11',
    title: 'Professional Camera Backpack',
    description: 'Weather-resistant camera bag with customizable dividers, laptop compartment, and quick-access side pocket. Fits 2 DSLR cameras and 5-6 lenses.',
    price: 179.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800&q=80',
    ],
    rating: 4.9,
    reviewCount: 334,
    stock: 56,
    brand: 'PhotoGear',
    tags: ['camera', 'backpack', 'photography', 'professional'],
  },
  {
    id: '12',
    title: 'LED Desk Lamp Smart',
    description: 'Adjustable LED desk lamp with touch controls, USB charging port, and 5 color temperature modes. Eye-friendly lighting for work and study.',
    price: 59.99,
    discountPrice: 49.99,
    category: 'Home & Office',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80',
    ],
    rating: 4.6,
    reviewCount: 678,
    stock: 123,
    brand: 'BrightLight',
    tags: ['lamp', 'led', 'desk', 'smart'],
  },
  {
    id: '13',
    title: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with 16000 DPI sensor, customizable RGB, and 70-hour battery life. Ultra-responsive for competitive gaming.',
    price: 79.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80',
    ],
    rating: 4.7,
    reviewCount: 892,
    stock: 167,
    brand: 'GamePro',
    tags: ['mouse', 'gaming', 'wireless', 'rgb'],
  },
  {
    id: '14',
    title: 'Stainless Steel Water Bottle',
    description: 'Insulated stainless steel bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof design. 32oz capacity.',
    price: 34.99,
    discountPrice: 27.99,
    category: 'Sports & Fitness',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&q=80',
    ],
    rating: 4.8,
    reviewCount: 1567,
    stock: 289,
    brand: 'HydroFlow',
    tags: ['water-bottle', 'insulated', 'fitness', 'eco-friendly'],
  },
  {
    id: '15',
    title: 'Smart Home Security Camera',
    description: '1080p HD security camera with night vision, two-way audio, motion detection, and cloud storage. Monitor your home from anywhere.',
    price: 69.99,
    category: 'Smart Home',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80',
      'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80',
    ],
    rating: 4.5,
    reviewCount: 723,
    stock: 94,
    brand: 'SecureHome',
    tags: ['security', 'camera', 'smart-home', 'surveillance'],
  },
];

/**
 * Mock review data
 */
export const reviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely amazing headphones! The noise cancellation is top-notch and the sound quality is incredible. Best purchase this year!',
    date: '2026-01-15',
    helpful: 24,
  },
  {
    id: 'r2',
    productId: '1',
    userName: 'Mike Chen',
    rating: 4,
    comment: 'Great headphones overall. Battery life is excellent. Only minor complaint is they can feel a bit heavy during long sessions.',
    date: '2026-01-10',
    helpful: 12,
  },
  {
    id: 'r3',
    productId: '2',
    userName: 'Emily Rodriguez',
    rating: 5,
    comment: 'This watch has completely changed my fitness routine. The tracking is accurate and the battery lasts for days!',
    date: '2026-01-20',
    helpful: 18,
  },
  {
    id: 'r4',
    productId: '3',
    userName: 'David Park',
    rating: 5,
    comment: 'Beautiful craftsmanship! The leather quality is exceptional and it fits my 15" laptop perfectly.',
    date: '2026-01-18',
    helpful: 9,
  },
];

/**
 * Get all available categories from products
 */
export function getCategories(): string[] {
  return Array.from(new Set(products.map(p => p.category))).sort();
}

/**
 * Get reviews for a specific product
 */
export function getProductReviews(productId: string): Review[] {
  return reviews.filter(r => r.productId === productId);
}

/**
 * Get related products (same category, excluding current product)
 */
export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}
