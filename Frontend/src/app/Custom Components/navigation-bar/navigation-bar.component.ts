import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarPagesConstants } from '../../Constants/Value Constants/Navbar-pages-constants';

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

  navbarPages: NavbarPagesConstants = new NavbarPagesConstants();

  checkIfLoggedIn(): boolean {
    if ((typeof sessionStorage !== 'undefined' && sessionStorage.getItem('userId') != null)
     || (typeof localStorage !== 'undefined' && localStorage.getItem('userId') != null)) 
      return true;

    return false;
  }

}
