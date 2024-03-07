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
  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

}
