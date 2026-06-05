import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Rom\'s Pizza — Premium Artisanal Pizza',
    data: { description: 'Best pizza in Muradnagar. Premium artisanal pizza and sides at affordable prices. Order via WhatsApp.' }
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent),
    title: 'Menu — Rom\'s Pizza',
    data: { description: 'Explore our delicious menu featuring premium artisanal pizza, pasta, garlic bread, and satisfying combo meals.' }
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
    title: 'Your Cart — Rom\'s Pizza',
    data: { description: 'Review your selected authentic pizza and sides and proceed to checkout securely.' }
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Gallery — Rom\'s Pizza',
    data: { description: 'Browse our gallery to see our mouth-watering pizza, spotless kitchen, and happy customers at Rom\'s Pizza.' }
  },
  {
    path: 'reviews',
    loadComponent: () => import('./pages/reviews/reviews.component').then(m => m.ReviewsComponent),
    title: 'Reviews — Rom\'s Pizza',
    data: { description: 'Read what our happy customers are saying about Muradnagar\'s favorite pizza.' }
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us — Rom\'s Pizza',
    data: { description: 'Learn about our journey of serving premium artisanal pizza to over 50,000 happy customers in Muradnagar.' }
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact — Rom\'s Pizza',
    data: { description: 'Get in touch with Rom\'s Pizza. Call us, WhatsApp us, or visit our restaurant on GT Road, Muradnagar.' }
  },
  {
    path: 'order-confirmation',
    loadComponent: () => import('./pages/order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent),
    title: 'Order Confirmed — Rom\'s Pizza',
    data: { description: 'Your order has been confirmed successfully.' }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
