import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css',
})
export class AboutusComponent {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/user-pen-alt-1-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/admin-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/code-svgrepo-com.svg';

  adminArray: any = [
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
      name: 'John Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70',
      name: 'Jane Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-42f8-a0-887ba5f70',
      name: 'June Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
  ];

  devArray: any = [
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
      name: 'John Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70',
      name: 'Jane Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-42f8-a0-887ba5f70',
      name: 'June Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-4123612f8-a5d0-887ba5f70f',
      name: 'Emily Johnson',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4124914-42f8-a5d0-887ba5f70',
      name: 'Michael Brown',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
  ];
}
