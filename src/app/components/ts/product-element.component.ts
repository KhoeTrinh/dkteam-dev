import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-element',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe, RouterLink],
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
  imgSrc6: string = 'assets/svg/info-circle-svgrepo-com.svg';
  commentOpen: boolean = true;
  authors: any = '';
  comments: any = '';
  productImageUrl: string = '';
  userImageUrlProd: string[] = [];
  userData: any = {};
  userImageUrl: string = '';
  userImageUrlComment: string [] = []

  @Input() productData: any = '';
  @Output() commentOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    const res: any = await this.apiService.checkToken();
    this.userData = res.message;
    if (this.userData.userImage === 'assets/svg/user-svgrepo-com.svg') {
      this.userImageUrl = this.userData.userImage;
    } else {
      const imageBlob = await this.apiService.getImage(this.userData.userImage);
      this.userImageUrl = URL.createObjectURL(imageBlob);
    }
    this.authors = this.productData.author;
    this.comments = this.productData.comment;
    if (this.productData.imagePath === 'assets/svg/gear-10-svgrepo-com.svg') {
      this.productImageUrl = this.productData.imagePath;
    } else {
      const imageBlob = await this.apiService.getImage(
        this.productData.imagePath
      );
      this.productImageUrl = URL.createObjectURL(imageBlob);
    }
    if (Array.isArray(this.productData.author)) {
      this.userImageUrlProd = this.productData.author.map(() => this.imgSrc5);
      await Promise.all(
        this.productData.author.map(async (author: any, index: number) => {
          const imagePath = author.authorProd.userImagePath;
          const blob = await this.apiService.getImage(imagePath);
          this.userImageUrlProd[index] = URL.createObjectURL(blob);
        })
      ).catch(() => this.productData.author.map(() => this.imgSrc5));
    }
    if (Array.isArray(this.productData.comments)) {
      this.userImageUrlComment = this.productData.comments.map(() => this.imgSrc5);
      await Promise.all(
        this.productData.comments.map(async (author: any, index: number) => {
          const imagePath = author.author.userImage;
          const blob = await this.apiService.getImage(imagePath);
          this.userImageUrlComment[index] = URL.createObjectURL(blob);
        })
      ).catch(() => this.productData.comments.map(() => this.imgSrc5));
    }
  }
  commentClick(e: Event) {
    e.preventDefault();
    this.commentOpen = !this.commentOpen;
    this.commentOpenChange.emit(this.commentOpen);
  }

  async onSubmit(description: HTMLInputElement) {
    const data = {
      description: description.value,
      product: this.productData.id,
    };
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    await this.apiService.createComment(token, data);
    description.value = '';
  }
}
