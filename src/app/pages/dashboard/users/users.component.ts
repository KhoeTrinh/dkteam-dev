import { map } from 'rxjs/operators';
import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UserElementComponent } from '../../../components/ts/user-element.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, UserElementComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc2: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/pen-square-svgrepo-com-white.svg';
  imgSrc4: string = 'assets/png/logo-color.png';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  author: any;
  currentIndices: number[] = [];
  userArray: any = [];
  userImagePath: any = [];
  userImageUrl: any = [];
  productImageUrl: any = {}
  constructor(
    private apiService: ApiService,
  ) {}

  async ngOnInit(): Promise<void> {
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
      this.userImageUrl = this.userImagePath.map(() => this.imgSrc2);
      await Promise.all(
        this.userImagePath.map(async (image: any, index: number) => {
          const blob = await this.apiService.getImage(image);
          this.userImageUrl[index] = URL.createObjectURL(blob);
        })
      ).catch(() => this.userImagePath.map(() => this.imgSrc2));
    }
    this.currentIndices = Array(this.userArray.length).fill(0);
  }

  handleIndexChange(e: number, i: number) {
    this.currentIndices[i] = e
  }
}
