import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { ApiService } from '../../../services/api.service';

interface ProductForm {
  link: FormControl<string | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  author: FormControl<{ id: string }[] | null>;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductEditComponent implements OnInit {
  imgSrc: string = 'assets/svg/file-pencil-alt-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc3: string = 'assets/svg/plus-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/trash-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  authorArray: string[] = [];
  fileName: string | null = 'No file chosen';
  fileUrl: string = '';
  selectedFile: File | null = null;
  productId: string = '';
  productForm: FormGroup<ProductForm>;
  productsDataById: any = {};
  hoveredIndex: number | null = null;

  @ViewChild('a') authorInput!: ElementRef;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.productForm = new FormGroup<ProductForm>({
      link: new FormControl<string | null>(null),
      title: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      author: new FormControl<{ id: string }[] | null>(null),
    });
  }

  async ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const res: any = await this.apiService.getProductById(
      token,
      this.productId
    );
    this.productsDataById = res.message;
    this.authorArray = this.productsDataById.author.map(
      (au: { authorProd: { id: any } }) => au.authorProd.id
    );

    this.fileName = this.productsDataById.imagePath;
    if (
      this.productsDataById.imagePath === 'assets/svg/gear-10-svgrepo-com.svg'
    ) {
      this.fileUrl = this.productsDataById.imagePath;
    } else {
      const imageBlob = await this.apiService.getImage(
        this.productsDataById.imagePath
      );
      this.fileUrl = URL.createObjectURL(imageBlob);
    }
    this.productForm.get('link')?.setValue(this.productsDataById.link);
    this.productForm.get('title')?.setValue(this.productsDataById.title);
    this.productForm
      .get('description')
      ?.setValue(this.productsDataById.description);
    const transformAuthors = this.authorArray.map((id) => ({ id }));
    this.productForm.get('author')?.setValue(transformAuthors);
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

  addAuthor(a: HTMLInputElement) {
    const author = a.value.trim();
    if (author) {
      this.authorArray.push(author);
      const transformAuthors = this.authorArray.map((id) => ({ id }));
      this.productForm.get('author')?.setValue(transformAuthors);
      a.value = '';
      this.authorInput.nativeElement.focus();
    }
  }

  async onSubmit() {
    const formValue = this.productForm.value;
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const transformAuthors = this.authorArray.map((id) => ({ id }));
    formValue.author = transformAuthors;
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      formData.append('id', this.productsDataById.id);
      formData.append('type', 'product');
      await this.apiService.uploadImage(formData)
    }
    this.apiService.updateProduct(token, this.productsDataById.id, formValue);
  }

  OnHover(index: number | null) {
    if (index === null) {
      this.hoveredIndex = null;
      return;
    }
    this.hoveredIndex = index;
  }

  DeleteAuthor(index: number) {
    this.authorArray.splice(index, 1);
    const transformAuthors = this.authorArray.map((id) => ({ id }));
    this.productForm.get('author')?.setValue(transformAuthors);
  }
}
