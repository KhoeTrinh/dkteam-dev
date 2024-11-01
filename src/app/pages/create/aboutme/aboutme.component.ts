import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface ProductForm {
  title: FormControl<string | null>;
  description: FormControl<string | null>;
}

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  productForm: FormGroup<ProductForm>;

  constructor() {
    this.productForm = new FormGroup<ProductForm>({
      title: new FormControl<string | null>(null),
      description: new FormControl<string | null>(null),
    });
  }

  onSubmit() {
    const formValue = this.productForm.value;
    let submitData;
    submitData = {
      title: formValue.title,
      description: formValue.description,
    };
    console.log(submitData);
  }
}
