// angular
import { Component } from '@angular/core';

// custom components
import { BuyACarComponent } from '../buy-a-car/buy-a-car.component';
import { SellACarComponent } from '../../Pages/sell-a-car/sell-a-car.component';
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';

// interfaces && constants && data objects
import { HomeConstants } from '../../Constants/HomeConstants';


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

  // members
  homeConstants: HomeConstants = new HomeConstants();


  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService) { }


  // methods
  onStateChanged(_carState: string): void {
    this.homeConstants.onStateChanged(_carState);
  }

}
