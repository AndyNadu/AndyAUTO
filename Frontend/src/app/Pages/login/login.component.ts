// angular
import { Component } from '@angular/core';

// custom components
import { LoggedInComponent } from '../../Custom Components/logged-in/logged-in.component';
import { LoginFormComponent } from '../../Custom Components/login-form/login-form.component';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';


@Component({    
  selector: 'app-login',
  standalone: true,
  imports: [
    LoggedInComponent,
    LoginFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService) { }

}
