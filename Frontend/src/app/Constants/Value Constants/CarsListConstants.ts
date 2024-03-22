import { SelectItem } from 'primeng/api';
import { SelectItemGroup } from 'primeng/api';

export class CarsListConstants {

  modelInputDisabled: boolean = true;
  make!: string;
  ModelsByMake: SelectItemGroup[] = [];
  ModelsForOneMake: SelectItem[] = [];




  // methods


  // onMakeSelected(_makesList: SelectItem[]): void {
  //   this.modelInputDisabled = _makesList.length == 0 ? true : false;
  //   this.ModelsByMake = this.ExtractModelsByMake(_makesList);
  // }
  // UpdateModels(): void {
  //   const tempGroup = this.group.find(tempGroup => tempGroup.label === this.make);

  //   this.ModelsForOneMake = tempGroup ? tempGroup.items.map(item => ({ label: item.label, value: item.value })) : [];
  // }

}
