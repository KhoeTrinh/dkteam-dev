import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-productsdetails',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './productsdetails.component.html',
  styleUrl: './productsdetails.component.css',
})
export class ProductsdetailsComponent implements AfterViewInit {
  tClass: string = `bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]
  from-zinc-800 via-indigo-900 to-gray-300 bg-clip-text text-transparent`;
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  imgSrc: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/status-up-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/date-range-svgrepo-com.svg'
  prodAnimation = {
    classesToAdd: ['flex', 'justify-evenly', 'py-10', 'relative', 'mx-10'],
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
  devArray: any = [
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
      name: 'John Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-42f8-a5d0-887ba5f70',
      name: 'Jane Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-42f8-a0-887ba5f70',
      name: 'June Doe',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4914-4123612f8-a5d0-887ba5f70f',
      name: 'Emily Johnson',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
    {
      id: '0c548a0a-4124914-42f8-a5d0-887ba5f70',
      name: 'Michael Brown',
      imgSrc: 'assets/svg/user-svgrepo-com.svg',
    },
  ];
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngAfterViewInit() {
    const container = this.el.nativeElement.querySelector('#dynamic-content');
    const div = this.renderer.createElement('div');
    this.prodAnimation.classesToAdd.forEach((className) => {
      this.renderer.addClass(div, className);
    });
    this.prodAnimation.imgElements.forEach((element) => {
      const img = this.renderer.createElement('img');
      this.renderer.setAttribute(img, 'src', element.src);
      this.renderer.setAttribute(img, 'width', element.width);
      this.renderer.setAttribute(img, 'height', element.height);
      element.classes.forEach((cls) => {
        this.renderer.addClass(img, cls);
      });
      this.renderer.appendChild(div, img);
    });

    this.renderer.appendChild(container, div);
  }
}
