import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/admin-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/user-svgrepo-com.svg'
  imgSrc5: string = 'assets/svg/gear-10-svgrepo-com.svg'
  imgSrc6: string = 'assets/svg/increase-svgrepo-com.svg'
}
