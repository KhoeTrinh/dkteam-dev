import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { AboutmeService } from './aboutme.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'http://localhost:3001';
  constructor(
    private http: HttpClient,
    private roleService: RoleService,
    private userService: UserService,
    private aboutmeService: AboutmeService
  ) {}

  // Api
  async check(token: string) {
    const res = await lastValueFrom(
      this.http.get(`${this.apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
    return res;
  }

  async signup(data: any) {
    const res = await lastValueFrom(
      this.http.post(`${this.apiUrl}/users/signup`, data)
    );
    return res;
  }

  // Check
  async checkToken() {
    let token = localStorage.getItem('authToken') || '';
    if (!token || token === '""') {
      this.tokenExpired();
      return { status: false, message: null };
    }
    token = JSON.parse(token);
    const res: any = await this.check(token);
    this.roleService.setRole({
      isDev: res.message.isDev,
      isAdmin: res.message.isAdmin,
    });
    this.userService.setUser(true);
    console.log(this.userService.getUser());
    this.aboutmeService.setAboutme(res.message.aboutme);
    return { status: true, message: res.message };
  }

  tokenExpired() {
    this.roleService.setRole({ isDev: false, isAdmin: false });
    this.userService.setUser(false);
  }
}
