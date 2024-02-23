// angular
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
import { LoginUser } from '../../Interfaces/LoginUser';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  // services
  _componentInteractionService: ComponentInteractionService;
  http: HttpClient;

  // variables
  submitAttempted: boolean = false;
  invalidCredentials: boolean = false;

  readonly user: LoginUser = {
    email: '',
    password: ''
  }

  // constructor
  constructor(_componentInteractionService: ComponentInteractionService,
    http: HttpClient) {
    this._componentInteractionService = _componentInteractionService;
    this.http = http;
  }

  // methods
  switchForm(activeComponent?: string): void {
    const targetComponent = activeComponent || 'register';
    this._componentInteractionService.setActiveComponent(targetComponent);
  }

  login(): void {
    if (this.checkForEmptyInputs())
      this.searchIfUserExists();
  }

  checkForEmptyInputs(): boolean {
    this.submitAttempted = true;

    if (this.user.email == '')
      return false;
    if (this.user.password == '')
      return false;

    return true;
  }

  searchIfUserExists(): void {
    this.http.post('http://localhost:5113/account/searchIfUserExists', this.user)
      .subscribe(
        (res: any) => {
          this._componentInteractionService.setSubmitText('Successfully logged in!');
          this.switchForm('logged-in');
        },
        (err: any) => {
          if (err = 'Invalid credentials!') {
            this.invalidCredentials = true;
          }
        }
    );
  }
}
