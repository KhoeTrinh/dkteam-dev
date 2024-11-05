import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from './components/ts/navbar.component';
import { FooterComponent } from './components/ts/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, interval, Subscription } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  isSpecialRoute: boolean = false;
  isUser: boolean = false;
  role: { isDev: boolean; isAdmin: boolean } = { isDev: false, isAdmin: false };
  userData: any = {};
  isLoading: boolean = true;
  private tokenCheckSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService
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
      this.checkTokens();
    });
    this.checkTokens();
  }
  ngOnDestroy(): void {
    if (this.tokenCheckSubscription) {
      this.tokenCheckSubscription.unsubscribe();
    }
  }

  async checkTokens() {
    const res = await this.apiService.checkToken();
    if (res.status === true) {
      this.isUser = true;
      this.userData = res.message;
      this.role = { isDev: res.message.isDev, isAdmin: res.message.isAdmin };
    } else {
      this.isUser = false;
      this.role = { isDev: false, isAdmin: false };
      this.userData = {};
    }
    this.isLoading = false;
  }
}
