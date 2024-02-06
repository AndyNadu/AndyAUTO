import { Component } from '@angular/core';

//angular material
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//primeng components
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';

//custom components
import { CarBoxComponent } from '../../Custom Components/car-box/car-box.component';
import { NavigationBarComponent } from '../../Custom Components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,

    InputNumberModule,
    MultiSelectModule,

    CarBoxComponent,
    NavigationBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //some hardcoded info
  cities: object[] = [
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
    { label: 'Cabriolet / Roadster' },
    { label: 'Estate Car' },
    { label: 'Saloon' },
    { label: 'SUV / Off-road Vehicle / Pickup Truck' },
    { label: 'Small Car' },
    { label: 'Sports Car / Coupe' },
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
}
