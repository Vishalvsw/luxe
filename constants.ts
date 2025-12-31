
import { Product, Order, SaleData } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'PRD-001',
    name: 'Midnight Silk Gown',
    category: 'Evening Wear',
    price: 34999,
    stock: 12,
    sizeStock: { 'S': 2, 'M': 5, 'L': 0, 'XL': 5 },
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109132304-351deaed13ad?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A luxurious midnight blue silk gown with a tailored fit and hand-stitched hem, perfect for Indian wedding receptions.',
    status: 'Published'
  },
  {
    id: 'PRD-002',
    name: 'Oatmeal Cashmere Knit',
    category: 'Knitwear',
    price: 18500,
    stock: 45,
    sizeStock: { 'S': 10, 'M': 15, 'L': 20, 'XL': 0 },
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583911300261-93998543fd52?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Ultra-soft Italian cashmere sweater in a versatile oatmeal shade, essential for winter in Delhi.',
    status: 'Published'
  },
  {
    id: 'PRD-003',
    name: 'Classic Khaki Trench',
    category: 'Outerwear',
    price: 28999,
    stock: 15,
    sizeStock: { 'S': 3, 'M': 5, 'L': 5, 'XL': 2 },
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'A timeless double-breasted trench coat in premium cotton gabardine, featuring a belted waist and storm flaps.',
    status: 'Published'
  },
  {
    id: 'PRD-004',
    name: 'Structured Wool Blazer',
    category: 'Outerwear',
    price: 22499,
    stock: 8,
    sizeStock: { 'S': 2, 'M': 2, 'L': 2, 'XL': 2 },
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Sharp wool blazer with gold-tone buttons and peak lapels.',
    status: 'Published'
  },
  {
    id: 'PRD-005',
    name: 'Minimalist Linen Shirt',
    category: 'Essentials',
    price: 4999,
    stock: 20,
    sizeStock: { 'S': 5, 'M': 5, 'L': 5, 'XL': 5 },
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'Breathable linen shirt for refined casual dressing in humid climates.',
    status: 'Published'
  },
  {
    id: 'PRD-006',
    name: 'Pleated Midi Skirt',
    category: 'Evening Wear',
    price: 7999,
    stock: 15,
    sizeStock: { 'S': 5, 'M': 0, 'L': 5, 'XL': 5 },
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509556756506-30656d77ffb9?q=80&w=1000&auto=format&fit=crop'
    ],
    description: 'High-waist pleated midi skirt with a subtle sheen.',
    status: 'Published'
  }
];

export const INITIAL_ORDERS: Order[] = [
  { id: 'ORD-9921', customerName: 'Rohan Sharma', date: '2023-10-24', amount: 34999, status: 'Delivered', items: 1 },
  { id: 'ORD-9922', customerName: 'Ananya Iyer', date: '2023-10-25', amount: 8300, status: 'Shipped', items: 3 },
  { id: 'ORD-9923', customerName: 'Vikram Malhotra', date: '2023-10-25', amount: 12000, status: 'Pending', items: 4 },
  { id: 'ORD-9924', customerName: 'Ishani Roy', date: '2023-10-26', amount: 18500, status: 'Delivered', items: 1 },
];

export const SALES_CHART_DATA: SaleData[] = [
  { name: 'Mon', revenue: 45000, orders: 12 },
  { name: 'Tue', revenue: 52000, orders: 15 },
  { name: 'Wed', revenue: 48000, orders: 11 },
  { name: 'Thu', revenue: 61000, orders: 18 },
  { name: 'Fri', revenue: 75000, orders: 22 },
  { name: 'Sat', revenue: 92000, orders: 28 },
  { name: 'Sun', revenue: 84000, orders: 25 },
];
