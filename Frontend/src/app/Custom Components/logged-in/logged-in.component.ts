// angular
import { Component } from '@angular/core';

// services
import { ComponentInteractionService } from '../../Services/ComponentInteractionService/component-interaction.service';


@Component({
  selector: 'app-logged-in',
  standalone: true,
  imports: [],
  templateUrl: './logged-in.component.html',
  styleUrl: './logged-in.component.css'
})
export class LoggedInComponent {

  // members
  submitText: string;

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService) {
    this._componentInteractionService = _componentInteractionService;
    this.submitText = this._componentInteractionService.getAfterAuthenticateText();
  }
}
