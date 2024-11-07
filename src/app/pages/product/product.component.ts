import { Component, OnInit } from '@angular/core';
import { WidthCheckService } from '../../services/width-check.service';
import { NgOptimizedImage } from '@angular/common';
import { ProductElementComponent } from '../../components/ts/product-element.component';
import { ApiService } from '../../services/api.service';
import { IsLoadingService } from '../../services/isLoadingService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage, ProductElementComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  tClass: string =
    'bg-gradient-to-t from-sky-300 via-fuchsia-50 to-emerald-50 bg-clip-text text-transparent';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/gear-10-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/search-svgrepo-com.svg';
  innerWidth: number = 0;
  isExpanded: boolean = false;
  productArray: any = []
  constructor(
    private widthCheck: WidthCheckService,
    private apiService: ApiService,
    private isLoadingService: IsLoadingService,
    private router: Router
  ) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
  }

  async ngOnInit(): Promise<void> {
    this.isLoadingService.startLoading()
    const token = JSON.parse(localStorage.getItem('authToken') || '""')
    const res: any = await this.apiService.getProducts(token);
    this.productArray = res.message
    this.isLoadingService.stopLoading()
  }

  toggleInputWidth() {
    this.isExpanded = !this.isExpanded;
  }

  Search(value: string) {
    this.router.navigate([`products/${value}`])
  }
}
