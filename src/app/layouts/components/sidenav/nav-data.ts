import { INavbarData } from "./interfaces/nav-bar-data.interface";

export const navabarData: INavbarData[] = [
  {
    routerLink: 'dashboard',
    icon: 'fal fa-home',
    label: 'DASHBOARD'
  },
  {
    label: 'WORK',
    isGroupHeader: true
  },
  {
    routerLink: 'catalog',
    icon: 'fal fa-book',
    label: 'CATALOG'
  },
  {
    routerLink: 'readers',
    icon: 'fal fa-users',
    label: 'READERS'
  },
  {
    routerLink: 'issue',
    icon: 'fal fa-arrow-right',
    label: 'ISSUE'
  },
  {
    routerLink: 'return',
    icon: 'fal fa-undo',
    label: 'RETURN'
  },
  {
    routerLink: 'fines',
    icon: 'fal fa-dollar-sign',
    label: 'FINES'
  },
  {
    routerLink: 'repairs',
    icon: 'fal fa-wrench',
    label: 'REPAIRS'
  },
  {
    routerLink: 'orders',
    icon: 'fal fa-box',
    label: 'ORDERS'
  }
]
