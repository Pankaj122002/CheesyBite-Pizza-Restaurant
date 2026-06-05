import { Component, OnInit, inject, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';
import { FoodCardComponent } from '../../shared/food-card/food-card.component';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';
import { MenuService } from '../../services/menu.service';
import { ReviewService, Review } from '../../services/review.service';
import { MenuItem } from '../../models/menu-item.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, HeroBannerComponent, FoodCardComponent, ReviewCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  menuService = inject(MenuService);
  reviewService = inject(ReviewService);
  
  popularItems: MenuItem[] = [];
  featuredReviews: Review[] = [];

  @ViewChildren('statCounter') statCounters!: QueryList<ElementRef>;

  ngOnInit() {
    this.popularItems = this.menuService.getPopularItems();
    this.featuredReviews = this.reviewService.getFeaturedReviews();
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.statCounters.forEach(counter => {
      observer.observe(counter.nativeElement);
    });
  }
}
