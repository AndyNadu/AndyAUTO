// angular
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// primeNG
import { ButtonModule } from 'primeng/button';
import { MultiSelect, MultiSelectModule } from 'primeng/multiselect';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';

// interfaces && constants && data objects
import { CarsFilterForm } from '../../Data objects/CarsFilterForm';
import { CarsListConstant } from '../../Constants/CarsListConstant';

// services
import { CarService } from '../../Services/CarService/car.service';


@Component({
  selector: 'app-car-filters',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    
    ButtonModule,
    InputNumberModule,
    MultiSelectModule
  ],
  templateUrl: './car-filters.component.html',
  styleUrl: './car-filters.component.css'
})
export class CarFiltersComponent {

  @ViewChildren('priceFrom, priceTo, yearFrom, yearTo, mileageFrom, mileageTo, cubicCapacityFrom, cubicCapacityTo') numberInputs!: QueryList<InputNumber>;

  // members
  constantCarsList: CarsListConstant = new CarsListConstant();
  filtersList: CarsFilterForm = new CarsFilterForm();
  applyFiltersLoading: boolean = false;
  resetFiltersLoading: boolean = false;


  // constructor
  constructor(private _carService: CarService) { }


  // methods
  applyFilters(): void {
    this.applyFiltersLoading = true;

    setTimeout((): void => {
      this.applyFiltersLoading = false;
      this._carService.applyFilters(this.filtersList);
    }, 1000);
  }
  resetFilters(): void {
    this.resetFiltersLoading = true;

    setTimeout( (): void => {
      this.resetFiltersLoading = false;
      this.filtersList.makes = [];
      this.filtersList.models = [];
      this.filtersList.bodies = [];
      this.filtersList.fuels = [];
      this.filtersList.transmissions = [];
      this.filtersList.tractions = [];
      this.filtersList.wheels = [];
      //this.numberInputs.forEach(input => input.clear());

      this._carService.resetFilters();
    }, 1000);
  }
  onMakeSelected(): void {
    this.constantCarsList.onMakeSelected(this.filtersList.makes);
  }

}
