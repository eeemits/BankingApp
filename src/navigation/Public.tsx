import {createNativeStackNavigator} from "@react-navigation/native-stack";
import React, {FunctionComponent} from "react";
import {INavigationParamsList} from "../types/route";
import {LandingPage} from "../pages/public/LandingPage";
import {LoginPage} from "../pages/public/LoginPage";

const {Screen, Navigator} = createNativeStackNavigator<INavigationParamsList>();

export const PublicRoute: FunctionComponent = () => {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Landing">
      <Screen name="Login" component={LoginPage} />
      <Screen name="Landing" component={LandingPage} />
    </Navigator>
  );
};
