// angular
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

// primeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';

// interfaces && constants && data objects
import { LoginPostUserDTO } from '../../Data Transfer Objects/LoginPostUserDTO';
import { LoginResponseUserDTO } from '../../Data Transfer Objects/LoginResponseUserDTO';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    CheckboxModule,
    InputTextModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  // members
  loginForm: FormGroup;
  invalidCredentials: boolean = false;

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService,
              private _formBuilder: FormBuilder,
              private _http: HttpClient,
              private _router: Router) {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  // methods
  checkIfSuccessfullyRegistered(): boolean {
    return this._componentInteractionService.checkIfSuccessfullyRegistered();
  }
  login(): void {
    const remMe: boolean = this.loginForm.get('rememberMe')!.value;

    if (remMe != false)
    console.log('winwin');

    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control!.markAsDirty();
    });

    if (this.loginForm.valid) {
      const user: LoginPostUserDTO = {
        email: String(this.loginForm.get('email')!.value),
        password: String(this.loginForm.get('password')!.value)
      };

      this._http.post <LoginResponseUserDTO>('http://localhost:5113/account/login', user)
        .subscribe(
          (_user: LoginResponseUserDTO) => {
            if (this.loginForm.get('rememberMe')!.value) {
              localStorage.setItem('loggedIn', 'true');
              localStorage.setItem('userId', JSON.stringify(_user.id));
              localStorage.setItem('userFirstName', _user.firstName);
            }
            else {
              sessionStorage.setItem('loggedIn', 'true');
              sessionStorage.setItem('userId', JSON.stringify(_user.id));
              sessionStorage.setItem('userFirstName', _user.firstName);
            }
            
            this._router.navigateByUrl('');
          },
          (err: HttpErrorResponse) => {
            this.invalidCredentials = true;
            console.log(err);
          }
        );
    }
  }

}
