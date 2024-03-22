import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { CarsFilterForm } from '../../Data objects/CarsFilterForm';
import { CarService } from '../../Services/CarService/car.service';
import { SelectItem } from 'primeng/api/selectitem';
import { CarDetails } from '../../Interfaces/Car-details';

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

  carDetails: CarDetails = this._carService.getCarDetails();
  makeSelected: boolean = false;


  onMakeSelected(): void {
    console.log('here');
    console.log(this.filtersList.makes.length);
    this.makeSelected = this.filtersList.makes.length === 0 ? false : true;
    //this.carDetails.models = this._carService.getCarModels(this.filtersList.makes);
  }


  filtersList: CarsFilterForm = new CarsFilterForm();
  applyFiltersLoading: boolean = false;
  resetFiltersLoading: boolean = false;


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
      this.numberInputs.forEach(input => input.clear());

      this._carService.resetFilters();
    }, 1000);
  }


}
