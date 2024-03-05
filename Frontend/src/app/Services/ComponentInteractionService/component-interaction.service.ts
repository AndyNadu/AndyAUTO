// angular
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  // members
  private afterAuthenticateText: string = '';
  private form: string = 'login';
  private activeComponent: string = 'buy-a-car';

  // constructor
  constructor() { }


  // methods
  setAfterAuthenticateText(_text: string): void {
    this.afterAuthenticateText = _text;
  }
  getAfterAuthenticateText(): string {
    return this.afterAuthenticateText;
  }
  setForm(_form: string): void {
    this.form = _form;
  }
  getForm(): string {
    return this.form;
  }
  setPageStatus(_activeComponent: string): void {
    this.activeComponent = _activeComponent;
  }
  getPageStatus(): string {
    return this.activeComponent;
  }
  scrollDown(_elementID: string): void {
    const element = document.getElementById(_elementID);
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
