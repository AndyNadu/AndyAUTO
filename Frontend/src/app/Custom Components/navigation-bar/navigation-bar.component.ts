// angular
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';


@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  // members
  accountLink: string = this.getAccountTab();


  bmwLogo: string = './assets/Images/BMW.png';

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService) { }


  // methods
  getAccountTab(): string {
    if (typeof sessionStorage !== 'undefined' || typeof localStorage !== 'undefined')
      switch (sessionStorage.getItem('account-selected-tab')) {
        case 'my-cars': 
          return 'account/my-cars';
        case 'favourite-cars':
          return 'account/favourite-cars';
        default:
          return 'account/personal-information';
      }
      return 'account/personal-information';
  }
  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }
  checkIfLoggedIn(): boolean {
    if ((typeof sessionStorage !== 'undefined' && sessionStorage.getItem('loggedIn') == 'true')
     || (typeof localStorage !== 'undefined' && localStorage.getItem('loggedIn') == 'true'))
      return true;
    return false;
  }

}
