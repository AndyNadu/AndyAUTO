// angular
import { Component } from '@angular/core';

// custom components
import { CarBoxComponent } from '../car-box/car-box.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CarBoxComponent
  ],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent {

}
