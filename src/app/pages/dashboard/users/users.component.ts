import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc2: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/pen-square-svgrepo-com-white.svg';
  imgSrc4: string = 'assets/png/logo-color.png';
  imgSrc5: string = 'assets/svg/arrow-prev-small-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/arrow-next-small-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  bgClass2: string = 'bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-300 via-rose-50 to-teal-50'
  author: any;
  currentIndices: number[] = []
  constructor() {
    this.author = this.userArray.map((author) => author.authorProd);
    this.currentIndices = Array(this.userArray.length).fill(0)
  }

  moveSlider(i: number, direction: number) {
    const numberOfProduct = this.author[i].length
    this.currentIndices[i] = (this.currentIndices[i] + direction + numberOfProduct) % numberOfProduct
    const translateXValue = `translateX(-${100 * this.currentIndices[i]}%)`
    const slider = document.getElementById(`slider-${i}`)
    if (slider) {
      slider.style.transform = translateXValue;
    }
  }

  userArray: Array<any> = [
    {
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
    },
    {
      id: 2,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 3,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 4,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
    {
      id: 3,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 5,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 6,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
    {
      id: 4,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 7,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 8,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
    {
      id: 5,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 9,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 10,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
    {
      id: 6,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 11,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 12,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
    {
      id: 7,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 13,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 14,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
    {
      id: 8,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 15,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 16,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
    {
      id: 9,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      authorProd: [
        {
          author: {
            id: 17,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 18,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
  ];
}
