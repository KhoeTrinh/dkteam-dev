import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css',
})
export class UserAdminComponent {
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  bgClass2: string =
    'bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-300 via-rose-50 to-teal-50';
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/search-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/trash-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/check-svgrepo-com.svg';
  imgSrc7: string =
    'assets/svg/reset-reload-refresh-sync-arrow-update-svgrepo-com.svg';
  modifiedUser: Record<
    number,
    { prevUI: string; imagePath: string; bgClass: string }
  > = {};
  userArray: any[] = [];
  idArray: any[] = [];
  dynamicForm: FormGroup;
  @ViewChild('input') inputElement!: ElementRef;

  constructor(private apiService: ApiService, private fb: FormBuilder) {
    this.dynamicForm = this.fb.group({});
  }

  async addUser(input: HTMLInputElement) {
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const isDulicate = this.userArray?.some((user) => user.id === input.value);
    if (isDulicate) {
      alert('User already exists');
      return;
    }
    const res: any = await this.apiService.getUserById(token, input.value);
    this.userArray.push(res.message);
    this.idArray.push(input.value);
    const userGroup = new FormGroup({
      username: new FormControl(res.message.username),
      isDev: new FormControl(res.message.isDev),
      isAdmin: new FormControl(res.message.isAdmin),
      imagePath: new FormControl(res.message.imagePath),
    });
    this.dynamicForm.addControl(input.value, userGroup);
    input.value = '';
  }

  toggleDev(user: any) {
    user.isDev = !user.isDev;
    const userForm = this.dynamicForm.get(user.id.toString());
    if (userForm) {
      userForm.get('isDev')?.setValue(user.isDev);
    }
  }

  toggleAdmin(user: any) {
    user.isAdmin = !user.isAdmin;
    const userForm = this.dynamicForm.get(user.id.toString());
    if (userForm) {
      userForm.get('isAdmin')?.setValue(user.isAdmin);
    }
  }

  resetUserImage(user: any) {
    const userForm = this.dynamicForm.get(user.id.toString());
    if (userForm) {
      if (this.modifiedUser[user.id]) {
        userForm.get('imagePath')?.setValue(this.modifiedUser[user.id].prevUI);
        delete this.modifiedUser[user.id];
      } else {
        this.modifiedUser[user.id] = {
          prevUI: user.imagePath,
          imagePath: this.imgSrc3,
          bgClass: 'bg-red-500',
        };
        userForm
          .get('imagePath')
          ?.setValue(this.modifiedUser[user.id].imagePath);
      }
    }
  }

  getBgClass(user: any) {
    return this.modifiedUser[user.id]?.bgClass || null;
  }

  async onSubmit() {
    const token = JSON.parse(localStorage.getItem('authToken') || '""');
    const id = this.idArray.join(',');
    const formValue = this.dynamicForm.value;
    const submitData: { [key: string]: any } = {};
    Object.keys(formValue).forEach((key) => {
      const userData = formValue[key];
      submitData[key] = {
        username: userData.username,
        isDev: userData.isDev,
        isAdmin: userData.isAdmin,
        userImage: userData.imagePath,
      };
    });
    await this.apiService.updateUserAdmin(submitData, token, id)
  }
}
