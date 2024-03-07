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
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { CarListComponent } from '../../Custom Components/car-list/car-list.component';
import { CarFiltersComponent } from '../../Custom Components/car-filters/car-filters.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';

// services
import { CarService } from '../../Services/CarService/car.service';

// interfaces && constants && data objects
import { Car } from '../../Interfaces/Car';


@Component({
  selector: 'app-buy-a-car',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,

    DropdownModule,
    FooterComponent,
    NavigationBarComponent,

    CarListComponent,
    CarFiltersComponent
  ],
  templateUrl: './buy-a-car.component.html',
  styleUrl: './buy-a-car.component.css'
})


export class BuyACarComponent {

  // members
  filteredCarsNumber: number = 0;
  selectedSort!: SelectItem;
  sort_types: SelectItem[] = [
    { label: 'Post time (newest)', value: null },
    { label: 'Post time (oldest)', value: null },
    { label: 'Price (low to high)', value: null },
    { label: 'Price (high to low)', value: null },
    { label: 'Km (low to high)', value: null },
    { label: 'Km (high to low)', value: null },
  ];


  // constructor
  constructor(private _carService: CarService,
              private _http: HttpClient) { }

  ngOnInit() {
    this._http.get<Car[]>('http://localhost:5113/car/get')
      .subscribe(
        (res: Car[]) => {
          this._carService.setCarsList(res);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );

    this.filteredCarsNumber = this._carService.getCarsNumber();
  }


  // methods
  sortMethodSelected(): void {
    this._carService.orderCars(this.selectedSort.label!);
  }

}
