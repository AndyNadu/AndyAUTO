import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// primeNG
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// interfaces
import { RegisterUser } from '../../Interfaces/RegisterUser';


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

  _componentInteractionService: ComponentInteractionService;
  http: HttpClient;

  submitAttempted: boolean = false;
  emailAlreadyUsed: boolean = false;
  passwordsMatch: boolean = true;
  passwordConfirmation: string = '';

  user: RegisterUser = {
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: '',
  }

  constructor(_componentInteractionService: ComponentInteractionService,
    http: HttpClient) {
    this._componentInteractionService = _componentInteractionService;
    this.http = http;
  }

  switchForm(activeComponent?: string): void {
    const targetComponent = activeComponent || 'login';
    this._componentInteractionService.setActiveComponent(targetComponent);
  }

  readonly submitText: string = 'Successfully registered!';

  registerAccount(): void {
    if (this.checkForEmptyInputs()) // empty-field validator
      if (!this.checkIfPasswordsMatch()) // passwords don't match validator
        this.passwordsMatch = false;
      else 
        this.postUserInDB();
  }

  checkForEmptyInputs(): boolean {
    this.submitAttempted = true;

    if (this.user.firstName == '')
      return false;
    if (this.user.lastName == '')
      return false;
    if (this.user.password == '')
      return false;
    if (this.user.email == '')
      return false;
    if (this.user.phoneNumber == '')
      return false;
    if (this.passwordConfirmation == '')
      return false;

    return true;
  }

  checkIfPasswordsMatch(): boolean {
    if (this.user.password == this.passwordConfirmation)
      return true;
    return false;
  }

  postUserInDB(): void {
    this.http.post('http://localhost:5113/account/register', this.user)
      .subscribe(
        (res: any) => {
          this._componentInteractionService.setSubmitText('Successfully registered!');
          this.switchForm('logged-in');
        },
        (err: any) => {
          console.log(err);
          if (err = 'Email already used') {
            this.passwordsMatch = true;
            this.emailAlreadyUsed = true;
          }
        }
      );
  }
}
