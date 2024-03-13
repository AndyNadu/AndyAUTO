// angular
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  // members
  private afterAuthenticateText: string = '';

  // constructor
  constructor() { }


  // methods
  setAfterAuthenticateText(_text: string): void {
    this.afterAuthenticateText = _text;
  }
  getAfterAuthenticateText(): string {
    return this.afterAuthenticateText;
  }
  scrollDown(_elementID: string): void {
    const element = document.getElementById(_elementID);
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
