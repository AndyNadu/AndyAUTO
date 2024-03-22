import { SelectItem } from "primeng/api/selectitem";

export interface CarDetails {
  makes: SelectItem[],
  models: SelectItem[],
  bodies: SelectItem[],
  fuels: SelectItem[],
  transmissions: SelectItem[],
  tractions: SelectItem[],
  wheels: SelectItem[]
}