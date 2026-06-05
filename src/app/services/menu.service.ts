import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic delight with 100% real mozzarella cheese and our signature pizza sauce.',
      price: 199,
      image: 'assets/images/margherita-pizza.webp',
      category: 'pizza',
      isVeg: true
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      description: 'Loaded with double pepperonies and extra cheese on our fresh dough.',
      price: 299,
      image: 'assets/images/pepperoni-pizza.webp',
      category: 'pizza',
      isVeg: false
    },
    {
      id: 3,
      name: 'Farmhouse Veggie Pizza',
      description: 'Topped with crisp capsicum, succulent mushrooms, fresh tomatoes, and crunchy onions.',
      price: 249,
      image: 'assets/images/farmhouse-pizza.webp',
      category: 'pizza',
      isVeg: true
    },
    {
      id: 4,
      name: 'BBQ Chicken Pizza',
      description: 'Smoky BBQ sauce, grilled chicken pieces, red onions, and mozzarella cheese.',
      price: 349,
      image: 'assets/images/bbq-chicken-pizza.webp',
      category: 'pizza',
      isVeg: false
    },
    {
      id: 5,
      name: 'Garlic Bread',
      description: 'Freshly baked garlic bread, topped with garlic butter and herbs.',
      price: 99,
      image: 'assets/images/garlic-bread.webp',
      category: 'sides',
      isVeg: true
    },
    {
      id: 6,
      name: 'Pasta Alfredo',
      description: 'Penne pasta tossed in rich and creamy Alfredo sauce with parmesan cheese.',
      price: 179,
      image: 'assets/images/pasta-alfredo.webp',
      category: 'pasta',
      isVeg: true
    }
  ];

  getAllItems(): MenuItem[] {
    return [...this.menuItems];
  }

  getItemById(id: number): MenuItem | undefined {
    return this.menuItems.find(item => item.id === id);
  }

  getPopularItems(): MenuItem[] {
    return [...this.menuItems];
  }
}
