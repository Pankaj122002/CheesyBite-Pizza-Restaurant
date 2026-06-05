import { CartItem } from './cart-item.model';

export interface Order {
  orderId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  orderType: 'Pickup' | 'Dine In';
  items: CartItem[];
  total: number;
  specialInstructions?: string;
}
