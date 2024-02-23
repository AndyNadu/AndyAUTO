// angular
import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';

// angular material components
import { MatInputModule } from '@angular/material/input';

// primeNG components
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';

// services
import { ComponentInteractionService } from '../../Frontend Services/component-interaction/component-interaction.service';

// interfaces
import { Car } from '../../Interfaces/Car';

// constants
import { Make } from '../../Constants/Make';
import { Body } from '../../Constants/Body';
import { Fuel } from '../../Constants/Fuel';
import { Traction } from '../../Constants/Traction';
import { Wheel } from '../../Constants/Wheel';
import { Year } from '../../Constants/Year';
import { Transmission } from '../../Constants/Transmission';

@Component({
  selector: 'app-sell-a-car',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

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
  readonly Makes: string[] = Array.from(Make.makes.keys());
  Models: string[] = [];
  readonly Years: number[] = Year.years;
  readonly Fuels: string[] = Fuel.fuels;
  readonly Transmissions: string[] = Transmission.transmissions;
  readonly Tractions: string[] = Traction.tractions;
  readonly Bodies: string[] = Body.bodies;
  readonly Wheels: string[] = Wheel.wheels;

  // input variables
  make!: string;
  model!: string;
  year!: number;
  mileage!: number;
  description!: string;
  fuel!: string;
  cubicCapacity!: number;
  power!: number;
  transmission!: string;
  traction!: string;
  body!: string;
  wheel!: string;
  photos!: File[];
  price!: number;

  // validators
  makeEmpty: boolean = false;
  modelEmpty: boolean = false;
  yearEmpty: boolean = false;
  mileageEmpty: boolean = false;
  descriptionEmpty: boolean = false;
  fuelEmpty: boolean = false;
  cubicCapacityEmpty: boolean = false;
  powerEmpty: boolean = false;
  transmissionEmpty: boolean = false;
  tractionEmpty: boolean = false;
  bodyEmpty: boolean = false;
  wheelEmpty: boolean = false;
  //photosEmpty: boolean = false;
  priceEmpty: boolean = false;

  // other
  formGroup: FormGroup;

  // constructor
  constructor(_componentInteractionService: ComponentInteractionService,
              formBuilder: FormBuilder) {
    this._componentInteractionService = _componentInteractionService;
    this.formGroup = formBuilder.group({
      textAreaValue: ['']
    });
  }

  // methods
  scrollDown(elementID: string): void {
    this._componentInteractionService.scrollDown(elementID);
  }

  onMakeSelected(): void {
    this.Models = Make.makes.get(this.make) || [];
    this.makeEmpty = this.make === undefined;
  }
  onModelSelected(): void {
    this.modelEmpty = this.model === undefined;
  }
  onYearSelected(): void {
    this.yearEmpty = this.year === undefined;
  }
  onMileageUpdated(): void {
    this.mileageEmpty = this.mileage === undefined || this.mileage === null;
  }
  onFuelSelected(): void {
    this.fuelEmpty = this.fuel === undefined;
  }
  onCubicCapacityUpdated(): void {
    this.cubicCapacityEmpty = this.cubicCapacity === undefined || this.cubicCapacity === null;
  }
  onPowerUpdated(): void {
    this.powerEmpty = this.power === undefined || this.power === null;
  }
  onTransmissionSelected(): void {
    this.transmissionEmpty = this.transmission === undefined;
  }
  onTractionSelected(): void {
    this.tractionEmpty = this.traction === undefined;
  }
  onBodySelected(): void {
    this.bodyEmpty = this.body === undefined;
  }
  onWheelSelected(): void {
    this.wheelEmpty = this.wheel === undefined;
  }

  onTextAreaCompleted(): void {
    if (this.formGroup) {
      const textControl = this.formGroup.get('textAreaValue');
      if (textControl)
        this.description = textControl.value;
    }
  }

  onPhotoUploaded(event: any): void {
    this.photos = event.files;
  }
  onPriceUpdated(): void {
    this.priceEmpty = this.price === undefined || this.price === null;
  }

  checkForEmptyInputs(car: Car): void {
    this.makeEmpty = car.make === undefined;
    this.modelEmpty = car.model === undefined;
    this.yearEmpty = car.year === undefined;
    this.mileageEmpty = car.mileage === undefined || car.mileage === null;
    this.descriptionEmpty = car.description === undefined || car.description.trim() === '';
    this.fuelEmpty = car.fuel === undefined;
    this.cubicCapacityEmpty = car.cubicCapacity === undefined || car.cubicCapacity === null;
    this.powerEmpty = car.power === undefined || car.power === null;
    this.transmissionEmpty = car.transmission === undefined;
    this.tractionEmpty = car.traction === undefined;
    this.bodyEmpty = car.body === undefined;
    this.wheelEmpty = car.wheel === undefined;
    //this.photosEmpty = car.photos.length === 0;
    this.priceEmpty = car.price === undefined || car.price === null;
  }

  submitPost(): void {
    const car: Car = {
        make: this.make,
        model: this.model,
        year: this.year,
        mileage: this.mileage,
        description: this.description,
        fuel: this.fuel,
        cubicCapacity: this.cubicCapacity,
        power: this.power,
        transmission: this.transmission,
        traction: this.traction,
        body: this.body,
        wheel: this.wheel,
        photos: this.photos,
        price: this.price
    };

    this.checkForEmptyInputs(car);
  }
}
