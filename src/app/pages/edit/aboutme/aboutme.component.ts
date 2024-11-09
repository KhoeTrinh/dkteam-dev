import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

interface ProductForm {
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
export class AboutmesComponent implements OnInit {
  imgSrc: string = 'assets/svg/user-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  fileName: string = 'No file chosen';
  selectedFile: File | null = null;
  fileUrl: string = '';
  productForm: FormGroup<ProductForm>;
  aboutmeData: any = {};

  constructor(private apiService: ApiService) {
    this.productForm = new FormGroup<ProductForm>({
      title: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
    });
  }

  async ngOnInit(): Promise<void> {
    const res = await this.apiService.checkToken();
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const aboutmeRes: any = await this.apiService.getAboutme(
      token,
      res.message.id
    );
    this.aboutmeData = aboutmeRes.message;
    this.productForm.get('title')?.setValue(this.aboutmeData.title);
    this.productForm.get('description')?.setValue(this.aboutmeData.description);
    this.fileName = this.aboutmeData.image;
    if (this.fileName === 'assets/svg/user-svgrepo-com.svg') {
      this.fileUrl = this.aboutmeData.image;
    } else {
      const imageBlob = await this.apiService.getImage(this.aboutmeData.image);
      this.fileUrl = URL.createObjectURL(imageBlob);
    }
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
    const submitData = this.productForm.value;
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    await this.apiService.updateAboutme(token, this.aboutmeData.id, submitData);
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('id', this.aboutmeData.id);
      formData.append('type', 'aboutme');
      await this.apiService.uploadImage(formData);
    }
  }
}
