// angular
import { Component } from '@angular/core';

// custom components
import { BuyACarComponent } from '../buy-a-car/buy-a-car.component';
import { SellACarComponent } from '../../Pages/sell-a-car/sell-a-car.component';
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    BuyACarComponent,
    SellACarComponent,
    NavigationBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  // services
  _componentInteractionService: ComponentInteractionService;

  // constructor
  constructor(_componentInteractionService: ComponentInteractionService) {
    this._componentInteractionService = _componentInteractionService;
  }

  // methods
  getPageStatus(): string {
    return this._componentInteractionService.getPageStatus();
  }

}
