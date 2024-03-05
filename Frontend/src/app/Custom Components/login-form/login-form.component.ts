// angular
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
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // methods
  setForm(): void {
    this._componentInteractionService.setForm('register');
  }

  login(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control!.markAsDirty();
    });

    if (this.loginForm.valid) {
      const user: LoginPostUserDTO = {
        email: String(this.loginForm.get('email')!.value),
        password: String(this.loginForm.get('password')!.value)
      };

      this.http.post <LoginResponseUserDTO>('http://localhost:5113/account/login', user)
        .subscribe(
          (res: LoginResponseUserDTO) => {
            sessionStorage.setItem('userId', JSON.stringify(res.id));
            sessionStorage.setItem('userEmail', res.email);
            sessionStorage.setItem('userPassword', res.password);

            this._componentInteractionService.setAfterAuthenticateText('Successfully logged in');
            this._componentInteractionService.setForm('logged-in');
          },
          (err: HttpErrorResponse) => {
            this.invalidCredentials = true;
            console.log(err);
          }
        );
    }
  }

}
