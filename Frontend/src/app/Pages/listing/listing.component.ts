// angular
import { Component } from '@angular/core';

// custom components
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';
import { ContactBarComponent } from '../../Custom Components/contact-bar/contact-bar.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [
    FooterComponent,
    NavigationBarComponent,
    ContactBarComponent
  ],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css'
})
export class ListingComponent {

}
