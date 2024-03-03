// angular
import { Component } from '@angular/core';

// custom components
import { SellACarFormComponent } from '../../Custom Components/sell-a-car-form/sell-a-car-form.component';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    SellACarFormComponent,
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
