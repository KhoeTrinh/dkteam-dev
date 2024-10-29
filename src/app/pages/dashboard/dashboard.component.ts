import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/admin-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/gear-10-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/increase-svgrepo-com.svg';
  role: any

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
      this.role = this.roleService.getRole()
      console.log(this.role);
  }
}
