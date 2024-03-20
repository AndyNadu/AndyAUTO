import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { SellACarFormComponent } from '../../Custom Components/sell-a-car-form/sell-a-car-form.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';
import { ContactBarComponent } from '../../Custom Components/contact-bar/contact-bar.component';
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { SellACarConstants } from '../../Constants/Text Contants/Sell-a-car-constants';

@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FontAwesomeModule, 
    NavigationBarComponent,
    SellACarFormComponent,
    ContactBarComponent,
    FooterComponent
  ],
  templateUrl: './sell-a-car.component.html',
  styleUrl: './sell-a-car.component.css'
})
export class SellACarComponent {
  constants: SellACarConstants = new SellACarConstants();

  constructor(library: FaIconLibrary) { 
    library.addIcons(faCircleCheck);
  }

}
