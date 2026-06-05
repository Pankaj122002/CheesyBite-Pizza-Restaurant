import { Injectable } from '@angular/core';

export interface Review {
  id: number;
  name: string;
  rating: number;
  text: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private reviews: Review[] = [
    {
      id: 1,
      name: 'Rahul Sharma',
      rating: 5,
      text: 'Best pizza in Muradnagar! The wood-fired crust is incredible and the toppings are very generous. Farmhouse pizza at just ₹249 is unbeatable value.',
      date: '02-Jun-2026'
    },
    {
      id: 2,
      name: 'Priya Gupta',
      rating: 5,
      text: 'Rom\'s Pizza is our family\'s go-to spot. The Margherita has such authentic taste, and the garlic bread is absolutely delicious. Highly recommended!',
      date: '25-May-2026'
    },
    {
      id: 3,
      name: 'Amit Verma',
      rating: 4,
      text: 'I travel from Ghaziabad just for their pizza. The cheese is perfect and crust is baked to perfection. Garlic bread for ₹99 is a steal!',
      date: '22-May-2026'
    },
    {
      id: 4,
      name: 'Sneha Agarwal',
      rating: 5,
      text: 'The BBQ Chicken Pizza here is out of this world! Perfectly smoky and cheesy. Combined with their pasta, it makes the perfect meal. Love this place!',
      date: '18-May-2026'
    },
    {
      id: 5,
      name: 'Vikash Kumar',
      rating: 4,
      text: 'Muradnagar\'s hidden gem! Every time I visit GT Road, I make sure to stop at Rom\'s Pizza. The aroma itself is irresistible.',
      date: '15-May-2026'
    },
    {
      id: 6,
      name: 'Anjali Singh',
      rating: 5,
      text: 'So tasty! The Farmhouse pizza has layers of flavor — fresh veggies, herbs, and perfectly melted cheese. My kids absolutely love it.',
      date: '10-May-2026'
    },
    {
      id: 7,
      name: 'Rohit Yadav',
      rating: 4,
      text: 'Affordable and delicious — that\'s Rom\'s Pizza in two words. The pepperoni pizza with garlic bread combo is my favorite. Great service too!',
      date: '05-May-2026'
    },
    {
      id: 8,
      name: 'Meena Devi',
      rating: 5,
      text: 'I\'ve been coming here since they opened. The consistency in taste is amazing. Best pizza on GT Road, Muradnagar. Prices are very pocket-friendly!',
      date: '01-May-2026'
    }
  ];

  /**
   * Get all reviews.
   */
  getAllReviews(): Review[] {
    return [...this.reviews];
  }

  /**
   * Get the top 3 featured reviews.
   */
  getFeaturedReviews(): Review[] {
    return this.reviews.slice(0, 3);
  }
}
