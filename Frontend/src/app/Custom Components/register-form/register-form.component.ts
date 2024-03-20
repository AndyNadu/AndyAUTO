import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserDTO } from '../../Data Transfer Objects (DTOs)/UserDTO';

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
  error: string = '';

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

    Object.keys(this.registerForm.controls).forEach(key => {
      const control: AbstractControl | null = this.registerForm.get(key);

      if (control?.hasError('required')) {
        error = 'All fields are mandatory!';
        control.markAsDirty();
      } else if (key === 'email' && control?.hasError('email') && error == '') {
        error = 'Email format not supported!';
        control.markAsDirty();
      } else if (key === 'phoneNumber' && control?.hasError('pattern') && error == '') {
        error = 'Phone number format not supported!';
        control.markAsDirty();
      } else if ((key === 'password' || key === 'passwordConfirmation') && this.registerForm.get('password')!.value != this.registerForm.get('passwordConfirmation')!.value && error == '') {
        console.log(error);
          error = `Passwords don't match`;
          this.registerForm.get('password')!.markAsDirty();
          this.registerForm.get('passwordConfirmation')!.markAsDirty();
      } else if ((key === 'password' || key === 'passwordConfirmation') && control?.hasError('minlength') && error == '') {
        error = 'Password should have at least 8 characters!';
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
        if (userDTO.FirstName != undefined)
          console.log(userDTO.FirstName);
        //this._componentInteractionService.setSuccessfullyRegistered('You have successfully registered your account. Please sign in!');
        // setTimeout( () => {
        //   this._componentInteractionService.setSuccessfullyRegistered('');
        // }, 10000)

        //this._router.navigateByUrl('/account/login');
      },
      error: (error: HttpErrorResponse) => {
        this.error = error.error;
      },
      complete: () => {
        console.log('complete');
      }
    })
  }
  buildUserDTO(): UserDTO {
    return  {
      FirstName: String(this.registerForm.get('firstName')!.value),
      LastName: String(this.registerForm.get('lastName')!.value),
      Email: String(this.registerForm.get('email')!.value),
      PhoneNumber: String(this.registerForm.get('phoneNumber')!.value),
      Password: String(this.registerForm.get('password')!.value),
    }
  }
}
