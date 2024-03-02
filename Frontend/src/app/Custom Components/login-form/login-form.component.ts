// angular
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

// primeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// models && DTOs && constants
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

  // variables
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
  switchForm(activeComponent?: string): void {
    const targetComponent = activeComponent || 'register';
    this._componentInteractionService.setActiveComponent(targetComponent);
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

            this._componentInteractionService.setSubmitText('Successfully logged in');
            this.switchForm('logged-in');
          },
          (err: HttpErrorResponse) => {
            this.invalidCredentials = true;
            console.log(err);
          }
        );
    }
  }
}
