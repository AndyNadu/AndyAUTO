import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  private pageStatus: string = 'sell-a-car';
  private activeComponent: string = 'login';
  private submitText: string = '';

  setPageStatus(pageStatus: string): void {
    this.pageStatus = pageStatus;
  }

  getPageStatus(): string {
    return this.pageStatus;
  }

  setActiveComponent(activeComponent: string): void {
    this.activeComponent = activeComponent;
  }

  getActiveComponent(): string {
    return this.activeComponent;
  }

  setSubmitText(text: string) {
    this.submitText = text;
  }

  getSubmitText() {
    return this.submitText;
  }

  scrollDown(elementID: string): void {
    const element = document.getElementById(elementID);
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}