
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  images?: string[];
  description: string;
  status: 'Published' | 'Draft' | 'Out of Stock';
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  amount: number;
  status: 'Delivered' | 'Pending' | 'Shipped' | 'Cancelled';
  items: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  activeCustomers: number;
  avgOrderValue: number;
}

export interface SaleData {
  name: string;
  revenue: number;
  orders: number;
}
