import { Component } from '@angular/core';
import { WidthCheckService } from '../../services/width-check.service';
import { NgOptimizedImage } from '@angular/common';
import { ProductElementComponent } from '../../components/ts/product-element.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage, ProductElementComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  tClass: string =
    'bg-gradient-to-t from-sky-300 via-fuchsia-50 to-emerald-50 bg-clip-text text-transparent';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/gear-10-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/user-svgrepo-com.svg';
  innerWidth: number = 0;

  productArray: Array<any> = [
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
      link: 'https://www.youtube.com/watch?v=T9ABgBIYS1g',
      title: 'File Sharing',
      description: 'A product created primarily for file sharing',
      publishDate: '2024-10-10T01:37:55.866Z',
      image: this.imgSrc4,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '4'
          },
        },
      ],
      comment: [
        {
          id: 'f5d9ee62-2174b65-b1f3-0f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
        {
          id: 'f5d9ee62-217b65-b1f2840f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
      ],
    },
    {
      id: '0c548a0a-4914-42-a5d0-887ba5f70f',
      link: 'https://www.youtube.com/watch?v=T9ABgBIYS1g',
      title: 'File Sharing 2',
      description: 'A product created primarily for file sharing',
      publishDate: '2024-10-10T01:37:55.866Z',
      image: this.imgSrc4,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '4'
          },
        },
      ],
      comment: [
        {
          id: 'f5d9ee62-2173-5-b1f3-740f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
        {
          id: 'f5d9ee62-2173-4b65-b1f3-7f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
      ],
    },
    {
      id: '0c548a0a-4914-42f8-a5d0-88ba3a5f70f',
      link: 'https://www.youtube.com/watch?v=T9ABgBIYS1g',
      title: 'File Sharing 3',
      description: 'A product created primarily for file sharing',
      publishDate: '2024-10-10T01:37:55.866Z',
      image: this.imgSrc4,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '4'
          },
        },
      ],
      comment: [
        {
          id: 'f5d9ee62-2173-4b65-b1f40f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
        {
          id: 'f5d9ee62-2173-4b65-b1f3-7280f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
      ],
    },
    {
      id: '0c548a0a-4914-42f8-a5d0-887b3a5f70f',
      link: 'https://www.youtube.com/watch?v=T9ABgBIYS1g',
      title: 'File Sharing 4',
      description: 'A product created primarily for file sharing',
      publishDate: '2024-10-10T01:37:55.866Z',
      image: this.imgSrc4,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc5,
            username: 'Khoa',
            id: '4'
          },
        },
      ],
      comment: [
        {
          id: 'f5d9ee62-2173-4b653-72840f30f1b',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
        {
          id: 'f5d9ee62-2173-4b65-b1f30f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc5,
          },
        },
      ],
    },
  ];

  constructor(private widthCheck: WidthCheckService) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
  }
}
