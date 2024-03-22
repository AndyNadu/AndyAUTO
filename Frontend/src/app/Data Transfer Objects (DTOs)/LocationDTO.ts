import { SafeResourceUrl } from "@angular/platform-browser";

export interface LocationDTO {
  id?: string;
  address?: string;
  manager?: string;
  phoneNumber?: string;
  imageAsBase64Strings?: string;
  image?: SafeResourceUrl;
}