import { Routes } from '@angular/router';

// custom components
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'AndyAUTO'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'LoginPage'
  }
];

