import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-element',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: '../html/user-element.component.html',
  styleUrl: '../css/user-element.component.css',
})
export class UserElementComponent implements OnInit {
  imgSrc: string = 'assets/svg/arrow-prev-small-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/arrow-next-small-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/gear-10-svgrepo-com.svg'
  bgClass: string =
    'bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-300 via-rose-50 to-teal-50';
  currentIndices: number = 0;
  userImageUrl: string = '';
  productImagePath: any = [];
  productImageUrl: any = [];
  @Input() userData: any;
  @Input() index: any;
  @Output() indexChanged: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('slider') slider!: ElementRef;

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    if (this.userData.imagePath === 'assets/svg/user-svgrepo-com.svg') {
      this.userImageUrl = this.userData.imagePath;
    } else {
      const imageBlob = await this.apiService.getImage(this.userData.imagePath);
      this.userImageUrl = URL.createObjectURL(imageBlob);
    }
    this.productImagePath = this.userData.authorProd.map(
      (au: { author: any }) => au.author.productImagePath
    );
    if (Array.isArray(this.productImagePath)) {
      this.productImageUrl = this.productImagePath.map(() => this.imgSrc3);
      await Promise.all(
        this.productImagePath.map(async (author: any, index: number) => {
          const blob = await this.apiService.getImage(author);
          this.productImageUrl[index] = URL.createObjectURL(blob);
        })
      ).catch((err) => this.productImagePath.map(() => this.imgSrc3));
    }
  }

  moveSlider(direction: number, e: Event) {
    e.preventDefault();
    e.stopPropagation();
    const numberOfProduct = this.userData.authorProd.length;
    this.currentIndices =
      (this.currentIndices + direction + numberOfProduct) % numberOfProduct;
    this.indexChanged.emit(this.currentIndices);
    const translateXValue = `translateX(-${100 * this.currentIndices}%)`;
    if (this.slider) {
      this.slider.nativeElement.style.transform = translateXValue;
    }
  }

  // if (Array.isArray(this.productData.author)) {
  //   this.userImageUrl = this.productData.author.map(() => this.imgSrc5);
  //   await Promise.all(
  //     this.productData.author.map(async (author: any, index: number) => {
  //       const imagePath = author.authorProd.userImagePath;
  //       const blob = await this.apiService.getImage(imagePath);
  //       this.userImageUrl[index] = URL.createObjectURL(blob);
  //     })
  //   ).catch(() => this.productData.author.map(() => this.imgSrc5));
  // }
}
