import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {FunctionComponent} from "react";
import {INavigationParamsList} from "../types/route";
import {DashboardPage} from "../pages/private/DashboardPage";
import {DetailsPage} from "../pages/private/DetailsPage";

const {Screen, Navigator} = createNativeStackNavigator<INavigationParamsList>();

export const PublicRoute: FunctionComponent = () => {
  return (
    <Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Dashboard">
      <Screen name="Dashboard" component={DashboardPage} />
      <Screen name="TransactionDetails" component={DetailsPage} />
    </Navigator>
  );
};
