import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { CapitailizeFirst } from '../../../utils/pipes/CapitalFirst.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgOptimizedImage, CapitailizeFirst, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc2: string = 'assets/png/logo-no-background.png';
  imgSrc3: string = 'assets/svg/reset-password-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/arrow-narrow-down-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/user-plus-svgrepo-com.svg'

  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';

  inputValues: Array<string> = ['username', 'email', 'password'];
}
