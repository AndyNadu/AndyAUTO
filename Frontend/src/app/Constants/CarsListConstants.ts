// primeNG components
import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';

export class CarsListConstants {

  // variables
  group: SelectItemGroup[] = this.GenerateSelectItemGroup();
  modelInputDisabled: boolean = true;

  MakesArray: SelectItem[] = this.ExtractMakesFromGroup();
  makes!: SelectItem[];
  make!: string;

  ModelsByMake: SelectItemGroup[] = [];
  ModelsForOneMake: SelectItem[] = [];
  models!: SelectItem[];

  BodyTypes: SelectItem[] = [
    { label: 'Sedan', value: 'Sedan' },
    { label: 'Cabriolet', value: 'Cabriolet' },
    { label: 'Estate car', value: 'Estate car' },
    { label: 'Saloon', value: 'Saloon' },
    { label: 'SUV', value: 'SUV' },
    { label: 'Coupe', value: 'Coupe' },
    { label: 'Small car', value: 'Small car' },
    { label: 'Van / minibus', value: 'Van / minibus' }
  ];
  bodies!: SelectItem[];

  FuelTypes: SelectItem[] = [
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Gasoline', value: 'Gasoline' },
    { label: 'Electric', value: 'Electric' },
    { label: 'Hybrid', value: 'Hybrid' }
  ];
  fuels!: SelectItem[];

  TransmissionTypes: SelectItem[] = [
    { label: 'Automatic', value: 'Automatic' },
    { label: 'Manual', value: 'Manual' },
    { label: 'CVT', value: 'CVT' }
  ];
  transmissions!: SelectItem[];

  TractionTypes: SelectItem[] = [
    { label: 'Rear wheel drive', value: 'Rear wheel drive' },
    { label: 'Front wheel drive', value: 'Front wheel drive' },
    { label: 'All wheel drive', value: 'All wheel drive' }
  ];
  tractions!: SelectItem[];

  SteeringWheels: SelectItem[] = [
    { label: 'Left side', value: 'Left side' },
    { label: 'Right side', value: 'Left side' }
  ];
  wheels!: SelectItem[];

