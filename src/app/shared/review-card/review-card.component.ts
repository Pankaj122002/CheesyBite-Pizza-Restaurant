import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../services/review.service';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent implements OnInit {
  @Input() review!: Review;
  
  initial: string = '';
  bgColor: string = '';
  stars: number[] = [];
  emptyStars: number[] = [];

  ngOnInit() {
    if (this.review) {
      this.initial = this.review.name.charAt(0).toUpperCase();
      this.bgColor = this.getColorForName(this.review.name);
      this.stars = Array(this.review.rating).fill(0);
      this.emptyStars = Array(5 - this.review.rating).fill(0);
    }
  }

  private getColorForName(name: string): string {
    const colors = ['#C8502D', '#D4A843', '#2E7D32', '#1A1A2E', '#6B6B6B'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  }
}
