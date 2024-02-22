import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// angular material components
import { MatInputModule } from '@angular/material/input';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// constants
import { CarMake } from '../../Constants/CarMake';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FormsModule,

    MatInputModule,

    DropdownModule,
    FileUploadModule,
    HttpClientModule,
    InputTextareaModule
  ],
  templateUrl: './sell-a-car.component.html',
  styleUrl: './sell-a-car.component.css'
})
export class SellACarComponent {
  // services
  _componentInteractionService: ComponentInteractionService;

  // constants
  readonly carMakes: string[] = Array.from(CarMake.carMakes.keys());

  selectedCarMake: string = ' ';

  carModels: string[] | undefined = [];


  constructor(_componentInteractionService: ComponentInteractionService) {
    this._componentInteractionService = _componentInteractionService;
  }


  selectedCity: any | undefined;
  cities: any = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];

  onCarMakeSelected(event: any) {
    this.carModels = CarMake.carMakes.get(this.selectedCarMake);
  }

  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }
}
