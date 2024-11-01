import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface ProductForm {
  image: FormControl<string | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css',
})
export class AboutmesComponent {
  imgSrc: string = 'assets/svg/user-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  fileName: string = 'No file chosen';
  productForm: FormGroup<ProductForm>;

  constructor() {
    this.productForm = new FormGroup<ProductForm>({
      image: new FormControl<string | null>(this.aboutmeData.image),
      title: new FormControl<string | null>(this.aboutmeData.title),
      description: new FormControl<string | null>(this.aboutmeData.description),
    });
    this.fileName = this.aboutmeData.image
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  onSubmit() {
    const formValue = this.productForm.value;
    let submitData;
    if (formValue.image) {
      submitData = {
        image: formValue.image,
      };
    } else {
      submitData = {
        title: formValue.title,
        description: formValue.description,
      };
    }
    console.log(submitData);
  }

  aboutmeData = {
    title: 'khoa',
    description: 'khoa is a great',
    image: 'assets/svg/user-svgrepo-com.svg',
  };
}
