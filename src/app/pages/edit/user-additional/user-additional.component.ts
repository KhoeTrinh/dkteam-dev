import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AboutmeService } from '../../../services/aboutme.service';

@Component({
  selector: 'app-user-additional',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './user-additional.component.html',
  styleUrl: './user-additional.component.css',
})
export class UserAdditionalComponent implements OnInit {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/profile-image-round-1326-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/pen-square-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/arrow-to-top-right-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  fileName: string = 'No file chosen';
  selectedFile: File | null = null;
  fileUrl: string = '';
  pickSide: string | null = null;
  aboutme: any = null;

  constructor(private aboutmeService: AboutmeService) {}

  ngOnInit(): void {
    this.aboutme = this.aboutmeService.getAboutme();
    this.fileName = this.userData.userImage;
    this.fileUrl = this.userData.userImage;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (this.fileUrl) {
      URL.revokeObjectURL(this.fileUrl);
      this.fileUrl = '';
    }
    if (file) {
      this.fileName = file.name;
      this.fileUrl = URL.createObjectURL(file);
      this.selectedFile = file;
    }
  }

  switchPickSide(side: string | null) {
    this.pickSide = side;
    if (this.pickSide === 'image') {
      this.restoreFileName();
    }
  }

  restoreFileName() {
    this.fileName = 'No file chosen';
  }

  onSubmit() {
    let submitData;
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
      submitData = {
        image: formData,
      };
    }
    console.log(submitData);
  }

  userData: any = {
    id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
    username: 'khoa',
    email: 'khoa@example.com',
    userImage: this.imgSrc2,
    authorProd: [],
    aboutme: {
      title: 'khoa',
      description: 'khoa is a great',
      image: this.imgSrc2,
    },
  };
}
