import { SafeResourceUrl } from "@angular/platform-browser";

export interface Car {

  make: string;
  model: string;
  description: string;
  fuel: string;
  transmission: string;
  traction: string;
  body: string;
  wheel: string;
  state: string;
  year: number;
  mileage: number;
  cubicCapacity: number;
  power: number;
  price: number;
  postTime: Date;

  yearAsString: string;
  mileageAsString: string;
  cubicCapacityAsString: string;
  powerAsString: string;
  priceAsString: string;
  postTimeAsString: string;

  imagesAsBase64Strings: string[];
  firstImage: SafeResourceUrl;

}
