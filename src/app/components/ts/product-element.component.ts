import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { IsLoadingService } from '../../services/isLoadingService.service';

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
  commentOpen: boolean = false;
  authors: any = '';
  comments: any = '';
  productImageUrl: string = ''
  userImageUrl: string[] = [];

  @Input() productData: any = '';
  @Output() commentOpenChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private apiService: ApiService,
    private isLoadingService: IsLoadingService
  ) {}

  async ngOnInit() {
    this.isLoadingService.startBlobLoading();
    this.authors = this.productData.author;
    this.comments = this.productData.comment;
    if(this.productData.imagePath === 'assets/svg/gear-10-svgrepo-com.svg') {
      this.productImageUrl = this.productData.imagePath;
    } else {
      const imageBlob = await this.apiService.getImage(
        this.productData.imagePath
      );
      this.productImageUrl = URL.createObjectURL(imageBlob);
    }
    if (Array.isArray(this.productData.author)) {
      this.userImageUrl = this.productData.author.map(() => this.imgSrc5);
      await Promise.all(
        this.productData.author.map(async (author: any, index: number) => {
          const imagePath = author.authorProd.userImagePath;
          const blob = await this.apiService.getImage(imagePath);
          this.userImageUrl[index] = URL.createObjectURL(blob);
        })
      ).catch(() => this.productData.author.map(() => this.imgSrc5));
    }

    this.isLoadingService.stopBlobLoading();
  }
  commentClick(e: Event) {
    e.preventDefault();
    this.commentOpen = !this.commentOpen;
    this.commentOpenChange.emit(this.commentOpen);
  }
}
