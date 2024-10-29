import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  role: any
  setRole(role: any) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
