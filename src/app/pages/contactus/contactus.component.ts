import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/email-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/user-question-alt-1-svgrepo-com.svg'
  imgSrc5: string = 'assets/svg/facebook-svgrepo-com-black.svg'
  imgSrc6: string = '../../../assets/svg/github-142-svgrepo-com.svg'
}
