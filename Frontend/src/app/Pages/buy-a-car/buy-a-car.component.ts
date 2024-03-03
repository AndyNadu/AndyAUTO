// angular
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// angular material components
import { MatPaginatorModule } from '@angular/material/paginator';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';

// custom components
import { CarListComponent } from '../../Custom Components/car-list/car-list.component';
import { CarFiltersComponent } from '../../Custom Components/car-filters/car-filters.component';


@Component({
  selector: 'app-buy-a-car',
  standalone: true,
  imports: [
    FormsModule,
    MatPaginatorModule,

    DropdownModule,

    CarListComponent,
    CarFiltersComponent
  ],
  templateUrl: './buy-a-car.component.html',
  styleUrl: './buy-a-car.component.css'
})
export class BuyACarComponent {
  sort_types: object[] = [
    { name: 'Post time (newest)' },
    { name: 'Post time (oldest)' },
    { name: 'Price (low to high)' },
    { name: 'Price (high to low)' },
    { name: 'Km (low to high)' },
    { name: 'Km (high to low)' },
  ];
  selectedSortType!: object[];
}
