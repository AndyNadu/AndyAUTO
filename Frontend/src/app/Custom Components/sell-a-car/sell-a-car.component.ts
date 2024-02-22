import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

// angular material components
import { MatInputModule } from '@angular/material/input';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { HttpClientModule } from '@angular/common/http';
import { InputTextareaModule } from 'primeng/inputtextarea';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// constants
import { CarMake } from '../../Constants/CarMake';
import { BodyType } from '../../Constants/BodyType';
import { FuelType } from '../../Constants/FuelType';
import { TractionType } from '../../Constants/TractionType';
import { SteeringWheel } from '../../Constants/SteeringWheel';
import { ProductionYear } from '../../Constants/ProductionYear';
import { TransmissionType } from '../../Constants/TransmissionType';

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
    InputNumberModule,
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
  selectedCarMake!: string;

  carModels: string[] = [];
  selectedCarModel!: string;

  readonly productionYears: number[] = ProductionYear.productionYears;
  selectedProductionYear!: number;

  readonly fuelTypes: string[] = FuelType.fuelTypes;
  selectedFuelType!: string;

  readonly transmissionTypes: string[] = TransmissionType.transmissionTypes;
  selectedTransmissionType!: string;

  readonly tractionTypes: string[] = TractionType.tractionTypes;
  selectedTractionType!: string;

  readonly bodyTypes: string[] = BodyType.bodyTypes;
  selectedBodyType!: string;

  readonly steeringWheels: string[] = SteeringWheel.steeringWheels;
  selectedSteeringWheel!: string;

  description!: string;
  mileage!: number;
  cubicCapacity!: number;
  price!: number;


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

  onCarMakeSelected() {
    console.log('aici');
    this.carModels = CarMake.carMakes.get(this.selectedCarMake) || [];
  }

  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }
}
