// angular
import { Component } from '@angular/core';

// custom components
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';
import { SellACarFormComponent } from '../../Custom Components/sell-a-car-form/sell-a-car-form.component';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';
import { ContactBarComponent } from '../../Custom Components/contact-bar/contact-bar.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FooterComponent,
    SellACarFormComponent,
    ContactBarComponent,
    NavigationBarComponent,
    FontAwesomeModule

  ],
  templateUrl: './sell-a-car.component.html',
  styleUrl: './sell-a-car.component.css'
})
export class SellACarComponent {

  // constructor
  constructor(
    library: FaIconLibrary, private _componentInteractionService: ComponentInteractionService) { 
      library.addIcons(faCircleCheck);
    }


  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

}
