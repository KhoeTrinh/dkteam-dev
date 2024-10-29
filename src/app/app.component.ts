import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/ts/navbar.component';
import { FooterComponent } from './components/ts/footer.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { RoleService } from './services/role.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isSpecialRoute: boolean = false;
  isUser: boolean = true;
  role: { isDev: boolean; isAdmin: boolean } = { isDev: true, isAdmin: false };
  userData: any = {
    id: 1,
    username: 'khoa',
    userImage: 'assets/svg/user-svgrepo-com.svg',
  };

  constructor(private router: Router, private roleService: RoleService) {
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
    this.roleService.setRole(this.role);
  }
}
