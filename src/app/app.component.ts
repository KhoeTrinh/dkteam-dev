import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from './components/ts/navbar.component';
import { FooterComponent } from './components/ts/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, interval, Subscription } from 'rxjs';
import { ApiService } from './services/api.service';
import { IsLoadingService } from './services/isLoadingService.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  isSpecialRoute: boolean = false;
  isLoading: boolean;
  private tokenCheckSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private isLoadingService: IsLoadingService
  ) {
    this.isLoading = this.isLoadingService.getIsLoading();
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
    this.isLoadingService.isLoading$.subscribe(async (isLoading) => {
      this.isLoading = isLoading;
    });
  }
  ngOnDestroy(): void {
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
  }
}
