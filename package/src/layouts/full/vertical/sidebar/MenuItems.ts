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
    id: uniqueId(),
    title: 'General',
    icon: 'screencast-2-linear',
    href: 'https://materialpro-react-main.netlify.app/',
    chip: "Pro",
  },
  {
    id: uniqueId(),
    title: 'Asistencias',
    icon: 'atom-linear',
    href: 'Asistencias',
  },
  {
    id: uniqueId(),
    title: 'Analytical',
    icon: 'box-minimalistic-linear',
    href: 'https://materialpro-react-main.netlify.app/dashboards/analytical',
    chip: "Pro",
  },
  {
    id: uniqueId(),
    title: 'Campaign',
    icon: 'buildings-2-linear',
    href: 'https://materialpro-react-main.netlify.app/dashboards/campaign',
    chip: "Pro",
  },
  {
    id: uniqueId(),
    title: 'Modern',
    icon: 'basketball-linear',
    href: 'https://materialpro-react-main.netlify.app/dashboards/modern',
    chip: "Pro",
  }
];

export default Menuitems;
