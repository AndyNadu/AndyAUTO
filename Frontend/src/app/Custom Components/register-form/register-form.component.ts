// angular
import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

// primeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';

// interfaces && constants && data objects
import { RegisterPostUserDTO } from '../../Data Transfer Objects/RegisterPostUserDTO';
import { RegisterResponseUserDTO } from '../../Data Transfer Objects/RegisterResponseUserDTO';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    RouterLink,
    ButtonModule,
    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  // members
  registerForm: FormGroup;
  emailAlreadyUsed: boolean = false;
  passwordsMatch: boolean = true;

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService,
              private _formBuilder: FormBuilder,
              private _http: HttpClient,
              private _router: Router
  ) {
    this.registerForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  // methods
  register(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control!.markAsDirty();
    });

    if (this.registerForm.valid)
      if (this.registerForm.get('password')!.value != this.registerForm.get('passwordConfirmation')!.value)
        this.passwordsMatch = false;
      else {
        const user: RegisterPostUserDTO = {
          firstName: String(this.registerForm.get('firstName')!.value),
          lastName: String(this.registerForm.get('lastName')!.value),
          email: String(this.registerForm.get('email')!.value),
          phoneNumber: String(this.registerForm.get('phoneNumber')!.value),
          password: String(this.registerForm.get('password')!.value),
        };

        this._http.post<RegisterResponseUserDTO>('http://localhost:5113/account/register', user)
          .subscribe(
            (_user: RegisterResponseUserDTO) => {
              this._componentInteractionService.setSuccessfullyRegistered();
              this._router.navigateByUrl('/account/login');
            },
            (err: HttpErrorResponse) => {
              if (err.error == 'Email already used') {
                this.passwordsMatch = true;
                this.emailAlreadyUsed = true;
              }

              console.log('error');
            }
          );
      }
  }

}
