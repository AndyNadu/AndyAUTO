import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface AccountTab {
  name: string;
  loading: boolean;
  icon: IconName;
  label: string;
  route: string;
}