// angular
import { Router } from '@angular/router';
import { Component } from '@angular/core';

// custom components
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';
import { AccountMyCarsComponent } from '../../Custom Components/account-my-cars/account-my-cars.component';
import { AccountFavouriteCarsComponent } from '../../Custom Components/account-favourite-cars/account-favourite-cars.component';
import { AccountPersonalInformationComponent } from '../../Custom Components/account-personal-information/account-personal-information.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ButtonModule,
    FooterComponent,
    NavigationBarComponent,
    AccountMyCarsComponent,
    AccountFavouriteCarsComponent,
    AccountPersonalInformationComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})  
export class AccountComponent {

  // members
  selectedTab: string = this.getTab();
  loadingPersonalInformation: boolean = false;
  loadingMyCars: boolean = false;
  loadingFavouriteCars: boolean = false;
  loadingLogout: boolean = false;


  // constructor
  constructor(private _router: Router) { }


  // methods
  getTab(): string {
    console.log('aici');
      return sessionStorage.getItem('account-selected-tab') != null ? sessionStorage.getItem('account-selected-tab')! : 'personal-information';
  }
  switchTab(input: string): void {
    switch (input) {
      case 'personal-information':
        this.loadingPersonalInformation = true;

        setTimeout((): void => {
          this.loadingPersonalInformation = false;
          sessionStorage.setItem('account-selected-tab', input);
          this.selectedTab = this.getTab();
          this._router.navigateByUrl('/account/personal-information');
        }, 1000);
        break;
      case 'my-cars':
        this.loadingMyCars = true;

        setTimeout((): void => {
          this.loadingMyCars = false;
          sessionStorage.setItem('account-selected-tab', input);
          this.selectedTab = this.getTab();
          this._router.navigateByUrl('/account/my-cars');
        }, 1000);
        break;
      case 'favourite-cars':
        this.loadingFavouriteCars = true;

        setTimeout((): void => {
          this.loadingFavouriteCars = false;
          sessionStorage.setItem('account-selected-tab', input);
          this.selectedTab = this.getTab();
          this._router.navigateByUrl('/account/favourite-cars');
        }, 1000);
        break;
    }
  }

  logout(): void {
    this.loadingLogout = true;

    setTimeout((): void => {
      this.loadingLogout = false;
      localStorage.clear();
      sessionStorage.clear();
      this._router.navigateByUrl('');
    }, 1000);
  }
}
