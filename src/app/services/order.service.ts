import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

// This is temporary frontend-only order numbering. Counter resets on localStorage clear.

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderCounter: number;

  constructor() {
    const stored = localStorage.getItem('rom_order_counter');
    this.orderCounter = stored ? parseInt(stored, 10) : 0;
  }

  /**
   * Generate a unique order ID in the format ROM-YYYYMMDD-HHmmss
   */
  generateOrderId(): string {
    this.orderCounter++;
    localStorage.setItem('rom_order_counter', this.orderCounter.toString());

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `ROM-${year}${month}${day}-${hours}${minutes}${seconds}`;
  }

  /**
   * Format a date as '04-Jun-2026'
   */
  formatDate(date: Date): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  /**
   * Format a time as '07:35 PM'
   */
  formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12

    return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  }

  /**
   * Generate a fully formatted WhatsApp message for the order with emojis.
   */
  generateWhatsAppMessage(order: Order): string {
    let message = '';

    message += `*🔥 New Order — Rom's Pizza*\n\n`;

    message += `*📋 ORDER DETAILS*\n`;
    message += `• *Order ID:* ${order.orderId}\n`;
    message += `• *Date:* ${order.date}\n`;
    message += `• *Time:* ${order.time}\n\n`;

    message += `*👤 CUSTOMER DETAILS*\n`;
    message += `• *Name:* ${order.customerName}\n`;
    message += `• *Phone:* ${order.customerPhone}\n`;
    message += `• *Order Type:* ${order.orderType}\n\n`;

    message += `*🛒 ITEMS ORDERED*\n`;
    order.items.forEach(item => {
      const itemTotal = item.menuItem.price * item.quantity;
      message += `• ${item.menuItem.name} x ${item.quantity} = *Rs. ${itemTotal}*\n`;
    });
    message += `\n`;

    message += `💰 *Total Amount:* *Rs. ${order.total}*\n\n`;

    if (order.specialInstructions && order.specialInstructions.trim()) {
      message += `📝 *Special Instructions:* _${order.specialInstructions}_\n\n`;
    }

    message += `📌 *Order Status:* *PENDING PAYMENT*\n\n`;
    message += `⚡ *Owner Action Required:*\n`;
    message += `1️⃣ Reply with Payment QR Code.\n`;
    message += `2️⃣ Wait for customer to send payment screenshot.\n`;
    message += `3️⃣ Once verified, reply with "Order Confirmed" and ready time (e.g., Ready in X mins).\n`;

    return message;
  }

  /**
   * Open WhatsApp with the pre-filled order message.
   */
  openWhatsApp(message: string): void {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/918954040631?text=${encodedMessage}`, '_blank');
  }
}
