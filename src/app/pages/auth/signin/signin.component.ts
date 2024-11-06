import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { CapitailizeFirst } from '../../../utils/pipes/CapitalFirst.pipe';
import { Router, RouterLink } from '@angular/router';
import { WidthCheckService } from '../../../services/width-check.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { IsLoadingService } from '../../../services/isLoadingService.service';

interface ProductForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CapitailizeFirst,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
})
export class SigninComponent {
  imgSrc: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc2: string = 'assets/png/logo-no-background.png';
  imgSrc3: string = 'assets/svg/reset-password-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/arrow-narrow-down-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  inputValues: Array<string> = ['email', 'password'];
  innerWidth: number = 0;
  productForm: FormGroup<ProductForm>;

  constructor(
    private widthCheck: WidthCheckService,
    private router: Router,
    private apiService: ApiService,
    private isLoadingService: IsLoadingService
  ) {
    this.innerWidth = this.widthCheck.innerWidth;
    window.addEventListener('resize', () => {
      this.innerWidth = this.widthCheck.innerWidth;
    });
    this.productForm = new FormGroup<ProductForm>({
      email: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
    });
  }

  async signin() {
    this.isLoadingService.startLoading()
    const formValue = this.productForm.value;
    const submitData = {
      email: formValue.email,
      password: formValue.password,
    };
    const res: any = await this.apiService.signin(submitData);
    localStorage.setItem('authToken', JSON.stringify(res.token));
    this.apiService.checkToken();
    this.router.navigate(['/']);
    this.isLoadingService.stopLoading()
  }
}
