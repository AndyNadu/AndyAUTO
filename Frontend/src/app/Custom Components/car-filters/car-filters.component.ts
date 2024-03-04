// angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

// primeNG components
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

// models && DTOs && constants
import { CarsListConstants } from '../../Constants/CarsListConstants';

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

  //some hardcoded info
  selectedCarMakes!: object[];

  models: object[] = [];
  selectedModels!: object[];

  

  loadingCarsPageBool = false;
  loadingResetFiltersBool = false;

  loadCarsPage() {
    this.loadingCarsPageBool = true;

    setTimeout(() => {
      this.loadingCarsPageBool = false;
    }, 2000);
  }

  resetFilters() {
    this.loadingResetFiltersBool = true;

    setTimeout(() => {
      this.loadingResetFiltersBool = false;
    }, 2000);
  }
}
