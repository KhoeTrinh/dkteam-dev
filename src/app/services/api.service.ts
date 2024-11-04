import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl: string = 'http://localhost:3001';
  constructor(private http: HttpClient) {}

  async signup(data: any) {
    const res = await lastValueFrom(
      this.http.post(`${this.apiUrl}/users/signup`, data)
    );
    return res
  }
}
