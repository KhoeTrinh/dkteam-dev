import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  user: boolean = false;
  getUser() {
    return this.user;
  }

  setUser(user: boolean) {
    this.user = user;
  }
}
