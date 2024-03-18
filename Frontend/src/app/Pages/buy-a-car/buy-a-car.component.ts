import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DropdownModule } from 'primeng/dropdown';
import { SelectItem } from 'primeng/api';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';
import { CarFiltersComponent } from '../../Custom Components/car-filters/car-filters.component';
import { CarListComponent } from '../../Custom Components/car-list/car-list.component';
import { FooterComponent } from '../../Custom Components/footer/footer.component';
import { CarService } from '../../Services/CarService/car.service';
import { Car } from '../../Interfaces/Car';
import { faCheck, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ContactBarComponent } from '../../Custom Components/contact-bar/contact-bar.component';

@Component({
  selector: 'app-buy-a-car',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,
    FontAwesomeModule,
    DropdownModule,
    FooterComponent,
    ContactBarComponent,
    NavigationBarComponent,
    CarListComponent,
    CarFiltersComponent
  ],
  templateUrl: './buy-a-car.component.html',
  styleUrl: './buy-a-car.component.css'
})

export class BuyACarComponent {

  faCoffee = faCheck;
  faCheck = faCheck;

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

  constructor(private _carService: CarService,
              private _http: HttpClient,
              library: FaIconLibrary) {
                library.addIcons(faCheck);
               }

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
      // se face altfel http request ul

    this.filteredCarsNumber = this._carService.getCarsNumber();
  }

  sortMethodSelected(): void {
    this._carService.orderCars(this.selectedSort.label!);
  }

}
