// angular
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  // members
  successfullyRegistered: boolean = false;

  // constructor
  constructor() { }


  // methods
  checkIfSuccessfullyRegistered(): boolean {
    return this.successfullyRegistered;
  }
  setSuccessfullyRegistered(): void {
    this.successfullyRegistered = true;
  }
  scrollDown(_elementID: string): void {
    const element = document.getElementById(_elementID);
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  checkIfLoggedIn(): boolean {
    if (typeof window !== 'undefined')
      return localStorage.getItem('userId') != (undefined || null);
    return false;
  }

}
