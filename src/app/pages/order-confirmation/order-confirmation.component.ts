import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  orderService = inject(OrderService);
  cartService = inject(CartService);
  router = inject(Router);

  order!: Order;

  ngOnInit() {
    const orderData = sessionStorage.getItem('current_order');
    if (!orderData) {
      this.router.navigate(['/cart']);
      return;
    }
    this.order = JSON.parse(orderData);
  }

  sendToWhatsApp() {
    const message = this.orderService.generateWhatsAppMessage(this.order);
    this.orderService.openWhatsApp(message);
    this.cartService.clearCart();
    sessionStorage.removeItem('current_order');
    this.router.navigate(['/']);
  }
}
