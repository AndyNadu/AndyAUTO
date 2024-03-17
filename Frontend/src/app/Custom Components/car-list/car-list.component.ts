// angular
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// rxjs
import { Subscription } from 'rxjs';

// interfaces && constants && data objects
import { Car } from '../../Interfaces/Car';

// services
import { CarService } from '../../Services/CarService/car.service';


@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {

  // members
  carMake!: string;
  carModel!: string;
  carsList: Car[] = [];
  private carsListSubscription: Subscription;


  // constructor
  constructor(private _route: ActivatedRoute,
    private _carService: CarService) {
      this._route.params.subscribe(params => {
        this.carMake = params['make']
        this.carModel = params['model']
      })


    this.carsList = _carService.getCarsList();

    this.carsList.forEach(car => {
      car.model = car.model.replace(/\s+/g, '-');
    })  

    this.carsListSubscription = this._carService.getCarsListSubject().subscribe(carsList => {
      this.carsList = carsList;
    });
  }

  // methods

}
