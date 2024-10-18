import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WidthCheckService } from '../../services/width-check.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: '../html/navbar.component.html',
  styleUrl: '../css/navbar.component.css'
})
export class NavbarComponent {
  imgSrc: string = 'assets/svg/logo-no-background.svg';
  imgSrc2: string = 'assets/svg/menu-svgrepo-com.svg';

  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700'
  aClass: string = 'text-white text-sm px-4 py-2 h-full w-full flex justify-center items-center font-bold';
  aClass2: string = 'w-full flex justify-center items-center text-white'

  innerWidth: number = 0;
  isMenuOpen: boolean = false

  constructor(private widthCheck: WidthCheckService) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
  }

  toggleMenu() {
    this.isMenuOpen =!this.isMenuOpen;
    console.log(this.isMenuOpen);
  }
}
