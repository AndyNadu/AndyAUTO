import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

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
import { CarBoxComponent } from './Custom Components/car-box/car-box.component';
import { NavigationBarComponent } from './Custom Components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,

    FormsModule,  
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,

    InputNumberModule,
    MultiSelectModule,

    NavigationBarComponent,
    CarBoxComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  //some hardcoded info
  cities: object[] = [
    { label: 'BMW'},
    { label: 'Audi'},
    { label: 'Mercedes-Benz'},
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
}
