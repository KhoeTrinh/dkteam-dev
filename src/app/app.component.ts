import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from './components/ts/navbar.component';
import { FooterComponent } from './components/ts/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import {
  combineLatest,
  filter,
  interval,
  Observable,
  Subscription,
} from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { ApiService } from './services/api.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  isSpecialRoute: boolean = false;
  private tokenCheckSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const specialRoutes = ['/products', '/dashboard/products'];
        this.isSpecialRoute = specialRoutes.includes(event.urlAfterRedirects);
      });
  }

  ngOnInit() {
    this.tokenCheckSubscription = interval(60000).subscribe(() => {
      this.apiService.checkToken();
    });
    this.apiService.checkToken();
  }
  ngOnDestroy(): void {
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
  }
}
