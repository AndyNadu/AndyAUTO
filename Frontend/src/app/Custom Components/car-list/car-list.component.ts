// angular
import { Component } from '@angular/core';

// rxjs
import { Subscription } from 'rxjs';

// interfaces && constants && data objects
import { Car } from '../../Interfaces/Car';

// services
import { CarService } from '../../Services/CarService/car.service';


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {

  // members
  carsList: Car[] = [];
  private carsListSubscription: Subscription;


  // constructor
  constructor(private _carService: CarService) {
    this.carsList = _carService.getCarsList();

    this.carsListSubscription = this._carService.getCarsListSubject().subscribe(carsList => {
      this.carsList = carsList;
    });
  }

}
