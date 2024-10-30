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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: '../html/navbar.component.html',
  styleUrl: '../css/navbar.component.css',
})
export class NavbarComponent implements DoCheck {
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

  @Input() userData: any = '';

  constructor(
    private widthCheck: WidthCheckService,
    private eRef: ElementRef,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
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

  ngDoCheck(): void {
    this.user = this.userService.getUser();
    this.role = this.roleService.getRole()
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

  signout() {
    this.userService.setUser(false);
    this.roleService.setRole({ isDev: false, isAdmin: false });
    this.router.navigate(['']);
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
}
