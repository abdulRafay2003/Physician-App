import {RouteNames} from '../config';
import {
  AppointmentDetail,
  Dashboard,
  Notifications,
  ReferredPatients,
} from '../screens';
import {DrawerStack} from './DrawerStack';

type HomeScreenStacksTypes = {
  name: string;
  component: React.FC<any>;
  key: string;
  option?: any;
}[];

export const HomeStack: HomeScreenStacksTypes = [
  {
    name: RouteNames.HomeRoutes.DrawerStack,
    component: DrawerStack,
    key: RouteNames.HomeRoutes.DrawerStack,
  },
  {
    name: RouteNames.HomeRoutes.Dashboard,
    component: Dashboard,
    key: RouteNames.HomeRoutes.Dashboard,
  },
  {
    name: RouteNames.HomeRoutes.Notifications,
    component: Notifications,
    key: RouteNames.HomeRoutes.Notifications,
  },
  {
    name: RouteNames.HomeRoutes.AppointmentDetail,
    component: AppointmentDetail,
    key: RouteNames.HomeRoutes.AppointmentDetail,
  },
  {
    name: RouteNames.HomeRoutes.ReferredPatients,
    component: ReferredPatients,
    key: RouteNames.HomeRoutes.ReferredPatients,
  },
];
