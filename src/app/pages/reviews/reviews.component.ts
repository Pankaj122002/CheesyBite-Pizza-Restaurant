import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';
import { ReviewService, Review } from '../../services/review.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent, ReviewCardComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviewService = inject(ReviewService);
  reviews: Review[] = [];

  ngOnInit() {
    this.reviews = this.reviewService.getAllReviews();
  }
}
