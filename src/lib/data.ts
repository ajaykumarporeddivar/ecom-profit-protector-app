// Import types from lib/types.ts
import {
  User,
  Store,
  Product,
  Cart,
  Coupon,
  Order,
  Revenue,
  Metric,
} from '../types';

// DEMO_USER (Sarah Chen — e-commerce store owner)
const DEMO_USER: User = {
  id: '1',
  email: 'sarah.chen@example.com',
  password: 'password123',
  role: 'user',
};

// MOCK_USERS (10 e-commerce store owners)
const MOCK_USERS: User[] = Array(10)
  .fill(null)
  .map(() => ({
    id: uuidv4(),
    email: `${Math.random().toString(36).slice(2)}@example.com`,
    password: 'password123',
    role: 'user',
  }));

// MOCK_STORES (15 e-commerce stores)
const MOCK_STORES: Store[] = Array(15)
  .fill(null)
  .map((_, i) => ({
    id: uuidv4(),
    owner: MOCK_USERS[i % 10],
    name: `Store ${Math.floor(Math.random() * 100)}`,
    url: `https://www.example.com/store-${Math.floor(Math.random() * 100)}`,
  }));

// MOCK_PRODUCTS (50 e-commerce products)
const MOCK_PRODUCTS: Product[] = Array(50)
  .fill(null)
  .map((_, i) => ({
    id: uuidv4(),
    name: `Product ${Math.floor(Math.random() * 100)}`,
    description: `Description of Product ${Math.floor(Math.random() * 100)}`,
    price: Math.floor(Math.random() * 100.99),
    image: `https://picsum.photos/200/3${i}`,
  }));

// MOCK_CARTS (20 carts)
const MOCK_CARTS: Cart[] = Array(20)
  .fill(null)
  .map((_, i) => ({
    id: uuidv4(),
    user: MOCK_USERS[i % 10],
    store: MOCK_STORES[i % 15],
    products: MOCK_PRODUCTS
      .filter((_, j) => i > 10 && j < 30)
      .map((product) => ({ ...product, quantity: Math.floor(Math.random() * 5) })),
  }));

// MOCK_COUPONS (10 coupons)
const MOCK_COUPONS: Coupon[] = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: uuidv4(),
    code: `COUPON-${Math.floor(Math.random() * 100)}`,
    store: MOCK_STORES[i % 15],
    discount: Math.floor(Math.random() * 20) - Math.floor(Math.random() * 20),
  }));

// MOCK_ORDERS (20 orders)
const MOCK_ORDERS: Order[] = Array(20)
  .fill(null)
  .map((_, i) => ({
    id: uuidv4(),
    user: MOCK_USERS[i % 10],
    store: MOCK_STORES[i % 15],
    products: MOCK_CARTS[i % 20].products,
    subtotal: MOCK_CARTS[i % 20].products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    ),
    tax: Math.floor(Math.random() * 10),
    total: MOCK_CARTS[i % 20].products.reduce(
      (acc, product) => acc + (product.price + product.tax) * product.quantity,
      0
    ),
    status: 'paid',
    date: new Date() - (new Date((Math.random() + Math.random() + Math.random()) * 30 * 24 * 3600 * 1000))
  }));

// MOCK_REVENUE (4 weeks of revenue data)
const MOCK_REVENUE: Revenue[] = Array(28)
  .fill(null)
  .map((_, i) => ({
    id: uuidv4(),
    week: Math.floor(i / 7 + 1),
    total: Math.floor(Math.random() * 10000),
    year: '2024',
  }));

// MOCK_METRICS (4 KPI metrics with realistic numbers and trend indicators)
const MOCK_METRICS: Metric[] = [
  { id: '1', name: 'Total Revenue', value: '$284,520', trend: 'up' },
  { id: '2', name: 'Revenue Growth', value: '18.4%', trend: 'down' },
  { id: '3', name: 'Active Users', value: '1847', trend: 'up' },
  { id: '4', name: 'User Growth', value: '12.1%', trend: 'down' },
];

// EXPORTED DATA
export const STATS = {
  totalRevenue: MOCK_METRICS[0].value,
  revenueGrowth: MOCK_METRICS[1].value,
  activeUsers: MOCK_METRICS[2].value,
  userGrowth: MOCK_METRICS[3].value,
};

export const CHART_DATA = {
  weekly: MOCK_REVENUE.map((item) => item.total),
  labels: MOCK_REVENUE.map((item) => `Week ${item.week}`),
  revenue: MOCK_REVENUE.map((item) => item.total),
};

export const SPARKLINE_DATA = {
  revenue: [
    MOCK_METRICS[0].value == null ? 0 : parseFloat(MOCK_METRICS[0].value.replace('$', '')),
    MOCK_METRICS[1].value == null ? 0 : parseFloat(MOCK_METRICS[1].value.replace("%", "")) * 100,
    MOCK_METRICS[2].value == null ? 0 : parseFloat(MOCK_METRICS[2].value),
    MOCK_METRICS[3].value == null ? 0 : parseFloat(MOCK_METRICS[3].value.replace("%", "")) * 100,
  ],
  users: [
    MOCK_METRICS[2].value == null ? 0 : parseFloat(MOCK_METRICS[2].value),
    MOCK_METRICS[3].value == null ? 0 : parseFloat(MOCK_METRICS[3].value.replace("%", "")) * 100,
  ],
};

export const RECENT_ACTIVITY = [
  { id: '1', action: 'Created new contract', user: 'Sarah Chen', avatar: 'SC', time: '2 minutes ago', type: 'create' },
  // ... (add 11 more items)
];

export function getById<T extends { id: string }>(arr: T[], id: string): T | undefined {
  return arr.find((x) => x.id === id);
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(n);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}