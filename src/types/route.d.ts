import {ParamListBase} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";

export interface INavigationParamsList extends ParamListBase {
  Dashboard: undefined;
  TransactionDetails: undefined;
  SignUp: undefined;
}

export type NavigationProps = NativeStackNavigationProp<INavigationParamsList>;
