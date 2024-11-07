import { map } from 'rxjs/operators';
import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { IsLoadingService } from '../../../services/isLoadingService.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc2: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/pen-square-svgrepo-com-white.svg';
  imgSrc4: string = 'assets/png/logo-color.png';
  imgSrc5: string = 'assets/svg/arrow-prev-small-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/arrow-next-small-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  bgClass2: string =
    'bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-300 via-rose-50 to-teal-50';
  author: any;
  currentIndices: number[] = [];
  userArray: any = [];
  userImagePath: any = [];
  userImageUrl: any = [];
  constructor(
    private apiService: ApiService,
    private isLoadingService: IsLoadingService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoadingService.startLoading();
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const res: any = await this.apiService.getAllUsers(token);
    this.userArray = res.message;
    this.author = this.userArray.map(
      (author: { authorProd: any }) => author.authorProd
    );
    this.userImagePath = this.userArray.map(
      (ip: { imagePath: string }) => ip.imagePath
    );
    if (Array.isArray(this.userImagePath)) {
      this.isLoadingService.startBlobLoading();
      this.userImageUrl = this.userImagePath.map(() => this.imgSrc2);
      await Promise.all(
        this.userImagePath.map(async (image: any, index: number) => {
          const blob = await this.apiService.getImage(image);
          this.userImageUrl[index] = URL.createObjectURL(blob);
        })
      ).catch(() => this.userImagePath.map(() => this.imgSrc2));
      this.isLoadingService.stopBlobLoading();
    }
    this.currentIndices = Array(this.userArray.length).fill(0);
    this.isLoadingService.stopLoading();
  }

  moveSlider(i: number, direction: number, e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const numberOfProduct = this.author[i].length;
    this.currentIndices[i] =
      (this.currentIndices[i] + direction + numberOfProduct) % numberOfProduct;
    const translateXValue = `translateX(-${100 * this.currentIndices[i]}%)`;
    const slider = document.getElementById(`slider-${i}`);
    if (slider) {
      slider.style.transform = translateXValue;
    }
  }
}
