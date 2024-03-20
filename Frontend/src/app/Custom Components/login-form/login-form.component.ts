import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { UserDTO } from '../../Data Transfer Objects (DTOs)/UserDTO';
import { ErrorConstants } from '../../Constants/Text Contants/Error-constants';

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
  errorConstants: ErrorConstants = new ErrorConstants();
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
    this.error = this.markAsDirty();

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
        error = this.errorConstants.emptyFields;
        control.markAsDirty();
      } else if (key === 'email' && control?.hasError('email') && error == '') {
        error = this.errorConstants.emailInvalid;
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
          localStorage.setItem('userId', JSON.stringify(result.id));
          localStorage.setItem('role', JSON.stringify(result.role));
        }
        else {
          sessionStorage.setItem('userId', JSON.stringify(result.id));
          sessionStorage.setItem('role', JSON.stringify(result.role));
        }

        this._router.navigateByUrl('');
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error;
      }
    })
  }
  buildUserDTO(): UserDTO {
    return {
      email: String(this.loginForm.get('email')!.value),
      password: String(this.loginForm.get('password')!.value),
    }
  }
}
