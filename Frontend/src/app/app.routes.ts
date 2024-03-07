import { Routes } from '@angular/router';

// custom components
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { BuyACarComponent } from './Pages/buy-a-car/buy-a-car.component';
import { SellACarComponent } from './Pages/sell-a-car/sell-a-car.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'AndyAUTO'
  },
  {
    path: 'buy-a-car',
    component: BuyACarComponent,
    title: 'buy-a-car-page'
  },
  {
    path: 'sell-a-car',
    component: SellACarComponent,
    title: 'sell-a-car-page'
  },
  {
    path: 'register',
    component: LoginComponent,
    title: 'register-page'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'login-page'
  }
];

