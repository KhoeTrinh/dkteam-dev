import { Injectable, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WidthCheckService implements OnDestroy {
  innerWidth: number = 0;
  constructor() {
    this.innerWidth = window.innerWidth;
    window.addEventListener('resize', this.onResize.bind(this));
  }
  onResize(_: Event) {
    this.innerWidth = window.innerWidth;
  }
  ngOnDestroy() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }
}
