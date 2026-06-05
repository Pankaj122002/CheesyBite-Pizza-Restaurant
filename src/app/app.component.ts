import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FloatingButtonsComponent } from './shared/floating-buttons/floating-buttons.component';

import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FloatingButtonsComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-floating-buttons />
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = "Rom's Pizza";

  constructor(private seoService: SeoService) {
    this.seoService.init();
  }
}
