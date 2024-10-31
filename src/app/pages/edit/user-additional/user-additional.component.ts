import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-additional',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './user-additional.component.html',
  styleUrl: './user-additional.component.css'
})
export class UserAdditionalComponent {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/profile-image-round-1326-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/pen-square-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/user-svgrepo-com.svg'
  imgSrc6: string = '../../../../assets/svg/arrow-to-top-right-svgrepo-com.svg'
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  fileName: string | null = 'No file chosen';
  pickSide: string | null = null

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  switchPickSide(side: string | null) {
    this.pickSide = side
  }

  userData: any = {
    id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
    username: 'khoa',
    email: 'khoa@example.com',
    userImage: this.imgSrc2,
    authorProd: [],
    aboutme: {
      title: 'khoa',
      description: 'khoa is a great',
      image: this.imgSrc2,
    },
  };
}
