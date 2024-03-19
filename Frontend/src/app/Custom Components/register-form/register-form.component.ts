import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { UserDTO } from '../../Data Transfer Objects (DTOs)/UserDTO';
import { UserService } from '../../Services/UserService/user.service';

@Component({
  selector: 'app-register-form',
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
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  registerForm: FormGroup;
  error: string = '';

  constructor(private _componentInteractionService: ComponentInteractionService,
              private _userService: UserService,
              private _formBuilder: FormBuilder,
              private _http: HttpClient,
              private _router: Router) {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(?:\\d{4}\\s?\\d{3}\\s?\\d{3}|\\d{10})$')]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  register(): void {
    this.error = '';    
    this.error = this.isFormValid(this.registerForm);

    const result: string = this.error != '' ? 'error' : this.tryHttpRequest(this.registerForm);
  }
  isFormValid(_form: FormGroup): string {
    const error: string = this.markAsDirty(_form);
    
    if (error != '')
      return error;

    if (!this.passwordsMatch(_form))
      return `Passwords don't match!`;

    return '';
  }
  passwordsMatch(_form: FormGroup): boolean {
    return _form.get('password')!.value == _form.get('passwordConfirmation')!.value ? true : false;
  }
  tryHttpRequest(_form: FormGroup): string {
    const userDTO: UserDTO = this.buildUserDTO(_form);

    this._http.post<UserDTO>('http://localhost:5113/account/register', userDTO)
    .subscribe({
      next: (result: UserDTO) => {
        console.log('succes');
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
      complete: () => {
        console.log('complete');
      }
    })

    return 'successfully registered';
  }
  buildUserDTO(_form: FormGroup): UserDTO {
    return  {
      firstName: String(this.registerForm.get('firstName')!.value),
      lastName: String(this.registerForm.get('lastName')!.value),
      email: String(this.registerForm.get('email')!.value),
      phoneNumber: String(this.registerForm.get('phoneNumber')!.value),
      password: String(this.registerForm.get('password')!.value),
    }
  }
  markAsDirty(_form: FormGroup): string {
    let dirtyFields: string = '';

    Object.keys(_form.controls).forEach(key => {
      const control: AbstractControl | null = _form.get(key);

      if (control?.hasError('required')) {
        dirtyFields = 'All fields are mandatory!';
        control.markAsDirty();
      } else if (key === 'email' && control?.hasError('email') && dirtyFields == '') {
        dirtyFields = 'Email format not supported!';
        control.markAsDirty();
      } else if (key === 'phoneNumber' && control?.hasError('pattern') && dirtyFields == '') {
        dirtyFields = 'Phone number format not supported!';
        control.markAsDirty();
      }
    });

    return dirtyFields;
  }
}
