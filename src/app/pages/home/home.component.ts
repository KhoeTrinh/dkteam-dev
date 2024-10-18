import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WidthCheckService } from '../../services/width-check.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tClass: string =
    'bg-gradient-to-t from-sky-300 via-fuchsia-50 to-emerald-50 bg-clip-text text-transparent';
  cClass: string = 'flex justify-center';
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/facebook-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/zalo-svgrepo-com.svg';

  innerWidth: number = 0;
  constructor(private widthCheck: WidthCheckService) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
  }
}
