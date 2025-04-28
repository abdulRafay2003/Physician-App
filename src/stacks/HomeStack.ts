import {RouteNames} from '../config';
import {Dashboard, WebView} from '../screens';
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
    name: RouteNames.HomeRoutes.WebView,
    component: WebView,
    key: RouteNames.HomeRoutes.WebView,
  },
  {
    name: RouteNames.HomeRoutes.Dashboard,
    component: Dashboard,
    key: RouteNames.HomeRoutes.Dashboard,
  },
];
