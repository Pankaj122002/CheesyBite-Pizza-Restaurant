import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './floating-buttons.component.html',
  styleUrls: ['./floating-buttons.component.css']
})
export class FloatingButtonsComponent implements OnInit, OnDestroy {
  showButtons = true;
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkRoute(this.router.url);
    this.routerSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkRoute(event.urlAfterRedirects || event.url);
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkRoute(url: string) {
    // Hide buttons if current page is the menu page (exactly '/menu' or containing '/menu')
    this.showButtons = !url.includes('/menu');
  }
}
