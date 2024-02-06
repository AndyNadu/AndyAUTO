import { Component } from '@angular/core';

//angular material
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-car-box',
  standalone: true,
  imports: [
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './car-box.component.html',
  styleUrl: './car-box.component.css'
})
export class CarBoxComponent {

}
