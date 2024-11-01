import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface ProductForm {
  link: FormControl<string | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  author: FormControl<string[] | null>;
}

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  imgSrc: string = 'assets/svg/plus-svgrepo-com.svg';
  imgSrc2: string = 'assets/svg/trash-svgrepo-com.svg';
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  authorArray: Array<string> = [];
  productForm: FormGroup<ProductForm>;
  hoveredIndex: number | null = null;

  constructor() {
    this.productForm = new FormGroup<ProductForm>({
      link: new FormControl<string | null>(null),
      title: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
      author: new FormControl<string[] | null>(this.authorArray),
    });
  }

  @ViewChild('a') authorInput!: ElementRef;

  addAuthor(a: HTMLInputElement) {
    const author = a.value.trim();
    if (author) {
      this.authorArray.push(author);
      this.productForm.get('author')?.setValue(this.authorArray);
      a.value = '';
      this.authorInput.nativeElement.focus();
    }
  }

  DeleteAuthor(index: number) {
    this.authorArray.splice(index, 1);
    this.productForm.get('author')?.setValue(this.authorArray);
    this.hoveredIndex = null
  }

  OnHover(index: number | null) {
    if (index === null) {
      this.hoveredIndex = null;
      return;
    }
    this.hoveredIndex = index;
  }

  onSubmit() {
    const formValue = this.productForm.value;
    let submitData;
    submitData = {
      link: formValue.link,
      title: formValue.title,
      description: formValue.description,
      author: formValue.author?.map((id: string) => ({ id })),
    };
  }
}
