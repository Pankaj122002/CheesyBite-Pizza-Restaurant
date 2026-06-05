import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { FoodCardComponent } from '../../shared/food-card/food-card.component';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/menu-item.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, HeroBannerComponent, FoodCardComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuService = inject(MenuService);
  cartService = inject(CartService);
  
  menuItems: MenuItem[] = [];
  cartCount$: Observable<number> = this.cartService.cartCount$;
  cartTotal$: Observable<number> = this.cartService.cartTotal$;

  ngOnInit() {
    this.menuItems = this.menuService.getAllItems();
  }
}
