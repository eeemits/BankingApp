import {ActivityIndicator, SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";
import {GlobalContext, GlobalProvider} from "../context/GlobalState";
import {colorWhite, flexChild} from "../styles";
import {PublicRoute} from "./Private";
import {PrivateRoute} from "./Public";

export const MainRoutes: FunctionComponent = () => {
  const {isAuthenticated, setAuthenticating} = useContext(GlobalContext);
  const [loading, setLoading] = useState(true); // To manage app loading state

  const checkAndAuthenticate = async () => {
    setLoading(true);

    try {
      const storedToken = await AsyncStorage.getItem("accessToken");
      if (storedToken) {
        const token = JSON.parse(storedToken);
        const {accessToken, publicKey} = token;

        if (!accessToken) return setAuthenticating(false);

        if (publicKey) {
          const rnBiometrics = new ReactNativeBiometrics();
          const {success} = await rnBiometrics.simplePrompt({
            promptMessage: "Authenticate with Face ID",
          });

          if (success) {
            setAuthenticating(true);
          } else {
            console.error("Biometric authentication failed");
            setAuthenticating(false);
          }
        } else {
          setAuthenticating(true);
        }
      } else {
        setAuthenticating(false);
      }
    } catch (error) {
      console.log("Error during authentication:", error!);
      setAuthenticating(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAndAuthenticate();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{backgroundColor: colorWhite._3, ...flexChild}}>
        <ActivityIndicator></ActivityIndicator>
      </SafeAreaView>
    );
  }

  return (
    <GlobalProvider>
      <NavigationContainer>
        {isAuthenticated ? <PrivateRoute /> : <PublicRoute />}
      </NavigationContainer>
    </GlobalProvider>
  );
};
