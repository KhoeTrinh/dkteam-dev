import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ProductElementComponent } from '../../../components/ts/product-element.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgOptimizedImage, ProductElementComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  imgSrc: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/pen-square-svgrepo-com-white.svg'
  imgSrc4: string = 'assets/svg/plus-svgrepo-com.svg'
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';

  productArray: Array<any> = [
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
      link: 'https://www.youtube.com/watch?v=T9ABgBIYS1g',
      title: 'File Sharing',
      description: 'A product created primarily for file sharing',
      publishDate: '2024-10-10T01:37:55.866Z',
      image: this.imgSrc,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
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
            userImage: this.imgSrc2,
          },
        },
        {
          id: 'f5d9ee62-217b65-b1f2840f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc2,
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
      image: this.imgSrc,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
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
            userImage: this.imgSrc2,
          },
        },
        {
          id: 'f5d9ee62-2173-4b65-b1f3-7f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc2,
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
      image: this.imgSrc,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
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
            userImage: this.imgSrc2,
          },
        },
        {
          id: 'f5d9ee62-2173-4b65-b1f3-7280f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc2,
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
      image: this.imgSrc,
      author: [
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '1'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '2'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
            username: 'Khoa',
            id: '3'
          },
        },
        {
          authorProd: {
            userImage: this.imgSrc2,
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
            userImage: this.imgSrc2,
          },
        },
        {
          id: 'f5d9ee62-2173-4b65-b1f30f30f1be',
          description: 'I love it',
          author: {
            username: 'Khoa',
            userImage: this.imgSrc2,
          },
        },
      ],
    },
  ];
}
