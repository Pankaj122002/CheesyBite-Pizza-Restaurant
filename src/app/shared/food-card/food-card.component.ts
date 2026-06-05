import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/menu-item.model';
import { CartService } from '../../services/cart.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-food-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food-card.component.html',
  styleUrls: ['./food-card.component.css']
})
export class FoodCardComponent implements OnInit {
  @Input() menuItem!: MenuItem;
  
  cartService = inject(CartService);
  quantity$: Observable<number> | undefined;

  ngOnInit() {
    this.quantity$ = this.cartService.cartItems$.pipe(
      map(items => {
        const item = items.find(i => i.menuItem.id === this.menuItem.id);
        return item ? item.quantity : 0;
      })
    );
  }

  addToCart() {
    this.cartService.addItem(this.menuItem);
  }

  increment() {
    this.cartService.incrementQuantity(this.menuItem.id);
  }

  decrement() {
    this.cartService.decrementQuantity(this.menuItem.id);
  }
}
