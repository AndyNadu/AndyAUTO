// angular
import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// moment
import moment from 'moment';

// custom components
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// models && DTOs && constants
import { MiniViewCar } from '../../Data Transfer Objects/MiniViewCar';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {
  carsList: MiniViewCar[] = [];

  private carsListSubscription: Subscription;

  constructor(private _componentInteractionService: ComponentInteractionService) {
    this.carsList = _componentInteractionService.getCarsList();

    this.carsListSubscription = this._componentInteractionService.getCarsSbjList().subscribe(carsList => {
      this.carsList = carsList;
    });
  }

 
}
