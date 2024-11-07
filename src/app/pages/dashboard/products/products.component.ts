import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductElementComponent } from '../../../components/ts/product-element.component';
import { Router, RouterLink } from '@angular/router';
import { RoleService } from '../../../services/role.service';
import { ApiService } from '../../../services/api.service';
import { IsLoadingService } from '../../../services/isLoadingService.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgOptimizedImage, ProductElementComponent, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  imgSrc: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/pen-square-svgrepo-com-white.svg';
  imgSrc4: string = 'assets/svg/plus-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/search-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  isExpanded: boolean = false;
  commentOpen: boolean[] = [];
  productArray: any = [];
  role: any;

  constructor(
    private roleService: RoleService,
    private apiService: ApiService,
    private isLoadingService: IsLoadingService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoadingService.startLoading();
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const res: any = await this.apiService.getProducts(token);
    this.productArray = res.message;
    this.role = this.roleService.getRole();
    this.commentOpen = new Array(this.productArray.length).fill(false);
    this.isLoadingService.stopLoading();
  }

  toggleInputWidth() {
    this.isExpanded = !this.isExpanded;
  }

  handleCommentOpen(commentOpen: boolean, i: number) {
    this.commentOpen[i] = commentOpen;
  }

  Search(value: string) {
    this.router.navigate([`products/${value}`])
  }
}
