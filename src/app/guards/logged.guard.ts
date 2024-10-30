import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class Logged implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.userService.getUser()) {
      return true;
    } else {
      return this.router.createUrlTree(['']);
    }
  }
}
