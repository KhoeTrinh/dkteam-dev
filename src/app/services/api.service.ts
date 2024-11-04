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
  check(token: string) {
    return lastValueFrom(
      this.http.get(`${this.apiUrl}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  signup(data: any) {
    return lastValueFrom(this.http.post(`${this.apiUrl}/users/signup`, data));
  }

  signin(data: any) {
    return lastValueFrom(this.http.post(`${this.apiUrl}/users/login`, data));
  }

  async signout(token: string) {
    await lastValueFrom(
      this.http.post(
        `${this.apiUrl}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
    this.roleService.setRole({ isDev: false, isAdmin: false });
    this.userService.setUser(false);
  }

  async updateUser(data: any, token: string) {
    const res = await this.checkToken()
    console.log(res);
    return lastValueFrom(
      this.http.put(`${this.apiUrl}/users/${res.message.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
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
    this.aboutmeService.setAboutme(res.message.aboutme);
    return { status: true, message: res.message };
  }

  tokenExpired() {
    this.roleService.setRole({ isDev: false, isAdmin: false });
    this.userService.setUser(false);
  }
}
