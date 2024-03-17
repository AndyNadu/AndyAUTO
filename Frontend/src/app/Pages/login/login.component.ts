import { Component } from '@angular/core';

import { LoginFormComponent } from '../../Custom Components/login-form/login-form.component';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { RegisterFormComponent } from '../../Custom Components/register-form/register-form.component';


@Component({    
  selector: 'app-login',
  standalone: true,
  imports: [
    RegisterFormComponent,
    LoginFormComponent,
    FontAwesomeModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // constructor
  constructor(_library: FaIconLibrary,
    private _router: Router) {
    _library.addIcons(faHouse);
   }

   getURL(): string {
    return this._router.url;
   }

}
