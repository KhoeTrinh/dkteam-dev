import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';

interface ProductForm {
  link: FormControl<string | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  image: FormControl<string | null>;
  author: FormControl<string[] | null>;
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
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  authorArray: Array<string> = [];
  fileName: string | null = 'No file chosen';
  productId: string = '';
  productForm: FormGroup<ProductForm>;

  @ViewChild('a') authorInput!: ElementRef;

  constructor(private route: ActivatedRoute) {
    this.authorArray = this.productsDataById.author.map(
      (au) => au.authorProd.id
    );
    this.fileName = this.productsDataById.image;
    this.productForm = new FormGroup<ProductForm>({
      link: new FormControl<string | null>(this.productsDataById.link),
      title: new FormControl<string | null>(this.productsDataById.title),
      description: new FormControl<string | null>(
        this.productsDataById.description
      ),
      image: new FormControl<string | null>(this.fileName),
      author: new FormControl<string[] | null>(this.authorArray),
    });
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.productForm.get('image')?.setValue(file.name);
    }
  }

  addAuthor(a: HTMLInputElement) {
    const author = a.value.trim();
    if (author) {
      this.authorArray.push(author);
      this.productForm.get('author')?.setValue(this.authorArray);
      a.value = '';
      this.authorInput.nativeElement.focus();
    }
  }

  onSubmit() {
    const formValue = this.productForm.value;
    let submitData
    if(formValue.image === this.productsDataById.image) {
      submitData = {
        link: formValue.link,
        title: formValue.title,
        description: formValue.description,
        author: formValue.author?.map((id: string) => ({ id })),
      };
    } else {
      submitData = {
        image: formValue.image,
      };
    }

    console.log('Form Submitted:', submitData);
  }

  productsDataById = {
    id: '0c548a0a-4914-42f8-a5d0-887ba5f70f',
    link: 'https://www.youtube.com/watch?v=T9ABgBIYS1g',
    title: 'File Sharing',
    description: 'A product created primarily for file sharing',
    publishDate: '2024-10-10T01:37:55.866Z',
    image: this.imgSrc,
    author: [
      {
        authorProd: {
          userImage: this.imgSrc2,
          username: 'Khoa',
          id: '1',
        },
      },
      {
        authorProd: {
          userImage: this.imgSrc2,
          username: 'Khoa',
          id: '2',
        },
      },
      {
        authorProd: {
          userImage: this.imgSrc2,
          username: 'Khoa',
          id: '3',
        },
      },
      {
        authorProd: {
          userImage: this.imgSrc2,
          username: 'Khoa',
          id: '4',
        },
      },
    ],
    comment: [
      {
        id: 'f5d9ee62-2174b65-b1f3-0f30f1be',
        description: 'I love it',
        author: {
          username: 'Khoa',
          userImage: this.imgSrc2,
        },
      },
      {
        id: 'f5d9ee62-217b65-b1f2840f30f1be',
        description: 'I love it',
        author: {
          username: 'Khoa',
          userImage: this.imgSrc2,
        },
      },
    ],
  };
}
