import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class IsLoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private isLoadingCounter = 0;
  private minimumLoadingTime = 480;
  private lastSetToTrueTime: number | null = null;

  isLoading$ = this.isLoadingSubject.asObservable();

  startLoading() {
    this.isLoadingCounter++;
    if (this.isLoadingCounter === 1) {
      this.lastSetToTrueTime = Date.now();
      this.setIsLoading(true);
    }
  }

  stopLoading() {
    if (this.isLoadingCounter > 0) this.isLoadingCounter--;

    if (this.isLoadingCounter === 0) {
      const elapsed = Date.now() - (this.lastSetToTrueTime || 0);
      const remainingTime = this.minimumLoadingTime - elapsed;

      if (remainingTime > 0) {
        setTimeout(() => this.setIsLoading(false), remainingTime);
      } else {
        this.setIsLoading(false);
      }
    }
  }

  private setIsLoading(isLoading: boolean) {
    if (this.isLoadingSubject.getValue() !== isLoading) {
      this.isLoadingSubject.next(isLoading);
    }
  }
  getIsLoading(): boolean {
    return this.isLoadingSubject.getValue();
  }
}
