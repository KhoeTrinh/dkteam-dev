import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private userSubject  = new BehaviorSubject<any>({})
  user$ = this.userSubject.asObservable();
  getData() {
    return this.userSubject.value;
  }

  setData(data: any) {
    this.userSubject.next(data);
  }
}
