export class NavbarPagesConstants {
  pages: { label: string, routerLink: string }[] = [
    {
      label: 'Home',
      routerLink: ''
    },
    {
      label: 'Buy a car',
      routerLink: '/buy-a-car'
    },
    {
      label: 'Sell a car',
      routerLink: (sessionStorage.getItem('userId') || localStorage.getItem('userId')) != null ? '/sell-a-car' : '/account/login'
    },
    {
      label: (sessionStorage.getItem('userId') || localStorage.getItem('userId')) != null ? 'My account' : 'Account',
      routerLink: (sessionStorage.getItem('userId') || localStorage.getItem('userId')) != null ? '/account/personal-information' : '/account/login'
    }
  ]
}