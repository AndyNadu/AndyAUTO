import { AccountTab } from "../../Interfaces/Account-tab"

export class AccountUserTabsContants {
  userTabs: AccountTab[] = [
    { 
      name: 'personal-information',
      loading: false,
      icon: 'user',
      label: 'Personal information',
      route: '/account/personal-information'
    },
    { 
      name: 'my-cars',
      loading: false,
      icon: 'car',
      label: 'My cars',
      route: '/account/my-cars'
    },
    { 
      name: 'favourite-cars',
      loading: false,
      icon: 'heart',
      label: 'Favourite cars',
      route: '/account/favourite-cars'
    }
  ];
  
  employeeTabs: AccountTab[] = [
    { 
      name: 'users-list',
      loading: false,
      icon: 'users',
      label: 'Users list',
      route: '/account/manage/users-list'
    },
    { 
      name: 'unverified-cars-list',
      loading: false,
      icon: 'car',
      label: 'Unverified cars list',
      route: '/account/manage/unverified-cars-list'
    },
    { 
      name: 'locations',
      loading: false,
      icon: 'map-location-dot',
      label: 'Locations',
      route: '/account/manage/locations'
    },
  ];
}