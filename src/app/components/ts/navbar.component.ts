import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WidthCheckService } from '../../hooks/width-check.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgOptimizedImage],
  templateUrl: '../html/navbar.component.html',
  styleUrl: '../css/navbar.component.css'
})
export class NavbarComponent {
  imgSrc: string = 'assets/svg/logo-no-background.svg';
  imgSrc2: string = 'assets/svg/open-menu-svgrepo-com.svg'
  aClass: string = 'text-white px-4 py-2 h-full w-full flex justify-center items-center font-bold';
  innerWidth: number = 0;

  constructor(private widthCheck: WidthCheckService) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
  }
}
