import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';
import { AccountMyCarsComponent } from '../../Custom Components/account-my-cars/account-my-cars.component';
import { AccountFavouriteCarsComponent } from '../../Custom Components/account-favourite-cars/account-favourite-cars.component';
import { AccountPersonalInformationComponent } from '../../Custom Components/account-personal-information/account-personal-information.component';
import { ContactBarComponent } from '../../Custom Components/contact-bar/contact-bar.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faCar, faHeart, faMapLocationDot, faPowerOff, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AccountUserTabsContants } from '../../Constants/Value Constants/Account-user-tabs-constants';
import { AccountManageLocationsComponent } from '../../Custom Components/account-manage-locations/account-manage-locations.component';
import { AccountManageUnverifiedCarsListComponent } from '../../Custom Components/account-manage-unverified-cars-list/account-manage-unverified-cars-list.component';
import { AccountManageUsersListComponent } from '../../Custom Components/account-manage-users-list/account-manage-users-list.component';
import { AccountTab } from '../../Interfaces/Account-tab';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    ButtonModule,
    FooterComponent,
    NavigationBarComponent,
    AccountMyCarsComponent,
    AccountFavouriteCarsComponent,
    AccountPersonalInformationComponent,
    AccountManageLocationsComponent,
    AccountManageUnverifiedCarsListComponent,
    AccountManageUsersListComponent,
    ContactBarComponent,
    FontAwesomeModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})  
export class AccountComponent {

  tabs: AccountUserTabsContants = new AccountUserTabsContants();
  selectedTab: string = this.tabs.userTabs[0].name;
  loadingLogout: boolean = false;

  constructor(private _router: Router,
    library: FaIconLibrary) { 
      library.addIcons(faBars);
      library.addIcons(faUser);
      library.addIcons(faUsers);
      library.addIcons(faCar);
      library.addIcons(faHeart);
      library.addIcons(faPowerOff);
      library.addIcons(faMapLocationDot);
    }

  ngOnInit(): void {
    const tabIndex = parseInt(sessionStorage.getItem('tabIndex')!);
    const userTabsLength = this.tabs.userTabs.length;
    this.selectedTab = tabIndex < userTabsLength ? 
      this.tabs.userTabs[tabIndex].name : 
      this.tabs.employeeTabs[tabIndex - userTabsLength].name;
  }

  switchTab(tabIndex: number): void {
    const unmodifiedTabIndex: number = tabIndex;
    const tabsToUse: AccountTab[] = tabIndex < this.tabs.userTabs.length ? this.tabs.userTabs : this.tabs.employeeTabs;
    if (!(tabIndex < this.tabs.userTabs.length))
      tabIndex -= this.tabs.userTabs.length;

    tabsToUse[tabIndex].loading = true;

    setTimeout((): void => {
      if (unmodifiedTabIndex != tabIndex)
        sessionStorage.setItem('tabIndex', String(unmodifiedTabIndex));
      else
        sessionStorage.setItem('tabIndex', String(tabIndex));
      this.selectedTab = tabsToUse[tabIndex].name;
      tabsToUse[tabIndex].loading = false;
      this._router.navigateByUrl(tabsToUse[tabIndex].route);
    }, 1000);
  }

  isEmployee(): boolean {
    return localStorage.getItem('role') === '"employee"' || sessionStorage.getItem('role') === '"employee"';
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
