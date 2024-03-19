// angular
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// rxjs
import { Observable, Subject } from 'rxjs';

// interfaces && constants && data objects
import { CarsFilterForm } from '../../Data objects/CarsFilterForm';
import { Car } from '../../Interfaces/Car';

// moment
import moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  // members
  private allCarsList: Car[] = [];
  private filteredCarsList: Car[] = [];
  private filteredCarsListSubject: Subject<Car[]> = new Subject<Car[]>();
  private sortMethod: string = '';


  // constructor
  constructor(private _sanitizer: DomSanitizer) { }


  // methodsd
  applyFilters(_filtersList: CarsFilterForm): void {
    this.filteredCarsList = this.allCarsList.filter(car => {

      const makeMatches: boolean = _filtersList.makes == undefined || _filtersList.makes.length == 0 || _filtersList.makes.map(item => item.label).includes(car.make);
      const modelMatches: boolean = _filtersList.models == undefined || _filtersList.models.length == 0 || _filtersList.models.includes(car.model);
      const fuelMatches: boolean = _filtersList.fuels == undefined || _filtersList.fuels.length == 0 || _filtersList.fuels.map(item => item.label).includes(car.fuel);
      const transmissionMatches: boolean = _filtersList.transmissions == undefined || _filtersList.transmissions.length == 0 || _filtersList.transmissions.map(item => item.label).includes(car.transmission);
      const tractionMatches: boolean = _filtersList.tractions == undefined || _filtersList.tractions.length == 0 || _filtersList.tractions.map(item => item.label).includes(car.traction);
      const bodyMatches: boolean = _filtersList.bodies == undefined || _filtersList.bodies.length == 0 || _filtersList.bodies.map(item => item.label).includes(car.body);
      const wheelMatches: boolean = _filtersList.wheels == undefined || _filtersList.wheels.length == 0 || _filtersList.wheels.map(item => item.label).includes(car.wheel);

      const priceMatches: boolean =
        (_filtersList.priceFrom == (undefined || null) && _filtersList.priceTo == (undefined || null)) ||
        (_filtersList.priceFrom == (undefined || null) && _filtersList.priceTo! >= car.price) ||
        (_filtersList.priceFrom <= car.price && _filtersList.priceTo == (undefined || null)) ||
        (_filtersList.priceFrom! <= car.price && _filtersList.priceTo! >= car.price);
      const yearMatches: boolean =
        (_filtersList.yearFrom == (undefined || null) && _filtersList.yearTo == (undefined || null)) ||
        (_filtersList.yearFrom == (undefined || null) && _filtersList.yearTo! >= car.year) ||
        (_filtersList.yearFrom! <= car.year && _filtersList.yearTo == (undefined || null)) ||
        (_filtersList.yearFrom! <= car.year && _filtersList.yearTo! >= car.year);
      const mileageMatches: boolean =
        (_filtersList.mileageFrom == (undefined || null) && _filtersList.mileageTo == (undefined || null)) ||
        (_filtersList.mileageFrom == (undefined || null) && _filtersList.mileageTo! >= car.mileage) ||
        (_filtersList.mileageFrom! <= car.mileage && _filtersList.mileageTo == (undefined || null)) ||
        (_filtersList.mileageFrom! <= car.mileage && _filtersList.mileageTo! >= car.mileage);
      const cubicCapacityMatches: boolean =
        (_filtersList.cubicCapacityFrom == (undefined || null) && _filtersList.cubicCapacityTo == (undefined || null)) ||
        (_filtersList.cubicCapacityFrom == (undefined || null) && _filtersList.cubicCapacityTo! >= car.cubicCapacity) ||
        (_filtersList.cubicCapacityFrom! <= car.cubicCapacity && _filtersList.cubicCapacityTo! == (undefined || null)) ||
        (_filtersList.cubicCapacityFrom! <= car.cubicCapacity && _filtersList.cubicCapacityTo! >= car.cubicCapacity);

      return makeMatches && modelMatches && fuelMatches && transmissionMatches && tractionMatches && bodyMatches && wheelMatches && priceMatches && yearMatches && mileageMatches && cubicCapacityMatches;
    });

    this.orderCars(this.sortMethod);
    this.updateCarsList(this.filteredCarsList);
  }
  resetFilters(): void {
    this.filteredCarsList = this.allCarsList;
    this.orderCars(this.sortMethod);
    this.updateCarsList(this.filteredCarsList);
  }
  getCarsListSubject(): Observable<Car[]> {
    return this.filteredCarsListSubject.asObservable();
  }
  updateCarsList(_carsList: Car[]): void {
    this.filteredCarsListSubject.next(_carsList);
  }
  setCarsList(_cars: Car[]): void {
    this.allCarsList = this.prepareMiniCarPost(_cars);
    this.filteredCarsList = this.allCarsList;
    this.updateCarsList(this.filteredCarsList);
  }
  getCarsList(): Car[] {
    return this.filteredCarsList;
  }
  prepareMiniCarPost(_cars: Car[]): Car[] {
    const cars: Car[] = [];

    _cars.forEach(car => {
      const _car: Car = {
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
        firstImage: this.getBase64Image(car.imagesAsBase64Strings[0])
      };

      cars.push(_car);
    });

    return cars;
  }
  formatNumber(_number: number): string {
    let numberStr = _number.toString();

    for (let i = numberStr.length - 3; i > 0; i -= 3)
      numberStr = numberStr.slice(0, i) + '.' + numberStr.slice(i);

    return numberStr;
  }
  formatDate(_postTime: Date): string {
    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
    const formattedTime = moment(_postTime);

    if (formattedTime.isSame(today, 'd'))
      return 'Today ' + formattedTime.format('HH:mm');
    else if (formattedTime.isSame(yesterday, 'd'))
      return 'Yesterday ' + formattedTime.format('HH:mm');
    else return formattedTime.format('D MMM HH:mm');
  }
  getBase64Image(base64String: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${base64String}`);
  }
  getCarsNumber(): number {
    return this.filteredCarsList.length;
  }
  orderCars(_sortMethod: string): void {
    this.sortMethod = _sortMethod;

    switch (_sortMethod) {
      case 'Post time (newest)':
        this.filteredCarsList.sort((firstCar: Car, secondCar: Car) =>
          secondCar.postTime.getTime() - firstCar.postTime.getTime());
        this.updateCarsList(this.filteredCarsList);
        break;
      case 'Post time (oldest)':
        this.filteredCarsList.sort((firstCar: Car, secondCar: Car) =>
          firstCar.postTime.getTime() - secondCar.postTime.getTime());
        this.updateCarsList(this.filteredCarsList);
        break;
      case 'Price (low to high)':
        this.filteredCarsList.sort((firstCar: Car, secondCar: Car) =>
          firstCar.price - secondCar.price);
        this.updateCarsList(this.filteredCarsList);
        break;
      case 'Price (high to low)':
        this.filteredCarsList.sort((firstCar: Car, secondCar: Car) =>
          secondCar.price - firstCar.price);
        this.updateCarsList(this.filteredCarsList);
        break;
      case 'Km (low to high)':
        this.filteredCarsList.sort((firstCar: Car, secondCar: Car) =>
          firstCar.mileage - secondCar.mileage);
        this.updateCarsList(this.filteredCarsList);
        break;
      case 'Km (high to low)':
        this.filteredCarsList.sort((firstCar: Car, secondCar: Car) =>
          secondCar.mileage - firstCar.mileage);
        this.updateCarsList(this.filteredCarsList);
        break;
    }
  }

}
