// angular
import { Component } from '@angular/core';

// custom components
import { LoggedInComponent } from '../../Custom Components/logged-in/logged-in.component';
import { LoginFormComponent } from '../../Custom Components/login-form/login-form.component';
import { RegisterFormComponent } from '../../Custom Components/register-form/register-form.component';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

@Component({    
  selector: 'app-login',
  standalone: true,
  imports: [
    LoggedInComponent,
    LoginFormComponent,
    RegisterFormComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // services
  _componentInteractionService: ComponentInteractionService;

  // constructor
  constructor(_componentInteractionService: ComponentInteractionService) {
    this._componentInteractionService = _componentInteractionService;
  }

  // methods
  getActiveComponent(): string {
    return this._componentInteractionService.getActiveComponent();
  }
}
