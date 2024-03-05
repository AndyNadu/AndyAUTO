// angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// angular material components
import { MatPaginatorModule } from '@angular/material/paginator';

// primeNG components
import { SelectItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';

// custom components
import { CarListComponent } from '../../Custom Components/car-list/car-list.component';
import { CarFiltersComponent } from '../../Custom Components/car-filters/car-filters.component';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// models && DTOs && constants
import { Car } from '../../Data Transfer Objects/Car';


@Component({
  selector: 'app-buy-a-car',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,

    DropdownModule,

    CarListComponent,
    CarFiltersComponent
  ],
  templateUrl: './buy-a-car.component.html',
  styleUrl: './buy-a-car.component.css'
})


export class BuyACarComponent {

  // variables
  carsNumber: number;
  selectedSort!: SelectItem;

  //constructor
  constructor(private _componentInteractionService: ComponentInteractionService,
              private _http: HttpClient) {

    _http.get<Car[]>('http://localhost:5113/car/get')
      .subscribe(
        (res: Car[]) => {
          _componentInteractionService.setCarsList(res);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );

    this.carsNumber = _componentInteractionService.getCarsNumber();
  }

  sortMethodSelected(): void {
    this._componentInteractionService.orderCars(this.selectedSort.label!);
  }

  // hardcoded shit
  sort_types: SelectItem[] = [
    { label: 'Post time (newest)', value: null },
    { label: 'Post time (oldest)', value: null },
    { label: 'Price (low to high)', value: null },
    { label: 'Price (high to low)', value: null },
    { label: 'Km (low to high)', value: null },
    { label: 'Km (high to low)', value: null },
  ];
}
