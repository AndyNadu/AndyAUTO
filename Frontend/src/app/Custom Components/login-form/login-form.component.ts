import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { LoginResponseUserDTO } from '../../Data Transfer Objects/LoginResponseUserDTO';
import { LoginPostUserDTO } from '../../Data Transfer Objects/LoginPostUserDTO';
import { UserDTO } from '../../Data Transfer Objects (DTOs)/UserDTO';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    InputTextModule,
    CheckboxModule,
    ButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  loginForm: FormGroup;
  error: string = '';

  constructor(private _componentInteractionService: ComponentInteractionService,
              private _formBuilder: FormBuilder,
              private _http: HttpClient,
              private _router: Router) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: false
    });
  }

  getSuccessfullyRegistered(): string {
    return this._componentInteractionService.getSuccessfullyRegistered();
  }
  login(): void {
    this.error = this.isFormValid();

    if (!this.error)
      this.tryHttpRequest();
  }
  isFormValid(): string {
    const error: string = this.markAsDirty();

    return error ? error : '';
  }
  markAsDirty(): string {
    let error: string = '';

    Object.keys(this.loginForm.controls).forEach(key => {
      const control: AbstractControl | null = this.loginForm.get(key);

      if (control?.hasError('required')) {
        error = 'All fields are mandatory!dwdw';
        control.markAsDirty();
      } else if (key === 'email' && control?.hasError('email') && error == '') {
        error = 'Email format not supported!';
        control.markAsDirty();
      }
    });

    return error;
  }
  tryHttpRequest(): void {
    const userDTO: UserDTO = this.buildUserDTO();

    this._http.post<UserDTO>('http://localhost:5113/account/login', userDTO)
    .subscribe({
      next: (result: UserDTO) => {
        if (this.loginForm.get('rememberMe')!.value) {
          localStorage.setItem('userId', JSON.stringify(result.Id));
          localStorage.setItem('role', JSON.stringify(result.Role));
        }
        else {
          sessionStorage.setItem('userId', JSON.stringify(result.Id));
          sessionStorage.setItem('role', JSON.stringify(result.Role));
        }

        this._router.navigateByUrl('');
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error;
      }
    })
  }
  buildUserDTO(): UserDTO {
    return  {
      Email: String(this.loginForm.get('email')!.value),
      Password: String(this.loginForm.get('password')!.value),
    }
  }
}
