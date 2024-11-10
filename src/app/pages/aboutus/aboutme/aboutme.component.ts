import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css',
})
export class AboutmessComponent implements OnInit {
  userData: any = {};
  aboutmeData: any = {};
  userImageUrl: string = ''
  aboutmeImageUrl: string = ''
  constructor(private router: ActivatedRoute, private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    const id = this.router.snapshot.paramMap.get('id') || '';
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const res = await this.apiService.checkToken()
    const aboutmeRes: any = await this.apiService.getAboutme(token, id);
    this.userData = res.message;
    this.aboutmeData = aboutmeRes.message;
    if(this.userData.userImage === 'assets/svg/user-svgrepo-com.svg') {
      this.userImageUrl = this.userData.userImage;
    } else {
      const imageBlob = await this.apiService.getImage(this.userData.userImage);
      this.userImageUrl = URL.createObjectURL(imageBlob);
    }
    if(this.aboutmeData.image === 'assets/svg/user-svgrepo-com.svg') {
      this.aboutmeImageUrl = this.aboutmeData.image;
    } else {
      const aboutmeImageBlob = await this.apiService.getImage(this.aboutmeData.image);
      this.aboutmeImageUrl = URL.createObjectURL(aboutmeImageBlob);
    }
  }
}
