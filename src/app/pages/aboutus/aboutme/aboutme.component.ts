import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmessComponent {
  aboutmeData = {
    id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
    username: 'khoa',
    userImage: 'assets/svg/user-svgrepo-com.svg',
    aboutme: {
      title: 'Khoa The Great Developer',
      description: 'Khoa is a great developer',
      image: 'assets/png/OIP.jpg'
    }
  }
}
