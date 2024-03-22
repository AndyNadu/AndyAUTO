import { Routes } from '@angular/router';

// custom components
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { AccountComponent } from './Pages/account/account.component';
import { ListingComponent } from './Pages/listing/listing.component';
import { BuyACarComponent } from './Pages/buy-a-car/buy-a-car.component';
import { SellACarComponent } from './Pages/sell-a-car/sell-a-car.component';
import { AccountManageLocationsComponent } from './Custom Components/account-manage-locations/account-manage-locations.component';
import { AccountManageUsersListComponent } from './Custom Components/account-manage-users-list/account-manage-users-list.component';
import { AccountManageUnverifiedCarsListComponent } from './Custom Components/account-manage-unverified-cars-list/account-manage-unverified-cars-list.component';

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
    path: 'account/manage/users-list',
    component: AccountComponent,
    title: 'account-page'
  },
  {
    path: 'account/manage/unverified-cars-list',
    component: AccountComponent,
    title: 'account-page'
  },
  {
    path: 'account/manage/locations',
    component: AccountComponent,
    title: 'account-page'
  },
  {
    path: 'car/:carMake-:carModel',
    component: ListingComponent,
    title: 'account-page'
  }
];

