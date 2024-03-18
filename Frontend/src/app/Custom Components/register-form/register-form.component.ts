import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
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
  emptyFields: boolean = false;
  passwordsDontMatch: boolean = false;
  emailAlreadyUsed: boolean = false;
  phoneNumberAlreadyUsed: boolean = false;

  constructor(private _componentInteractionService: ComponentInteractionService,
              private _userService: UserService,
              private _formBuilder: FormBuilder,
              private _http: HttpClient,
              private _router: Router) {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  register(): void {
    this.clearErrors();

    switch (this.formValid(this.registerForm)) {
      case 'empty fields':
        this.emptyFields = true;
        break;
      case 'passwords dont match':
        this.passwordsDontMatch = true;
        break;
      case 'valid':
        const result: string = this.tryHttpRequest(this.registerForm);

        switch (result) {
          case 'email already used':
            this.emailAlreadyUsed = true; 
            break;
          case 'phone number already used':
            this.phoneNumberAlreadyUsed = true;
            break;
          case 'successfully registered':
            this._router.navigateByUrl('/account/login');
            break;
          default:
            console.log('something bad happened');
            break;
        }
        break;
      default:
        console.log('something bad happened');
        break;
    }
  }
  clearErrors(): void {
    this.emptyFields = false;
    this.passwordsDontMatch = false;
    this.emailAlreadyUsed = false;
    this.phoneNumberAlreadyUsed = false;
  }
  formValid(_form: FormGroup): string {
    if (this._userService.markAsDirty(_form))
      return 'empty fields';

    if (!this.passwordsMatch(_form))
      return 'passwords dont match';

    return 'valid';
  }
  passwordsMatch(_form: FormGroup): boolean {
    return _form.get('password')!.value == _form.get('passwordConfirmation') ? true : false;
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
}