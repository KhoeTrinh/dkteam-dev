import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { CapitailizeFirst } from '../../../utils/pipes/CapitalFirst.pipe';
import { Router, RouterLink } from '@angular/router';
import { WidthCheckService } from '../../../services/width-check.service';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgOptimizedImage, CapitailizeFirst, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc2: string = 'assets/png/logo-no-background.png';
  imgSrc3: string = 'assets/svg/reset-password-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/arrow-narrow-down-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/user-plus-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  inputValues: Array<string> = ['username', 'email', 'password'];
  innerWidth: number = 0;

  constructor(
    private widthCheck: WidthCheckService,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
  }

  signup() {
    this.userService.setUser(true);
    this.roleService.setRole({ isDev: false, isAdmin: false });
    this.router.navigate(['']);
  }
}
