import { uniqueId } from 'lodash';

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

const Menuitems: MenuitemsType[] = [
  {
    navlabel: true,
    subheader: 'Personal',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: 'layers-minimalistic-line-duotone',
    href: '/',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Registro',
    icon: "sort-by-alphabet-outline",
    href: '/form-elements/autocomplete',
  },
  {
    id: uniqueId(),
    title: 'Asistencia',
    icon: "menu-dots-circle-line-duotone",
    href: '/form-elements/button',
  },
  {
    id: uniqueId(),
    title: 'Checkbox',
    icon: "check-square-linear",
    href: '/form-elements/checkbox',
  },
  {
    id: uniqueId(),
    title: 'Radio',
    icon: "radar-outline",
    href: '/form-elements/radio',
  },
  {
    id: uniqueId(),
    title: 'Slider',
    icon: "slider-vertical-minimalistic-outline",
    href: '/form-elements/slider',
  },
  {
    id: uniqueId(),
    title: 'Switch',
    icon: "shield-minimalistic-outline",
    href: '/form-elements/switch',
  },
  {
    id: uniqueId(),
    title: 'Tables',
    icon: "menu-dots-square-line-duotone",
    href: '/tables/basic-table',
  },
  {
    id: uniqueId(),
    title: 'Form Layouts',
    icon: "window-frame-linear",
    href: '/form-layouts',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: "text-bold",
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: "box-minimalistic-bold-duotone",
    href: '/ui/shadow',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: "window-frame-broken",
    href: '/sample-page',
  },
];

export default Menuitems;
