import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { RegisterFormComponent } from '../../Custom Components/register-form/register-form.component';
import { LoginFormComponent } from '../../Custom Components/login-form/login-form.component';

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

  constructor(private _router: Router,
              _library: FaIconLibrary) {
    _library.addIcons(faHouse);
  }

  getURL(): string {
    return this._router.url;
  }

}
