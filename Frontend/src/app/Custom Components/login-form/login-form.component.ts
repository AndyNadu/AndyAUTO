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

// data objects
import { LoginPost } from '../../Data Objects/LoginPost';

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
  readonly loginPost: LoginPost = new LoginPost();

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

    this.loginPost.buttonSubmitted = true;

    if (this.loginPost.noEmptyInputs())
      this.loginPost.tryLogin(this.http);
  }
}
