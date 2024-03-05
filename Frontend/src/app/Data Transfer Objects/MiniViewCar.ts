export interface MiniViewCar {

  make: string;
  model: string;
  year: number;
  mileage: number;
  description: string;
  fuel: string;
  cubicCapacity: number;
  power: number;
  transmission: string;
  traction: string;
  body: string;
  wheel: string;
  price: number;
  state: string;
  postTime: Date;

  yearAsString: string;
  mileageAsString: string;
  cubicCapacityAsString: string;
  powerAsString: string;
  priceAsString: string;
  postTimeAsString: string;

  imagesAsBase64Strings: string;
  firstImage: any;
}
