import { Make } from "./Make";
import { Year } from "./Year";
import { Fuel } from "./Fuel";
import { Body } from "./Body";
import { Wheel } from "./Wheel";
import { Traction } from "./Traction";
import { Transmission } from "./Transmission";

export class CarsList {

  // variables
  Makes: string[] = Array.from(Make.makes.keys());
  Models: string[] = [];
  Years: number[] = Year.years;

  Fuels: string[] = Fuel.fuels;
  Transmissions: string[] = Transmission.transmissions;
  Tractions: string[] = Traction.tractions;
  Bodies: string[] = Body.bodies;
  Wheels: string[] = Wheel.wheels;

  // methods
  updateModels(make: string): void {
    this.Models = Array.from(Make.makes.get(make)!.values())
  }
}
