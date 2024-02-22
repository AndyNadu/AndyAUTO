import { Component } from '@angular/core';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

@Component({
  selector: 'app-logged-in',
  standalone: true,
  imports: [],
  templateUrl: './logged-in.component.html',
  styleUrl: './logged-in.component.css'
})
export class LoggedInComponent {
  _componentInteractionService: ComponentInteractionService;
  submitText: string;

  constructor(_componentInteractionService: ComponentInteractionService) {
    this._componentInteractionService = _componentInteractionService;
    this.submitText = this._componentInteractionService.getSubmitText();
  }
}
