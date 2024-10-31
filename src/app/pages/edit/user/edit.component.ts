import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { CapitailizeFirst } from '../../../utils/pipes/CapitalFirst.pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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
  imports: [NgOptimizedImage, CapitailizeFirst, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/profile-image-round-1326-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/pen-square-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/arrow-to-top-left-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/arrow-to-top-right-svgrepo-com.svg';
  imgSrc7: string = 'assets/svg/more-vertical-svgrepo-com.svg'
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  inputValues: Array<string> = ['username', 'email'];
  inputValues2: Array<{ label: string; controlName: keyof Form }> = [
    { label: 'old password', controlName: 'prevPassword' },
    { label: 'password', controlName: 'password' },
    { label: 'confirm password', controlName: 'confirmPassword' },
  ];
  currentIndex: number = 0;
  form: FormGroup<Form>;

  constructor() {
    this.form = new FormGroup<Form>({
      username: new FormControl<string | null>(this.userData.username),
      email: new FormControl<string | null>(this.userData.email),
      prevPassword: new FormControl<string | null>(null),
      password: new FormControl<string | null>(null),
      confirmPassword: new FormControl<string | null>(null),
    });
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

  onSubmit() {
    const formValue = this.form.value;
    let submitData;
    submitData = {
      username: formValue.username,
      email: formValue.email,
      prevPassword: formValue.prevPassword,
      password: formValue.password,
      confirmPassword: formValue.confirmPassword,
    };
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
