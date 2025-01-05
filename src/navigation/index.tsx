import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics from "react-native-biometrics";
import {GlobalContext} from "../context/GlobalState";
import {colorWhite, flexChild} from "../styles";
import {PrivateRoute} from "./Private";
import {PublicRoute} from "./Public";

export const MainRoutes: FunctionComponent = () => {
  const {isAuthenticated, setAuthenticating} = useContext(GlobalContext);
  const [loading, setLoading] = useState<boolean>(true);

  const checkAndAuthenticate = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("accessToken");
      if (storedToken) {
        const token = JSON.parse(storedToken);
        const {accessToken, publicKey} = token;
        if (!accessToken) {
          setAuthenticating(false);
          return;
        }

        if (publicKey) {
          const rnBiometrics = new ReactNativeBiometrics();
          const {success} = await rnBiometrics.simplePrompt({
            promptMessage: "Authenticate with Face ID",
          });

          if (!success) {
            setAuthenticating(false);
            return;
          }
          setAuthenticating(success);
          return;
        }
        setAuthenticating(true);
      }
    } catch (error: any) {
      // console.warn("Error during authentication:", error || error.message);
      setAuthenticating(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authenticate = async () => {
      await checkAndAuthenticate();
    };
    authenticate();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{backgroundColor: colorWhite._3, ...flexChild}}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateRoute /> : <PublicRoute />}
    </NavigationContainer>
  );
};
