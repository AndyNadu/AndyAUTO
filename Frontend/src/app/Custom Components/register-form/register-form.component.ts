import { Component } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// primeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// services
import { LoginService } from '../../Frontend Services/Login/login.service';


import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

    CheckboxModule,
    InputTextModule,

    HttpClientModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  _loginService: LoginService;
  http: HttpClient;

  constructor(_loginService: LoginService, http: HttpClient) {
    this._loginService = _loginService;
    this.http = http;
  }

  submitAttempted: boolean = false;
  passwordsMatch: boolean = true;
  emailAlreadyUsed: boolean = false;
  passwordConfirmation: string = '';
  user = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: '',
  }


  showLoginForm(): void {
    this._loginService.setActiveComponentToLogin();
  }
  registerAccount(): void {
    if (this.checkForEmptyInputs()) 
      if (this.checkIfPasswordsMatch()) 
        if (!this.checkIfEmailUsed())
          this.postUserInDB();
  }
  checkForEmptyInputs(): boolean {
    this.submitAttempted = true;

    if (this.user.firstName == '')
      return false;
    if (this.user.lastName == '')
      return false;
    if (this.user.password == '')
      return false;
    if (this.user.email == '')
      return false;
    if (this.user.phoneNumber == '')
      return false;
    if (this.passwordConfirmation == '')
      return false;

    return true;
  }
  checkIfPasswordsMatch(): boolean {
    if (this.user.password == this.passwordConfirmation)
      return true;
    return false;
    }
  checkIfEmailUsed(): boolean {
    this.http.get('http://localhost:5113/account/getUserByEmail?email=' + this.user.email)
      .subscribe(
        (res: object) => {
          console.log(res);
          if (res) 
            this.emailAlreadyUsed = true;
          else 
            this.emailAlreadyUsed = false;
        },
        (err: any) => {
          console.log(err)
        }
    );

    console.log(this.emailAlreadyUsed);
  }
  postUserInDB(): void {
    this.http.post('http://localhost:5113/account/register', this.user)
      .subscribe(
        (res: any) => {
          console.log("reusita frt");
        },
        (err: any) => console.log(err)
      );
  }
}
