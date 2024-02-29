// angular
import { FormGroup } from "@angular/forms";

// constants
import { Make } from "../Constants/Make";
import { Year } from "../Constants/Year";
import { Fuel } from "../Constants/Fuel";
import { Body } from "../Constants/Body";
import { Wheel } from "../Constants/Wheel";
import { Traction } from "../Constants/Traction";
import { Transmission } from "../Constants/Transmission";

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

export class CarPost {

  // constants
  readonly Makes: string[] = Array.from(Make.makes.keys());
  Models: string[] = [];
  readonly Years: number[] = Year.years;
  readonly Fuels: string[] = Fuel.fuels;
  readonly Transmissions: string[] = Transmission.transmissions;
  readonly Tractions: string[] = Traction.tractions;
  readonly Bodies: string[] = Body.bodies;
  readonly Wheels: string[] = Wheel.wheels;

  // variables
  buttonSubmitted: boolean = false;

  formGroup!: FormGroup;

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
  photos: Set<File> = new Set<File>();
  price!: number;

  makeEmpty?: boolean;
  modelEmpty?: boolean;
  yearEmpty?: boolean;
  mileageEmpty?: boolean;
  descriptionEmpty?: boolean;
  fuelEmpty?: boolean;
  cubicCapacityEmpty?: boolean;
  powerEmpty?: boolean;
  transmissionEmpty?: boolean;
  tractionEmpty?: boolean;
  bodyEmpty?: boolean;
  wheelEmpty?: boolean;
  photosEmpty?: boolean;
  priceEmpty?: boolean;

  // constructor
  constructor() {
    this.makeEmpty = false;
    this.modelEmpty = false;
    this.yearEmpty = false;
    this.mileageEmpty = false;
    this.descriptionEmpty = false;
    this.fuelEmpty = false;
    this.cubicCapacityEmpty = false;
    this.powerEmpty = false;
    this.transmissionEmpty = false;
    this.tractionEmpty = false;
    this.bodyEmpty = false;
    this.wheelEmpty = false;
    this.priceEmpty = false;
  }

  // methods
  onMakeSelected(): void {
    this.Models = Make.makes.get(this.make) || [];
    if (this.buttonSubmitted)
      this.makeEmpty = this.makeEmpty === undefined;
  }
  onModelSelected(): void {
    if (this.buttonSubmitted)
      this.modelEmpty = this.model === undefined;
  }
  onYearSelected(): void {
    if (this.buttonSubmitted)
      this.yearEmpty = this.year === undefined;
  }
  onMileageUpdated(): void {
    if (this.buttonSubmitted)
      this.mileageEmpty = this.mileage === undefined || this.mileage === null;
  }
  onDescriptionCompleted(): void {
    const textControl = this.formGroup.get('description');

    this.description = textControl!.value;

    if (this.buttonSubmitted)
      this.descriptionEmpty = this.description === undefined || this.description === '';
  }
  onFuelSelected(): void {
    if (this.buttonSubmitted)
      this.fuelEmpty = this.fuel === undefined;
  }
  onCubicCapacityUpdated(): void {
    if (this.buttonSubmitted)
      this.cubicCapacityEmpty = this.cubicCapacity === undefined || this.cubicCapacity === null;
  }
  onPowerUpdated(): void {
    if (this.buttonSubmitted)
      this.powerEmpty = this.power === undefined || this.power === null;
  }
  onTransmissionSelected(): void {
    if (this.buttonSubmitted)
      this.transmissionEmpty = this.transmission === undefined;
  }
  onTractionSelected(): void {
    if (this.buttonSubmitted)
      this.tractionEmpty = this.traction === undefined;
  }
  onBodySelected(): void {
    if (this.buttonSubmitted)
      this.bodyEmpty = this.body === undefined;
  }
  onWheelSelected(): void {
    if (this.buttonSubmitted)
      this.wheelEmpty = this.wheel === undefined;
  }
  onPhotoSelected(event: any): void {
    for (let file of event.files)
      this.photos.add(file);

    if (this.buttonSubmitted)
      this.photosEmpty = this.photos.size === 0;
  }
  onPhotoRemoved(event: any): void {
    this.photos.delete(event.file);

    if (this.buttonSubmitted)
      this.photosEmpty = this.photos.size === 0;
  }
  onPriceUpdated(): void {
    if (this.buttonSubmitted)
      this.priceEmpty = this.price === undefined || this.price === null;
  }

  checkForEmptyInputs(): void {
    this.makeEmpty = this.make === undefined;
    this.modelEmpty = this.model === undefined;
    this.yearEmpty = this.year === undefined;
    this.mileageEmpty = this.mileage === undefined || this.mileage === null;
    this.descriptionEmpty = this.description === undefined || this.description === '';
    this.fuelEmpty = this.fuel === undefined;
    this.cubicCapacityEmpty = this.cubicCapacity === undefined || this.cubicCapacity === null;
    this.powerEmpty = this.power === undefined || this.power === null;
    this.transmissionEmpty = this.transmission === undefined;
    this.tractionEmpty = this.traction === undefined;
    this.bodyEmpty = this.body === undefined;
    this.wheelEmpty = this.wheel === undefined;
    this.photosEmpty = this.photos === undefined || this.photos.size === 0;
    this.priceEmpty = this.price === undefined || this.price === null;
  }
}
