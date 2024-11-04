import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CapitailizeFirst } from '../../../utils/pipes/CapitalFirst.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

interface Form {
  username: FormControl<string | null>;
  email: FormControl<string | null>;
  prevPassword: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CapitailizeFirst,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/profile-image-round-1326-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/pen-square-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/arrow-to-top-left-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/arrow-to-top-right-svgrepo-com.svg';
  imgSrc7: string = 'assets/svg/more-vertical-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  inputValues: Array<string> = ['username', 'email'];
  inputValues2: Array<{ label: string; controlName: keyof Form }> = [
    { label: 'old password', controlName: 'prevPassword' },
    { label: 'password', controlName: 'password' },
    { label: 'confirm password', controlName: 'confirmPassword' },
  ];
  currentIndex: number = 0;
  form: FormGroup<Form>;

  constructor(private apiService: ApiService, private router: Router) {
    this.form = new FormGroup<Form>({
      username: new FormControl<string | null>(null),
      email: new FormControl<string | null>(null),
      prevPassword: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
      confirmPassword: new FormControl<string | null>(null),
    });
  }

  async ngOnInit(): Promise<void> {
    const res = await this.apiService.checkToken();
    this.form.get('username')?.setValue(res.message.username);
    this.form.get('email')?.setValue(res.message.email);
  }

  updateCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  moveSlider(direction: number) {
    const numberOfInputs = this.inputValues2.length;
    this.currentIndex =
      (this.currentIndex + direction + numberOfInputs) % numberOfInputs;
    const translateXValue = `translateX(-${
      (100 / numberOfInputs) * this.currentIndex
    }%)`;
    const slider = document.getElementById('slider');
    if (slider) {
      slider.style.transform = translateXValue;
    }
  }

  async onSubmit() {
    const formValue = this.form.value;
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const submitData = {
      username: formValue.username,
      email: formValue.email,
      prevPassword: formValue.prevPassword,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    };
    const res: any = await this.apiService.updateUser(submitData, token);
    localStorage.setItem('authToken', JSON.stringify(res.token));
    this.currentIndex = 0;
    this.apiService.checkToken();
    this.router.navigate(['/']);
  }

}
