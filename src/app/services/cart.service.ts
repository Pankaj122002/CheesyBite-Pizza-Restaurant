import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<CartItem[]>([]);

  /** Observable stream of cart items */
  cartItems$: Observable<CartItem[]> = this.cartItems.asObservable();

  /** Observable stream of total item count (sum of all quantities) */
  cartCount$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  /** Observable stream of cart total price */
  cartTotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0))
  );

  /**
   * Add an item to the cart. If the item already exists, increment its quantity.
   */
  addItem(menuItem: MenuItem): void {
    const currentItems = this.cartItems.getValue();
    const existingIndex = currentItems.findIndex(item => item.menuItem.id === menuItem.id);

    if (existingIndex > -1) {
      const updatedItems = [...currentItems];
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1
      };
      this.cartItems.next(updatedItems);
    } else {
      this.cartItems.next([...currentItems, { menuItem, quantity: 1 }]);
    }
  }

  /**
   * Remove an item from the cart entirely.
   */
  removeItem(itemId: number): void {
    const currentItems = this.cartItems.getValue();
    this.cartItems.next(currentItems.filter(item => item.menuItem.id !== itemId));
  }

  /**
   * Update the quantity of a specific item. Removes the item if quantity <= 0.
   */
  updateQuantity(itemId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }

    const currentItems = this.cartItems.getValue();
    const updatedItems = currentItems.map(item =>
      item.menuItem.id === itemId ? { ...item, quantity } : item
    );
    this.cartItems.next(updatedItems);
  }

  /**
   * Increment the quantity of a specific item by 1.
   */
  incrementQuantity(itemId: number): void {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(i => i.menuItem.id === itemId);
    if (item) {
      this.updateQuantity(itemId, item.quantity + 1);
    }
  }

  /**
   * Decrement the quantity of a specific item by 1. Removes if quantity reaches 0.
   */
  decrementQuantity(itemId: number): void {
    const currentItems = this.cartItems.getValue();
    const item = currentItems.find(i => i.menuItem.id === itemId);
    if (item) {
      this.updateQuantity(itemId, item.quantity - 1);
    }
  }

  /**
   * Get the current cart total price (synchronous snapshot).
   */
  getTotal(): number {
    return this.cartItems.getValue().reduce(
      (sum, item) => sum + (item.menuItem.price * item.quantity), 0
    );
  }

  /**
   * Get the current total item count (synchronous snapshot).
   */
  getItemCount(): number {
    return this.cartItems.getValue().reduce(
      (sum, item) => sum + item.quantity, 0
    );
  }

  /**
   * Get a snapshot of current cart items.
   */
  getItems(): CartItem[] {
    return [...this.cartItems.getValue()];
  }

  /**
   * Clear all items from the cart.
   */
  clearCart(): void {
    this.cartItems.next([]);
  }
}
