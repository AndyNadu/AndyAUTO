import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private activeComponent: string = 'login';

  setActiveComponentToLogin(): void {
    this.activeComponent = 'login';
  }

  setActiveComponentToRegister(): void {
    this.activeComponent = 'register';
  }

  getActiveComponent(): string {
    return this.activeComponent;
  }
}
