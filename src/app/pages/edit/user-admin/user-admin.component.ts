import { NgOptimizedImage } from '@angular/common';
import { Component, DoCheck, ElementRef, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './user-admin.component.html',
  styleUrl: './user-admin.component.css',
})
export class UserAdminComponent implements DoCheck {
  bgClass: string = 'bg-gradient-to-r from-slate-900 to-slate-700';
  bgClass2: string =
    'bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-300 via-rose-50 to-teal-50';
  imgSrc: string = 'assets/png/logo-no-background.png';
  imgSrc2: string = 'assets/svg/arrow-narrow-right-svgrepo-com-black.svg';
  imgSrc3: string = 'assets/svg/user-svgrepo-com.svg';
  imgSrc4: string = 'assets/svg/search-svgrepo-com.svg';
  imgSrc5: string = 'assets/svg/trash-svgrepo-com.svg';
  imgSrc6: string = 'assets/svg/check-svgrepo-com.svg';
  imgSrc7: string = 'assets/svg/reset-reload-refresh-sync-arrow-update-svgrepo-com.svg'
  modifiedUser: Record<number, { prevUI: string, userImage: string; bgClass: string}> = {}
  ngDoCheck(): void {
    console.log(this.userArray);
  }
  userArray: any[] = [
    {
      id: 5,
      username: 'khoa',
      email: 'khoa@example.com',
      userImage: this.imgSrc2,
      isDev: true,
      isAdmin: true,
      authorProd: [
        {
          author: {
            id: 9,
            title: 'khoa product',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 10,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 10,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
        {
          author: {
            id: 10,
            title: 'khoa product 2',
            productImage: this.imgSrc4,
          },
        },
      ],
      aboutme: {
        title: 'khoa',
        description: 'khoa is a great',
        image: this.imgSrc2,
      },
    },
  ];

  user: any = {
    id: 6,
    username: 'khoa',
    email: 'khoa@example.com',
    userImage: this.imgSrc2,
    authorProd: [
      {
        author: {
          id: 9,
          title: 'khoa product',
          productImage: this.imgSrc4,
        },
      },
      {
        author: {
          id: 10,
          title: 'khoa product 2',
          productImage: this.imgSrc4,
        },
      },
      {
        author: {
          id: 10,
          title: 'khoa product 2',
          productImage: this.imgSrc4,
        },
      },
      {
        author: {
          id: 10,
          title: 'khoa product 2',
          productImage: this.imgSrc4,
        },
      },
    ],
    aboutme: {
      title: 'khoa',
      description: 'khoa is a great',
      image: this.imgSrc2,
    },
  };

  @ViewChild('input') inputElement!: ElementRef;

  addUser() {
    const inputValue = this.inputElement.nativeElement.value;
    const isDuplicate = this.userArray.some((eU) => eU.id === this.user.id);
    if (isDuplicate) {
      alert('User already exists');
      return;
    }
    this.userArray.push(this.user);
  }

  toggleDev(user: any) {
    user.isDev = !user.isDev;
  }

  toggleAdmin(user: any) {
    user.isAdmin =!user.isAdmin;
  }

  resetUserImage(user: any) {
    if(this.modifiedUser[user.id]) {
      user.userImage = this.modifiedUser[user.id].prevUI;
      delete this.modifiedUser[user.id]
    } else {
      this.modifiedUser[user.id] = {
        prevUI: user.userImage,
        userImage: this.imgSrc3,
        bgClass: 'bg-red-500',
      }
      user.userImage = this.modifiedUser[user.id].userImage
    }
  }

  getBgClass(user: any) {
    return this.modifiedUser[user.id]?.bgClass || null;
  }
}
