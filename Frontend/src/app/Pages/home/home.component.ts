import { Component } from '@angular/core';

// custom components
import { BuyACarComponent } from '../../Custom Components/buy-a-car/buy-a-car.component';
import { SellACarComponent } from '../../Custom Components/sell-a-car/sell-a-car.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BuyACarComponent,
    SellACarComponent,
    NavigationBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  _componentInteractionService: ComponentInteractionService;

  constructor(_componentInteractionService: ComponentInteractionService) {
    this._componentInteractionService = _componentInteractionService;
  }

  getPageStatus(): string {
    return this._componentInteractionService.getPageStatus();
  }

}
