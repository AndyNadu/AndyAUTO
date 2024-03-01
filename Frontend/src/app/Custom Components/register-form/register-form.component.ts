// angular
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

// primeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// models && DTOs
import { RegisterPostUserDTO } from '../../Data Transfer Objects/RegisterPostUserDTO';
import { RegisterResponseUserDTO } from '../../Data Transfer Objects/RegisterResponseUserDTO';


@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

  // variables
  registerForm: FormGroup;

  emailAlreadyUsed: boolean = false;
  passwordsMatch: boolean = true;

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService,
              private formBuilder: FormBuilder,
              private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  // methods
  switchForm(activeComponent?: string): void {
    const targetComponent = activeComponent || 'login';
    this._componentInteractionService.setActiveComponent(targetComponent);
  }

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
          phone: String(this.registerForm.get('phone')!.value),
          email: String(this.registerForm.get('email')!.value),
          password: String(this.registerForm.get('password')!.value),
        };

        this.http.post<RegisterResponseUserDTO>('http://localhost:5113/account/register', user)
          .subscribe(
            (res: RegisterResponseUserDTO) => {
              sessionStorage.setItem('userId', JSON.stringify(res.id));
              sessionStorage.setItem('userEmail', res.email);
              sessionStorage.setItem('userPassword', res.password);

              console.log(sessionStorage['userId']);
              console.log(sessionStorage['userEmail']);
              console.log(sessionStorage['userPassword']);

              this._componentInteractionService.setSubmitText('Successfully registered!');
              this.switchForm('logged-in');
            },
            (err: HttpErrorResponse) => {
              if (err.error == 'Email already used') {
                this.passwordsMatch = false;
                this.emailAlreadyUsed = true;
              }
            }
          );
      }
  }
}
