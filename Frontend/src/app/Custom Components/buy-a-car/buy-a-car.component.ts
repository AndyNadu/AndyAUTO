// angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// angular material components
import { MatPaginatorModule } from '@angular/material/paginator';

// primeNG components
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

// custom components
import { CarBoxComponent } from '../car-box/car-box.component';


@Component({
  selector: 'app-buy-a-car',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,

    ButtonModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,

    CarBoxComponent
  ],
  templateUrl: './buy-a-car.component.html',
  styleUrl: './buy-a-car.component.css'
})
export class BuyACarComponent {

  //some hardcoded info
  cars: object[] = [
    { label: 'BMW' },
    { label: 'Audi' },
    { label: 'Mercedes-Benz' },
    { label: 'Volkswagen' },
    { label: 'Seat' },
    { label: 'Skoda' },
    { label: 'Nissan' },
    { label: 'Hyundai' },
    { label: 'Toyota' },
    { label: 'Honda' },
    { label: 'Renault' },
    { label: 'Dacia' },
    { label: 'Lamborghini' },
    { label: 'Ford' },
    { label: 'Citroen' },
    { label: 'Alfa Romeo' }
  ];
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

  sort_types: object[] = [
    { name: 'Post time (newest)' },
    { name: 'Post time (oldest)' },
    { name: 'Price (low to high)' },
    { name: 'Price (high to low)' },
    { name: 'Km (low to high)' },
    { name: 'Km (high to low)' },
  ];
  selectedSortType!: object[];

  wheel_positions: object[] = [
    { label: 'Left side' },
    { label: 'Right side' }
  ];
  selectedWheelPosition!: object[];
}
