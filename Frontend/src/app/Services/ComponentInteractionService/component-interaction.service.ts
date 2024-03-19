import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  successfullyRegistered: string = '';

  setSuccessfullyRegistered(message: string): void {
    this.successfullyRegistered = message;
  }
  getSuccessfullyRegistered(): string {
    return this.successfullyRegistered;
  }
}
