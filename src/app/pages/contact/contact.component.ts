import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroBannerComponent } from '../../shared/hero-banner/hero-banner.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, HeroBannerComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  currentDay = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
}
