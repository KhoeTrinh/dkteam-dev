import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class Logged implements CanActivate {
  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const tokenCheckResult = await this.apiService.checkToken()
    if (!tokenCheckResult.status) {
      return this.router.createUrlTree(['']);
    } else {
      return true;
    }
  }
}
