import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserDTO } from '../../Data Transfer Objects (DTOs)/UserDTO';
import { ErrorConstants } from '../../Constants/Text Contants/Error-constants';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  registerForm: FormGroup;
  errorConstants: ErrorConstants = new ErrorConstants();
  error: string = '';
  registerLoading: boolean = false;

  constructor(private _componentInteractionService: ComponentInteractionService,
              private _formBuilder: FormBuilder,
              private _http: HttpClient,
              private _router: Router) {
    this.registerForm = this._formBuilder.group({
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\d{4}\\s?\\d{3}\\s?\\d{3}|\\d{10})$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register(): void {
    this.error = this.markAsDirty();

    if (!this.error) {
      this.registerLoading = true;
      this.tryHttpRequest();
    }
  }
  markAsDirty(): string {
    let error: string = '';

    Object.keys(this.registerForm.controls).forEach(key => {
      const control: AbstractControl | null = this.registerForm.get(key);

      if (control?.hasError('required')) {
        error = this.errorConstants.emptyFields;
        control.markAsDirty();
      } else if (key === 'email' && control?.hasError('email') && error == '') {
        error = this.errorConstants.emailInvalid;
        control.markAsDirty();
      } else if (key === 'phoneNumber' && control?.hasError('pattern') && error == '') {
        error = this.errorConstants.phoneInvalid;
        control.markAsDirty();
      } else if ((key === 'password' || key === 'passwordConfirmation') && this.registerForm.get('password')!.value != this.registerForm.get('passwordConfirmation')!.value && error == '') {
        console.log(error);
          error = this.errorConstants.passwordsMissmatch;
          this.registerForm.get('password')!.markAsDirty();
          this.registerForm.get('passwordConfirmation')!.markAsDirty();
      } else if ((key === 'password' || key === 'passwordConfirmation') && control?.hasError('minlength') && error == '') {
        error = this.errorConstants.passwordTooShort;
        control.markAsDirty();
      }
    });

    return error;
  }
  tryHttpRequest(): void {
    const userDTO: UserDTO = this.buildUserDTO();

    this._http.post<UserDTO>('http://localhost:5113/account/register', userDTO)
    .subscribe({
      next: (userDTO: UserDTO) => {
        this._componentInteractionService.setSuccessfullyRegistered(this.errorConstants.successfullyRegistered);
        
        setTimeout( () => {
          this.registerLoading = false;
          this._router.navigateByUrl('/account/login');
        }, 1000)

        setTimeout( () => {
          this._componentInteractionService.setSuccessfullyRegistered('');
        }, 10000)
      },
      error: (error: HttpErrorResponse) => {
        setTimeout( () => {
          this.error = error.status === 0 ? this.errorConstants.unexpectedError : error.error;
          this.registerLoading = false;
        }, 1000)
      }});
  }
  buildUserDTO(): UserDTO {
    return  {
      firstName: String(this.registerForm.get('firstName')!.value),
      lastName: String(this.registerForm.get('lastName')!.value),
      email: String(this.registerForm.get('email')!.value),
      phoneNumber: String(this.registerForm.get('phoneNumber')!.value),
      password: String(this.registerForm.get('password')!.value),
    }
  }
}
