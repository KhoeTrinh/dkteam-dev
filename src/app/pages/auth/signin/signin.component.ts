import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg'
  imgSrc2: string = 'assets/png/logo-no-background.png'
}