  // methods
  GenerateSelectItemGroup(): SelectItemGroup[] {
    const tempGroup: SelectItemGroup[] = [
      {
        label: 'Audi',
        items:
          [
            { label: 'A1', value: 'A1' },
            { label: 'A2', value: 'A2' },
            { label: 'A3', value: 'A3' },
            { label: 'A4', value: 'A4' },
            { label: 'A5', value: 'A5' },
            { label: 'A6', value: 'A6' },
            { label: 'A6 e-tron', value: 'A6 e-tron' },
            { label: 'A7', value: 'A7' },
            { label: 'A8', value: 'A8' },
            { label: 'R8', value: 'R8' },
            { label: 'Q2', value: 'Q2' },
            { label: 'Q3', value: 'Q3' },
            { label: 'Q4 e-tron', value: 'Q4 e-tron' },
            { label: 'Q5', value: 'Q5' },
            { label: 'Q7', value: 'Q7' },
            { label: 'Q8', value: 'Q8' },
            { label: 'Q8 e-tron', value: 'Q8 e-tron' },
            { label: 'RS 2', value: 'RS 2' },
            { label: 'RS 3', value: 'RS 3' },
            { label: 'RS 4', value: 'RS 4' },
            { label: 'RS 5', value: 'RS 5' },
            { label: 'RS 6', value: 'RS 6' },
            { label: 'RS 7', value: 'RS 7' },
            { label: 'RS Q3', value: 'RS Q3' },
            { label: 'RS Q8', value: 'RS Q8' },
            { label: 'S1', value: 'S1' },
            { label: 'S2', value: 'S2' },
            { label: 'S3', value: 'S3' },
            { label: 'S4', value: 'S4' },
            { label: 'S5', value: 'S5' },
            { label: 'S6', value: 'S6' },
            { label: 'S7', value: 'S7' },
            { label: 'S8', value: 'S8' },
            { label: 'SQ2', value: 'SQ2' },
            { label: 'SQ5', value: 'SQ5' },
            { label: 'SQ7', value: 'SQ7' },
            { label: 'SQ8', value: 'SQ8' },
            { label: 'SQ8 e-tron', value: 'SQ8 e-tron' },
            { label: 'TT', value: 'TT' },
            { label: '100', value: '100' },
            { label: '200', value: '200' },
            { label: '50', value: '50' },
            { label: '5000', value: '5000' },
            { label: '80', value: '80' },
            { label: '90', value: '90' }
          ]
      },
      {
        label: 'BMW',
        items:
          [
            { label: '1 series', value: '1 series' },
            { label: '2 series', value: '2 series' },
            { label: '3 series', value: '3 series' },
            { label: '4 series', value: '4 series' },
            { label: '5 series', value: '5 series' },
            { label: '6 series', value: '6 series' },
            { label: '7 series', value: '7 series' },
            { label: '8 series', value: '8 series' },
            { label: 'i3', value: 'i3' },
            { label: 'i4', value: 'i4' },
            { label: 'i5', value: 'i5' },
            { label: 'i7', value: 'i7' },
            { label: 'i8', value: 'i8' },
            { label: 'iX', value: 'iX' },
            { label: 'iX1', value: 'iX1' },
            { label: 'iX2', value: 'iX2' },
            { label: 'iX3', value: 'iX3' },
            { label: 'iX5', value: 'iX5' },
            { label: 'M1', value: 'M1' },
            { label: 'M2', value: 'M2' },
            { label: 'M3', value: 'M3' },
            { label: 'M4', value: 'M4' },
            { label: 'M5', value: 'M5' },
            { label: 'M6', value: 'M6' },
            { label: 'M8', value: 'M8' },
            { label: 'X1', value: 'X1' },
            { label: 'X2', value: 'X2' },
            { label: 'X3', value: 'X3' },
            { label: 'X4', value: 'X4' },
            { label: 'X5', value: 'X5' },
            { label: 'X6', value: 'X6' },
            { label: 'X7', value: 'X7' },
            { label: 'XM', value: 'XM' },
            { label: 'X3M', value: 'X3M' },
            { label: 'X4M', value: 'X4M' },
            { label: 'X5M', value: 'X5M' },
            { label: 'X6M', value: 'X6M' },
            { label: 'Z1', value: 'Z1' },
            { label: 'Z3', value: 'Z3' },
            { label: 'Z4', value: 'Z4' },
            { label: 'Z8', value: 'Z8' }
          ]
      },
      {
        label: 'Mercedes-Benz',
        items:
          [
            { label: 'A Class', value: 'A Class' },
            { label: 'B Class', value: 'B Class' },
            { label: 'C Class', value: 'C Class' },
            { label: 'E Class', value: 'E Class' },
            { label: 'G Class', value: 'G Class' },
            { label: 'S Class', value: 'S Class' },
            { label: 'V Class', value: 'V Class' },
            { label: 'AMG GT', value: 'AMG GT' },
            { label: 'CLA', value: 'CLA' },
            { label: 'CLC', value: 'CLC' },
            { label: 'CLE', value: 'CLE' },
            { label: 'CLK', value: 'CLK' },
            { label: 'CLS', value: 'CLS' },
            { label: 'EQA', value: 'EQA' },
            { label: 'EQB', value: 'EQB' },
            { label: 'EQC', value: 'EQC' },
            { label: 'EQE', value: 'EQE' },
            { label: 'EQG', value: 'EQG' },
            { label: 'EQS', value: 'EQS' },
            { label: 'EQV', value: 'EQV' },
            { label: 'GLA', value: 'GLA' },
            { label: 'GLB', value: 'GLB' },
            { label: 'GLC', value: 'GLC' },
            { label: 'GLE', value: 'GLE' },
            { label: 'GLK', value: 'GLK' },
            { label: 'GLS', value: 'GLS' },
            { label: 'SL', value: 'SL' },
            { label: 'SLC', value: 'SLC' },
            { label: 'SLK', value: 'SLK' },
            { label: 'SLS AMG', value: 'SLS AMG' },
            { label: 'Vaneo', value: 'Vaneo' },
            { label: 'Viano', value: 'Viano' },
            { label: 'Vito', value: 'Vito' }
          ]
      },
      {
        label: 'Porsche',
        items:
          [
            { label: 'Boxster', value: 'Boxster' },
            { label: 'Carrera GT', value: 'Carrera GT' },
            { label: 'Cayenne', value: 'Cayenne' },
            { label: 'Cayman', value: 'Cayman' },
            { label: 'Macan', value: 'Macan' },
            { label: 'Panamenra', value: 'Panamenra' },
            { label: 'Taycan', value: 'Taycan' },
            { label: '356', value: '356' },
            { label: '718', value: '718' },
            { label: '911', value: '911' },
            { label: '912', value: '912' },
            { label: '914', value: '914' },
            { label: '917', value: '917' },
            { label: '918', value: '918' },
            { label: '924', value: '924' },
            { label: '928', value: '928' },
            { label: '944', value: '944' },
            { label: '959', value: '959' },
            { label: '968', value: '968' }
          ]
      },
      {
        label: 'Tesla',
        items:
          [
            { label: 'Cybertruck', value: 'Cybertruck' },
            { label: 'Model 3', value: 'Model 3' },
            { label: 'Model S', value: 'Model S' },
            { label: 'Model X', value: 'Model X' },
            { label: 'Model Y', value: 'Model Y' },
            { label: 'Roadster', value: 'Roadster' }
          ]
      },
      {
        label: 'Volvo',
        items:
          [
            { label: 'C30', value: 'C30' },
            { label: 'C40', value: 'C40' },
            { label: 'C70', value: 'C70' },
            { label: 'EX30', value: 'EX30' },
            { label: 'EX90', value: 'EX90' },
            { label: 'S40', value: 'S40' },
            { label: 'S60', value: 'S60' },
            { label: 'S70', value: 'S70' },
            { label: 'S80', value: 'S80' },
            { label: 'S90', value: 'S90' },
            { label: 'V40', value: 'V40' },
            { label: 'V50', value: 'V50' },
            { label: 'V60', value: 'V60' },
            { label: 'V70', value: 'V70' },
            { label: 'V90', value: 'V90' },
            { label: 'XC40', value: 'XC40' },
            { label: 'XC60', value: 'XC60' },
            { label: 'XC70', value: 'XC70' },
            { label: 'XC90', value: 'XC90' },
            { label: '140', value: '140' },
            { label: '164', value: '164' },
            { label: '1800', value: '1800' },
            { label: '240', value: '240' },
            { label: '260', value: '260' },
            { label: '440 K', value: '440 K' },
            { label: '460 L', value: '460 L' },
            { label: '480 E', value: '480 E' },
            { label: '66', value: '66' },
            { label: '740', value: '740' },
            { label: '760', value: '760' },
            { label: '780 Bertone', value: '780 Bertone' },
            { label: '850', value: '850' },
            { label: '940', value: '940' },
            { label: '960', value: '960' }
          ]
      }
    ];

    return tempGroup;
  }
  ExtractMakesFromGroup(): SelectItem[] {
    const labelsOnly: SelectItem[] = this.group.map(group => ({
      label: group.label,
      value: group.label 
    }));

    return labelsOnly;
  }
  ExtractModelsByMake(): SelectItemGroup[] {
    const tempGroup: SelectItemGroup[] = this.group.filter
      (group => this.makes.some(make => make.label === group.label));

    return tempGroup;
  }
  MakeSelected(): void {
    this.modelInputDisabled = this.makes.length == 0 ? true : false;

    this.ModelsByMake = this.ExtractModelsByMake()
  }
  UpdateModels(): void {
    const tempGroup = this.group.find(tempGroup => tempGroup.label === this.make);

    this.ModelsForOneMake = tempGroup ? tempGroup.items.map(item => ({ label: item.label, value: item.value })) : [];
}
}
