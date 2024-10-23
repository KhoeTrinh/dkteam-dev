import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductEditComponent implements OnInit {
  imgSrc: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/plus-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  authorArray: Array<string> = [];
  fileName: string = '';
  productId: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.fileName = this.productsDataById.image || 'No file chosen';
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  addAuthor(a: HTMLInputElement) {
    const author = a.value.trim()
    if(author) {
      this.authorArray.push(author);
      a.value = '';
    }
  }

  productsDataById = {
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
          id: '1',
        },
      },
      {
        authorProd: {
          userImage: this.imgSrc2,
          username: 'Khoa',
          id: '2',
        },
      },
      {
        authorProd: {
          userImage: this.imgSrc2,
          username: 'Khoa',
          id: '3',
        },
      },
      {
        authorProd: {
          userImage: this.imgSrc2,
          username: 'Khoa',
          id: '4',
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
  };
}
