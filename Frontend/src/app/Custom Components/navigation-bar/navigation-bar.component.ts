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

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService) { }

  // methods
  setPageStatusToBuying(): void {
    if (this._componentInteractionService.getPageStatus() == 'buy-a-car') 
      this.scrollDown('content-section-element');
    else
      this._componentInteractionService.setPageStatus('buy-a-car');
  }

  setPageStatusToSelling(): void {
    if (this._componentInteractionService.getPageStatus() == 'sell-a-car') 
      this.scrollDown('sell-a-car-section');
    else
      this._componentInteractionService.setPageStatus('sell-a-car');
  }

  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

}
