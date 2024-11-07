import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { IsLoadingService } from '../../../services/isLoadingService.service';

interface ProductForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css',
})
export class AboutmeComponent {
  imgSrc: string = 'assets/svg/user-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  fileName: string = 'No file chosen';
  selectedFile: File | null = null;
  fileUrl: string = '';
  productForm: FormGroup<ProductForm>;

  constructor(
    private apiService: ApiService,
    private isLoadingService: IsLoadingService
  ) {
    this.productForm = new FormGroup<ProductForm>({
      title: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
    });
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

  async onSubmit() {
    this.isLoadingService.startLoading()
    const formValue = this.productForm.value;
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const submitData = {
      title: formValue.title,
      description: formValue.description,
    };
    const res: any = await this.apiService.createAboutme(submitData, token);
    if (!this.selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('id', res.aboutme.message.id);
    formData.append('type', 'aboutme');

    await this.apiService.uploadImage(formData);
    this.isLoadingService.stopLoading()
    return 'Ok';
  }
}
