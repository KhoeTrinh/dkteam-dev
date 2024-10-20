import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WidthCheckService } from '../../services/width-check.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: '../html/navbar.component.html',
  styleUrl: '../css/navbar.component.css'
})
export class NavbarComponent {
  imgSrc: string = 'assets/svg/logo-no-background.svg';
  imgSrc2: string = 'assets/svg/menu-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/logout-svgrepo-com.svg';

  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700'
  aClass: string = 'text-white text-sm px-4 py-2 h-full w-full flex justify-center items-center font-bold';
  aClass2: string = 'w-full flex justify-center items-center text-white border-b border-gray-500'

  innerWidth: number = 0;
  isMenuOpen: boolean = false

  @Input() user: boolean = false
  @Input() userData: any = ''

  constructor(private widthCheck: WidthCheckService, private eRef: ElementRef) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
  }

  toggleMenu() {
    this.isMenuOpen =!this.isMenuOpen;
    console.log(this.user);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: Event): void {
    const clickedInside = this.eRef.nativeElement.contains(e.target)
    if(!clickedInside && this.isMenuOpen) {
      this.isMenuOpen = false
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false
  }
}
