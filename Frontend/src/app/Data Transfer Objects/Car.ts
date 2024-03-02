export interface Car {
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
  photos: File[];
  price: number;
}
