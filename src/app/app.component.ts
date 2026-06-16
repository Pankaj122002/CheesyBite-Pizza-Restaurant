import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { FloatingButtonsComponent } from './shared/floating-buttons/floating-buttons.component';
import { VideoBackgroundComponent } from './shared/video-background/video-background.component';

import { SeoService } from './services/seo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FloatingButtonsComponent, VideoBackgroundComponent],
  template: `
    <app-video-background />
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    @defer (on viewport) {
      <app-footer />
    } @placeholder {
      <div style="height: 1px;"></div>
    }
    @defer (on idle) {
      <app-floating-buttons />
    } @placeholder {
      <div></div>
    }
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = "CheesyBite";

  constructor(private seoService: SeoService) {
    this.seoService.init();
  }
}
