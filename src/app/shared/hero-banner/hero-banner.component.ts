import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.css']
})
export class HeroBannerComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() backgroundImage: string = '';
  @Input() showCTA: boolean = false;
  @Input() fullHeight: boolean = false;
}
