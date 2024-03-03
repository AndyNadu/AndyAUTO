// angular
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

// primeNG components
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

// models && DTOs && constants
import { CarsFilterList } from '../../Constants/CarsFilterList';

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
  carsFilterList: CarsFilterList = new CarsFilterList();


  //some hardcoded info
  selectedCarMakes!: object[];

  models: object[] = [];
  selectedModels!: object[];

  body_types: object[] = [
    { label: 'Cabriolet' },
    { label: 'Estate Car' },
    { label: 'Saloon' },
    { label: 'SUV' },
    { label: 'Small Car' },
    { label: 'Coupe' },
    { label: 'Van / Minibus' }
  ];
  selectedBodyTypes!: object[];

  fuel_types: object[] = [
    { label: 'Diesel' },
    { label: 'Gasoline' },
    { label: 'Electric' },
    { label: 'Hybrid' }
  ];
  selectedFuelTypes!: object[];

  transmission_types: object[] = [
    { label: 'Automatic' },
    { label: 'Manual' },
    { label: 'CVT' }
  ];
  selectedTransmissionTypes!: object[];

  traction_types: object[] = [
    { label: 'Rear wheel drive' },
    { label: 'Front wheel drive' },
    { label: 'All wheel drive' }
  ];
  selectedTractionTypes!: object[];

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



  wheel_positions: object[] = [
    { label: 'Left side' },
    { label: 'Right side' }
  ];
  selectedWheelPosition!: object[];
}
