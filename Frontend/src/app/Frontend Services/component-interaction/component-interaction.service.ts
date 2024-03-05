// angular
import { Injectable } from '@angular/core';

// moment
import moment from 'moment';

// models && DTOs && constants
import { Car } from '../../Data Transfer Objects/Car';
import { MiniViewCar } from '../../Data Transfer Objects/MiniViewCar';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject, first } from 'rxjs';
import { CarsListConstants } from '../../Constants/CarsListConstants';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  // variables
  private pageStatus: string = 'buy-a-car';
  private activeComponent: string = 'login';
  private submitText: string = '';

  private disArei: MiniViewCar[] = [];
  private carsList: MiniViewCar[] = [];
  private carsListSubject = new Subject<MiniViewCar[]>();

  getCarsSbjList(): Observable<MiniViewCar[]> {
    return this.carsListSubject.asObservable();
  }
  updateCarsList(carsList: MiniViewCar[]): void {
    this.carsListSubject.next(carsList);
  }


  // constructor
  constructor(private _sanitizer: DomSanitizer) { }

  // methods  
  setPageStatus(pageStatus: string): void {
    this.pageStatus = pageStatus;
  }
  getPageStatus(): string {
    return this.pageStatus;
  }
  setActiveComponent(activeComponent: string): void {
    this.activeComponent = activeComponent;
  }
  getActiveComponent(): string {
    return this.activeComponent;
  }
  setSubmitText(text: string) {
    this.submitText = text;
  }
  getSubmitText() {
    return this.submitText;
  }
  setCarsList(_cars: Car[]): void {
    this.carsList = this.prepareMiniCarPost(_cars);
    this.disArei = this.carsList;
  }
  getCarsList(): MiniViewCar[] {
    return this.carsList;
  }
  getCarsNumber(): number {
    return this.carsList.length;
  }
  scrollDown(elementID: string): void {
    const element = document.getElementById(elementID);
    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  prepareMiniCarPost(cars: Car[]): MiniViewCar[] {
    const _cars: MiniViewCar[] = [];

    cars.forEach(car => {
      const _car: MiniViewCar = {
        make: car.make,
        model: car.model,
        year: car.year,
        mileage: car.mileage,
        description: car.description,
        fuel: car.fuel,
        cubicCapacity: car.cubicCapacity,
        power: car.power,
        transmission: car.transmission,
        traction: car.traction,
        body: car.body,
        wheel: car.wheel,
        price: car.price,
        state: car.state,
        postTime: new Date(car.postTime),

        yearAsString: car.year.toString(),
        mileageAsString: this.formatNumber(car.mileage),
        cubicCapacityAsString: this.formatNumber(car.cubicCapacity),
        powerAsString: this.formatNumber(car.power),
        priceAsString: this.formatNumber(car.price),
        postTimeAsString: this.formatDate(car.postTime),

        imagesAsBase64Strings: car.imagesAsBase64Strings,
        firstImage: this.getBase64Image(car.imagesAsBase64Strings)
      };

      _cars.push(_car);
    });

    return _cars;
  }
  getBase64Image(base64String: string): any {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${base64String}`);
  }
  formatNumber(number: number): string {
    let numberStr = number.toString();

    for (let i = numberStr.length - 3; i > 0; i -= 3)
      numberStr = numberStr.slice(0, i) + '.' + numberStr.slice(i);

    return numberStr;
  }
  formatDate(postTime: Date): string {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const formattedTime = moment(postTime);

    if (formattedTime.isSame(today, 'd'))
      return 'Today ' + formattedTime.format('HH:mm');
    else if (formattedTime.isSame(yesterday, 'd'))
      return 'Yesterday ' + formattedTime.format('HH:mm');
    else return formattedTime.format('D MMM HH:mm');
  }
  orderCars(sortMethod: string): void {
    switch (sortMethod) {
      case 'Post time (newest)':
        this.carsList.sort((firstCar: MiniViewCar, secondCar: MiniViewCar) =>
          secondCar.postTime.getTime() - firstCar.postTime.getTime());
        this.updateCarsList(this.carsList);
        break;
      case 'Post time (oldest)':
        this.carsList.sort((firstCar: MiniViewCar, secondCar: MiniViewCar) =>
          firstCar.postTime.getTime() - secondCar.postTime.getTime());
        this.updateCarsList(this.carsList);
        break;
      case 'Price (low to high)':
        this.carsList.sort((firstCar: MiniViewCar, secondCar: MiniViewCar) =>
          firstCar.price - secondCar.price);
        this.updateCarsList(this.carsList);
        break;
      case 'Price (high to low)':
        this.carsList.sort((firstCar: MiniViewCar, secondCar: MiniViewCar) =>
          secondCar.price - firstCar.price);
        this.updateCarsList(this.carsList);
        break;
      case 'Km (low to high)':
        this.carsList.sort((firstCar: MiniViewCar, secondCar: MiniViewCar) =>
          firstCar.mileage - secondCar.mileage);
        this.updateCarsList(this.carsList);
        break;
      case 'Km (high to low)':
        this.carsList.sort((firstCar: MiniViewCar, secondCar: MiniViewCar) =>
          secondCar.mileage - firstCar.mileage);
        this.updateCarsList(this.carsList);
        break;
    }
  }
  filterCars(_carsList: CarsListConstants): void {
    this.carsList = this.disArei;

    this.carsList = this.carsList.filter(car => {

      const makeMatches = _carsList.makes == undefined ||  _carsList.makes.length == 0 || _carsList.makes.map(item => item.label).includes(car.make);
      const bodyMatches = _carsList.bodies == undefined || _carsList.bodies.length == 0 || _carsList.bodies.map(item => item.label).includes(car.body);
      const priceMatches =
        (_carsList.priceFrom === undefined && _carsList.priceTo === undefined) ||
        (_carsList.priceFrom === undefined && _carsList.priceTo! >= car.price) ||
        (_carsList.priceFrom! <= car.price && _carsList.priceTo === undefined) ||
        (_carsList.priceFrom! <= car.price && _carsList.priceTo! >= car.price);
      const yearMatches =
        (_carsList.yearFrom === undefined && _carsList.yearTo === undefined) ||
        (_carsList.yearFrom === undefined && _carsList.yearTo! >= car.year) ||
        (_carsList.yearFrom! <= car.year && _carsList.yearTo === undefined) ||
        (_carsList.yearFrom! <= car.year && _carsList.yearTo! >= car.year);
      const mileageMatches =
        (_carsList.mileageFrom === undefined && _carsList.mileageTo === undefined) ||
        (_carsList.mileageFrom === undefined && _carsList.mileageTo! >= car.mileage) ||
        (_carsList.mileageFrom! <= car.mileage && _carsList.mileageTo === undefined) ||
        (_carsList.mileageFrom! <= car.mileage && _carsList.mileageTo! >= car.mileage);
      const fuelMatches = _carsList.fuels == undefined || _carsList.fuels.length == 0 || _carsList.fuels.map(item => item.label).includes(car.fuel);
      const cubicCapacityMatches =
        (_carsList.cubicCapacityFrom === undefined && _carsList.cubicCapacityTo === undefined) ||
        (_carsList.cubicCapacityFrom === undefined && _carsList.cubicCapacityTo! >= car.cubicCapacity) ||
        (_carsList.cubicCapacityFrom! <= car.cubicCapacity && _carsList.cubicCapacityTo! === undefined) ||
        (_carsList.cubicCapacityFrom! <= car.cubicCapacity && _carsList.cubicCapacityTo! >= car.cubicCapacity);
      const transmissionMatches = _carsList.transmissions == undefined || _carsList.transmissions.length == 0 || _carsList.transmissions.map(item => item.label).includes(car.transmission);
      const tractionMatches = _carsList.tractions == undefined || _carsList.tractions.length == 0 || _carsList.tractions.map(item => item.label).includes(car.traction);
      const wheelMatches = _carsList.wheels == undefined || _carsList.wheels.length == 0 || _carsList.wheels.map(item => item.label).includes(car.wheel);

      return makeMatches && bodyMatches && priceMatches && yearMatches && mileageMatches && fuelMatches && cubicCapacityMatches && transmissionMatches && tractionMatches && wheelMatches;
    });


    this.updateCarsList(this.carsList);
  }
}
