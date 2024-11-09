import { DatePipe, NgOptimizedImage } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Renderer2,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-productsdetails',
  standalone: true,
  imports: [NgOptimizedImage, DatePipe],
  templateUrl: './productsdetails.component.html',
  styleUrl: './productsdetails.component.css',
})
export class ProductsdetailsComponent implements OnInit {
  tClass: string = `bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
  from-zinc-800 via-indigo-900 to-gray-300 bg-clip-text text-transparent`;
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  imgSrc: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/status-up-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/date-range-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/gear-10-svgrepo-com.svg';
  productId: string = '';
  productsDataById: any = {};
  productImageUrl: string = '';
  userImageUrl: string[] = [];
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: ActivatedRoute,
    private apiService: ApiService,
  ) {}
  async ngOnInit(): Promise<void> {
    this.productId = this.router.snapshot.paramMap.get('id') || '';
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const res: any = await this.apiService.getProductById(
      token,
      this.productId
    );
    this.productsDataById = res.message;
    this.productsDataById.prodAnimation = {
      classesToAdd: [
        'flex',
        'justify-evenly',
        'py-10',
        'relative',
        'mx-10',
        'min-h-[30px]',
      ],
      imgElements: [
        {
          src: 'assets/svg/user-svgrepo-com.svg',
          width: '30',
          height: '30',
          classes: [],
        },
        {
          src: 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg',
          width: '30',
          height: '30',
          classes: [],
        },
        {
          src: 'assets/svg/user-svgrepo-com.svg',
          width: '30',
          height: '30',
          classes: [],
        },
        {
          src: 'assets/svg/file-pencil-alt-svgrepo-com.svg',
          width: '30',
          height: '30',
          classes: ['animation-img'],
        },
      ],
    };
    this.getAnimation();
    if (
      this.productsDataById.imagePath === 'assets/svg/gear-10-svgrepo-com.svg'
    ) {
      this.productImageUrl = this.productsDataById.imagePath;
    } else {
      const imageBlob = await this.apiService.getImage(
        this.productsDataById.imagePath
      );
      this.productImageUrl = URL.createObjectURL(imageBlob);
    }
    if (Array.isArray(this.productsDataById.author)) {
      this.userImageUrl = this.productsDataById.author.map(() => this.imgSrc4);
      await Promise.all(
        this.productsDataById.author.map(async (author: any, index: number) => {
          const imagePath = author.authorProd.userImagePath;
          const blob = await this.apiService.getImage(imagePath);
          this.userImageUrl[index] = URL.createObjectURL(blob);
        })
      ).catch(() => this.productsDataById.author.map(() => this.imgSrc4));
    }
  }
  getAnimation() {
    const container = this.el.nativeElement.querySelector('#dynamic-content');
    const div = this.renderer.createElement('div');
    this.productsDataById.prodAnimation.classesToAdd.forEach(
      (className: string) => {
        this.renderer.addClass(div, className);
      }
    );
    this.productsDataById.prodAnimation.imgElements.forEach(
      (element: {
        src: string;
        width: string;
        height: string;
        classes: string[];
      }) => {
        const img = this.renderer.createElement('img');
        this.renderer.setAttribute(img, 'src', element.src);
        this.renderer.setAttribute(img, 'width', element.width);
        this.renderer.setAttribute(img, 'height', element.height);
        element.classes.forEach((cls: string) => {
          this.renderer.addClass(img, cls);
        });
        this.renderer.appendChild(div, img);
      }
    );
    this.renderer.appendChild(container, div);
  }
}
