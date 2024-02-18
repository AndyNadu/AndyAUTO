import { Component } from '@angular/core';

// custom components
import { LoginFormComponent } from '../../Custom Components/login-form/login-form.component';
import { RegisterFormComponent } from '../../Custom Components/register-form/register-form.component';

// services
import { LoginService } from '../../Frontend Services/Login/login.service';

@Component({    
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  _loginService: LoginService;

  constructor(_loginService: LoginService) {
    this._loginService = _loginService;
  }

  getActiveComponent(): string {
    return this._loginService.getActiveComponent();
  }
}
