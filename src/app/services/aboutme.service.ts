import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class AboutmeService {
  aboutme: any
  getAboutme() {
    return this.aboutme;
  }
  setAboutme(aboutme: any) {
    this.aboutme = aboutme;
  }
}
