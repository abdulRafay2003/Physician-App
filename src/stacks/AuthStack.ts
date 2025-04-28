import {RouteNames} from '../config';
import {ForgotPassword, LoginScreen} from '../screens';
import {ForgotPasswordProps, LoginScreenProps} from '../screens/propTypes';

type AuthScreenStacksTypes = {
  name: string;
  component: React.FC<LoginScreenProps> | React.FC<ForgotPasswordProps>;

  key: string;
}[];

export const AuthStack: AuthScreenStacksTypes = [
  {
    name: RouteNames.AuthRoutes.LoginScreen,
    component: LoginScreen,
    key: RouteNames.AuthRoutes.LoginScreen,
  },
  {
    name: RouteNames.AuthRoutes.ForgotPasswordScreen,
    component: ForgotPassword,
    key: RouteNames.AuthRoutes.ForgotPasswordScreen,
  },
];
