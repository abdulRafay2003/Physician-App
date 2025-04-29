import {RouteNames} from '../config';
import {LoginScreen} from '../screens';
import {LoginScreenProps} from '../screens/propTypes';

type AuthScreenStacksTypes = {
  name: string;
  component: React.FC<LoginScreenProps>;
  key: string;
}[];

export const AuthStack: AuthScreenStacksTypes = [
  {
    name: RouteNames.AuthRoutes.LoginScreen,
    component: LoginScreen,
    key: RouteNames.AuthRoutes.LoginScreen,
  },
];
