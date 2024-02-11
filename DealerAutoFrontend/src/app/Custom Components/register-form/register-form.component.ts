import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// primeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// services
import { LoginService } from '../../Frontend Services/Login/login.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  _loginService: LoginService;

  constructor(_loginService: LoginService) {
    this._loginService = _loginService;
  }

  showLoginForm(): void {
    this._loginService.setActiveComponentToLogin();
  }

}
