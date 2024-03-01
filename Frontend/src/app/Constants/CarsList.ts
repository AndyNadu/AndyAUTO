import { Make } from "./Make";
import { Year } from "./Year";
import { Fuel } from "./Fuel";
import { Body } from "./Body";
import { Wheel } from "./Wheel";
import { Traction } from "./Traction";
import { Transmission } from "./Transmission";

export class CarsList {
  Makes: string[] = Array.from(Make.makes.keys());


  //static Models: string[] = [];
  //static Years: Year;
  //static Fuels: Fuel;
  //static Transmissions: Transmission;
  //static Tractions: Traction;
  //static Bodies: Body = new Body();
  //static Wheels: Wheel;
}
