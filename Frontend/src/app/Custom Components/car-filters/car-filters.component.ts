// angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

// primeNG components
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

// models && DTOs && constants
import { CarsListConstants } from '../../Constants/CarsListConstants';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

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

  // variables
  carsFilterList: CarsListConstants = new CarsListConstants();

  // constructor
  constructor(private _componentInteractionService: ComponentInteractionService) { }

  // methods
  filterCars() {
    this.loadingCarsPageBool = true;

    setTimeout(()=> {
      this.loadingCarsPageBool = false;
      this._componentInteractionService.filterCars(this.carsFilterList);
    }, 1000);
  }

  //some hardcoded info
  selectedCarMakes!: object[];

  models: object[] = [];
  selectedModels!: object[];

  loadingCarsPageBool = false;
  loadingResetFiltersBool = false;



  resetFilters() {
    this.loadingResetFiltersBool = true;

    setTimeout(() => {
      this.loadingResetFiltersBool = false;

      this.carsFilterList.makes = [];
      this.carsFilterList.models = [];
      this.carsFilterList.bodies = [];
      this.carsFilterList.priceFrom = undefined;
      this.carsFilterList.priceTo = undefined;
      this.carsFilterList.yearFrom = undefined;
      this.carsFilterList.yearTo = undefined;
      this.carsFilterList.mileageFrom = undefined;
      this.carsFilterList.mileageTo = undefined;
      this.carsFilterList.fuels = [];
      this.carsFilterList.cubicCapacityFrom = undefined;
      this.carsFilterList.cubicCapacityTo = undefined;
      this.carsFilterList.transmissions = [];
      this.carsFilterList.tractions = [];
      this.carsFilterList.wheels = [];

      this._componentInteractionService.filterCars(this.carsFilterList);
    }, 1000);
  }
}
