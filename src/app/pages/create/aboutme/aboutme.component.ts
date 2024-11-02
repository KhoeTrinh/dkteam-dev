import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface ProductForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {
  imgSrc: string = 'assets/svg/user-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  fileName: string = 'No file chosen';
  selectedFile: File | null = null
  fileUrl: string = ''
  productForm: FormGroup<ProductForm>;

  constructor() {
    this.productForm = new FormGroup<ProductForm>({
      title: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (this.fileUrl) {
      URL.revokeObjectURL(this.fileUrl);
      this.fileUrl = ''
    }
    if (file) {
      this.fileName = file.name;
      this.fileUrl = URL.createObjectURL(file)
      this.selectedFile = file
    }
  }

  onSubmit() {
    const formValue = this.productForm.value;
    let submitData;
    if (this.selectedFile) {
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name)
      submitData = {
        image: formData
      };
    } else {
      submitData = {
        title: formValue.title,
        description: formValue.description,
      };
    }
    console.log(submitData);
  }
}
