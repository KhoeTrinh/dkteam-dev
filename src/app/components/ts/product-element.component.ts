import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-element',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: '../html/product-element.component.html',
  styleUrl: '../css/product-element.component.css',
})
export class ProductElementComponent implements OnInit {
  tClass: string =
    'bg-gradient-to-t from-sky-300 via-fuchsia-50 to-emerald-50 bg-clip-text text-transparent';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/gear-10-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/user-svgrepo-com.svg';
  commentOpen: boolean = false;
  authors: any = ''
  comments: any = ''

  @Input() productData: any = ''

  ngOnInit() {
    this.authors = this.productData.author
    this.comments = this.productData.comment
  }
  commentClick(e: Event) {
    e.preventDefault();
    this.commentOpen = !this.commentOpen;
    console.log(this.productData);
  }
}
