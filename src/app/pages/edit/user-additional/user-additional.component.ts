import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RoleService } from '../../../services/role.service';

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
  id: string = '';
  role: any
  isLoading: boolean = false;

  constructor(
    private apiService: ApiService,
    private roleService: RoleService
  ) {}

  async ngOnInit(): Promise<void> {
    this.isLoading = true
    const res = await this.apiService.checkToken();
    this.role = this.roleService.getRole();
    this.aboutme = res.message.aboutme;
    this.fileName = res.message.userImage;
    this.fileUrl = res.message.userImage;
    this.id = res.message.id;
    this.isLoading = false
  }

  onFileSelected(event: any) {
    if (this.fileUrl) {
      URL.revokeObjectURL(this.fileUrl);
      this.fileUrl = '';
    }
    const file: File = event.target.files[0];
    if (!file) {
      console.warn('No file selected.');
      return;
    }
    this.fileName = file.name;
    this.fileUrl = URL.createObjectURL(file);
    this.selectedFile = file;
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

  async onSubmit() {
    if (!this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('id', this.id);
    formData.append('type', 'user');

    const res: any = await this.apiService.uploadImage(formData);
    localStorage.setItem('authToken', JSON.stringify(res.token))
    return 'Ok';
  }
}
