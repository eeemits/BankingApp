import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {FunctionComponent} from "react";
import {INavigationParamsList} from "../types/route";
import {LandingPage} from "../pages/public/LandingPage";

const {Screen, Navigator} = createNativeStackNavigator<INavigationParamsList>();

export const PrivateRoute: FunctionComponent = () => {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <Screen name="Login" component={LandingPage} />
    </Navigator>
  );
};
