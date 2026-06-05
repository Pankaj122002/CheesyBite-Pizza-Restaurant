import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { CartItem } from '../../models/cart-item.model';
import { Order } from '../../models/order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  router = inject(Router);
  fb = inject(FormBuilder);

  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  cartTotal$: Observable<number> = this.cartService.cartTotal$;
  cartCount$: Observable<number> = this.cartService.cartCount$;

  customerForm!: FormGroup;

  ngOnInit() {
    this.customerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
      orderType: ['Pickup', Validators.required],
      specialInstructions: ['']
    });
  }

  increment(itemId: number) {
    this.cartService.incrementQuantity(itemId);
  }

  decrement(itemId: number) {
    this.cartService.decrementQuantity(itemId);
  }

  remove(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  placeOrder() {
    if (this.customerForm.invalid || this.cartService.getItemCount() === 0) {
      this.customerForm.markAllAsTouched();
      return;
    }

    const formValues = this.customerForm.value;
    const now = new Date();
    const order: Order = {
      orderId: this.orderService.generateOrderId(),
      date: this.orderService.formatDate(now),
      time: this.orderService.formatTime(now),
      customerName: formValues.fullName,
      customerPhone: formValues.mobileNumber,
      orderType: formValues.orderType,
      items: this.cartService.getItems(),
      total: this.cartService.getTotal(),
      specialInstructions: formValues.specialInstructions
    };

    sessionStorage.setItem('current_order', JSON.stringify(order));
    this.router.navigate(['/order-confirmation']);
  }
}
