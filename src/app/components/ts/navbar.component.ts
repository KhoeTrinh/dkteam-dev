import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WidthCheckService } from '../../services/width-check.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: '../html/navbar.component.html',
  styleUrl: '../css/navbar.component.css',
})
export class NavbarComponent {
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
  isMenuOpen2: boolean = false

  @Input() user: boolean = false;
  @Input() userData: any = '';

  constructor(private widthCheck: WidthCheckService) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
      if (this.innerWidth > 733) {
        this.isMenuOpen = false;
      } else {
        this.isMenuOpen2 = false
      }
    });
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu(){
    this.isMenuOpen = false;
  }

  toggleOpenMenu2() {
    this.isMenuOpen2 =!this.isMenuOpen2;
  }
}
