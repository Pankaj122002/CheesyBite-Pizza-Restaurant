import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {}
