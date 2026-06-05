import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';

interface GalleryImage {
  src: string;
  category: string;
  caption: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  images: GalleryImage[] = [
    { src: 'assets/images/hero-pizza.webp', category: 'food', caption: 'Signature Wood-Fired Pizza' },
    { src: 'assets/images/margherita-pizza.webp', category: 'food', caption: 'Margherita Pizza' },
    { src: 'assets/images/pepperoni-pizza.webp', category: 'food', caption: 'Pepperoni Pizza' },
    { src: 'assets/images/garlic-bread.webp', category: 'food', caption: 'Garlic Bread' },
    { src: 'assets/images/gallery-food-spread.webp', category: 'food', caption: 'Our Food Spread' },
    { src: 'assets/images/gallery-pizza-close.webp', category: 'food', caption: 'Pizza Close-Up' },
    { src: 'assets/images/gallery-restaurant.webp', category: 'restaurant', caption: 'Our Restaurant' },
    { src: 'assets/images/gallery-kitchen.webp', category: 'kitchen', caption: 'Our Hygienic Kitchen' },
    { src: 'assets/images/gallery-customers.webp', category: 'customers', caption: 'Happy Customers' },
    { src: 'assets/images/about-restaurant.webp', category: 'restaurant', caption: 'Restaurant Exterior' }
  ];

  selectedCategory: string = 'all';
  selectedImage: GalleryImage | null = null;
  categories = ['all', 'food', 'restaurant', 'kitchen', 'customers'];

  get filteredImages() {
    if (this.selectedCategory === 'all') return this.images;
    return this.images.filter(img => img.category === this.selectedCategory);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  openLightbox(image: GalleryImage) {
    this.selectedImage = image;
    // Bootstrap modal is triggered via data attributes in HTML
  }
}
