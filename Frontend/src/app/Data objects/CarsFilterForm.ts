import { SelectItem } from 'primeng/api';
import { InputNumber } from 'primeng/inputnumber';

export class CarsFilterForm {

  makes: SelectItem[] = [];
  models: String[] = [];
  bodies: SelectItem[] = [];
  fuels: SelectItem[] = [];
  transmissions: SelectItem[] = [];
  tractions: SelectItem[] = [];
  wheels: SelectItem[] = [];

  priceFrom!: number;
  priceTo!: number;
  yearFrom!: number;
  yearTo!: number;
  mileageFrom!: number;
  mileageTo!: number;
  cubicCapacityFrom!: number;
  cubicCapacityTo!: number;

}
