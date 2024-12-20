import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { RoleService } from './role.service';
import { UserService } from './user.service';
import { UserDataService } from './userData.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'http://localhost:3001';
  constructor(
    private http: HttpClient,
    private roleService: RoleService,
    private userService: UserService,
    private userDataService: UserDataService
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

  getAllUsers(token: string) {
    return lastValueFrom(
      this.http.get(`${this.apiUrl}/users/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  getUserById(token: string, id: string) {
    return lastValueFrom(
      this.http.get(`${this.apiUrl}/users/${id}/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  async updateUser(data: any, token: string) {
    const res = await this.checkToken();
    return lastValueFrom(
      this.http.put(`${this.apiUrl}/users/${res.message.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  updateUserAdmin(data: any, token: string, id: string) {
    return lastValueFrom(
      this.http.put(`${this.apiUrl}/users/${id}/admin`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  getImage(path: string): Promise<Blob> {
    return lastValueFrom(
      this.http.post(
        `${this.apiUrl}/github-image/get`,
        { path: path },
        { responseType: 'blob' }
      )
    );
  }

  uploadImage(formdata: FormData) {
    return lastValueFrom(
      this.http.post(`${this.apiUrl}/github-image`, formdata)
    );
  }

  async createAboutme(data: any, token: string) {
    const res = await this.checkToken();
    return lastValueFrom(
      this.http.post(
        `${this.apiUrl}/aboutme`,
        { ...data, author: res.message.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    );
  }

  getAboutme(token: string, id: string) {
    return lastValueFrom(
      this.http.get(`${this.apiUrl}/aboutme/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  createProduct(data: any, token: string) {
    return lastValueFrom(
      this.http.post(`${this.apiUrl}/products`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  updateAboutme(token: string, id: string, data: any) {
    return lastValueFrom(
      this.http.put(`${this.apiUrl}/aboutme/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  getProducts(token: string) {
    return lastValueFrom(
      this.http.get(`${this.apiUrl}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  getProductById(token: string, id: string) {
    return lastValueFrom(
      this.http.get(`${this.apiUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  updateProduct(token: string, id: string, data: any) {
    return lastValueFrom(
      this.http.put(`${this.apiUrl}/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  }

  createComment(token: string, data: any) {
    return lastValueFrom(
      this.http.post(`${this.apiUrl}/comments`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    )
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
    this.userDataService.setData(res.message);
    return { status: true, message: res.message };
  }

  tokenExpired() {
    this.roleService.setRole({ isDev: false, isAdmin: false });
    this.userService.setUser(false);
    localStorage.removeItem('authToken');
  }
}
