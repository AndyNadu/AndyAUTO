// angular
import { Component } from '@angular/core';

// custom components
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';
import { SellACarFormComponent } from '../../Custom Components/sell-a-car-form/sell-a-car-form.component';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';
import { ContactBarComponent } from '../../Custom Components/contact-bar/contact-bar.component';


@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FooterComponent,
    SellACarFormComponent,
    ContactBarComponent,
    NavigationBarComponent

  ],
  templateUrl: './sell-a-car.component.html',
  styleUrl: './sell-a-car.component.css'
})
export class SellACarComponent {

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService) { }


  // methods
  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

}
