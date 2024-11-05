import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WidthCheckService } from '../../services/width-check.service';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: '../html/navbar.component.html',
  styleUrl: '../css/navbar.component.css',
})
export class NavbarComponent implements OnInit, DoCheck {
  imgSrc: string = 'assets/svg/logo-no-background.svg';
  imgSrc2: string = 'assets/svg/menu-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/logout-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/cross-svgrepo-com.svg';

  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  aClass: string =
    'text-white text-sm px-4 py-2 h-full w-full flex justify-center items-center font-bold';
  aClass2: string =
    'text-white text-lg px-4 py-2 h-full w-full font-bold underlinee py-3';

  innerWidth: number = 0;
  isMenuOpen: boolean = false;
  isMenuOpen2: boolean = false;
  user: boolean = false;
  role: { isDev: boolean; isAdmin: boolean } = { isDev: false, isAdmin: false };
  userImageUrl: any;
  isLoading: boolean = false;

  @Input() userData: any = '';

  constructor(
    private widthCheck: WidthCheckService,
    private eRef: ElementRef,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private apiService: ApiService
  ) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
      if (this.innerWidth > 733) {
        this.isMenuOpen = false;
      } else {
        this.isMenuOpen2 = false;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    this.userImageUrl = '';
    try {
      const res = await this.apiService.getImage(this.userData.userImage);
      console.log(this.userData);
      this.userImageUrl = URL.createObjectURL(res);
    } catch (error) {
      console.error('Error fetching image:', error);
      this.userImageUrl = 'path/to/placeholder/image.jpg';
    } finally {
      this.isLoading = false;
    }
  }

  ngDoCheck(): void {
    this.user = this.userService.getUser();
    this.role = this.roleService.getRole();
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleOpenMenu2() {
    this.isMenuOpen2 = !this.isMenuOpen2;
  }

  closeMenu2() {
    this.isMenuOpen2 = false;
  }

  async signout() {
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    if (token) {
      await this.apiService.signout(token);
      localStorage.removeItem('authToken');
      this.apiService.checkToken();
      this.router.navigate(['']);
    }
    this.isMenuOpen2 = false;
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    const clickInside = this.eRef.nativeElement.contains(e.target);
    if (!clickInside && this.isMenuOpen2) {
      this.isMenuOpen2 = false;
    }
  }

  ngOnDestroy() {
    if (this.userImageUrl) {
      URL.revokeObjectURL(this.userImageUrl);
    }
  }
}
