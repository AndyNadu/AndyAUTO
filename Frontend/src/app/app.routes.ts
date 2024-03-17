import { Routes } from '@angular/router';

// custom components
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { AccountComponent } from './Pages/account/account.component';
import { ListingComponent } from './Pages/listing/listing.component';
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
    path: 'account/login',
    component: LoginComponent,
    title: 'login-page'
  },
  {
    path: 'account/register',
    component: LoginComponent,
    title: 'register-page'
  },
  {
    path: 'account/personal-information',
    component: AccountComponent,
    title: 'account-page'
  },
  {
    path: 'account/my-cars',
    component: AccountComponent,
    title: 'account-page'
  },
  {
    path: 'account/favourite-cars',
    component: AccountComponent,
    title: 'account-page'
  },
  {
    path: 'car/:carMake-:carModel',
    component: ListingComponent,
    title: 'account-page'
  }
];

