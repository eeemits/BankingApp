import React, {FunctionComponent, useContext} from "react";
import {Text, View, TouchableOpacity, Alert, ViewStyle} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics, {BiometryTypes} from "react-native-biometrics";
import {
  colorBlue,
  flexChild,
  centerHV,
  centerVertical,
  sh12,
  sw40,
  sh5,
  sw4,
  sh2,
  sw25,
  fs16BoldWhite1,
  fs18BoldGray3,
  fs24BoldBlack2,
  fs16RegGray3,
  sh8,
  sh32,
} from "../../styles";
import {LoginResponse} from "../../types/user";
import {GlobalContext} from "../../context/GlobalState";

export const LandingPage: FunctionComponent = () => {
  const {setAuthenticating} = useContext(GlobalContext);
  const verifyUserCredentials = async (): Promise<LoginResponse> => {
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          username: "emilys",
          password: "emilyspass",
          expiresInMins: 30,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error verifying user credentials:", error);
      throw error;
    }
  };

  const handleAuthentication = async () => {
    const {accessToken} = await verifyUserCredentials();

    const rnBiometrics = new ReactNativeBiometrics();

    const {available, biometryType} = await rnBiometrics.isSensorAvailable();

    if (available && biometryType === BiometryTypes.FaceID) {
      Alert.alert(
        "Face ID",
        "Would you like to enable Face ID authentication for the next time?",
        [
          {
            text: "Yes please",
            onPress: async () => {
              const {publicKey} = await rnBiometrics.createKeys();
              const storage = {accessToken, publicKey};

              await AsyncStorage.setItem(
                "accessToken",
                JSON.stringify(storage),
              );
            },
          },
          {text: "Cancel", style: "cancel"},
        ],
      );
    }

    const storage = {accessToken};

    await AsyncStorage.setItem("accessToken", JSON.stringify(storage));
    setAuthenticating(true);
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: colorBlue._3,
    paddingVertical: sh12,
    paddingHorizontal: sw40,
    borderRadius: sw25,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: sh2},
    shadowOpacity: 0.3,
    shadowRadius: sw4,
    elevation: sh5,
  };

  return (
    <View style={{...flexChild, ...centerHV}}>
      <View style={centerVertical}>
        <Text style={fs18BoldGray3}>Earn Money</Text>
        <Text style={fs24BoldBlack2}>Trade Crypto</Text>
        <Text style={{...fs16RegGray3, paddingVertical: sh8}}>Spend Cash</Text>
      </View>
      <View style={{paddingVertical: sh32}}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={async () => await handleAuthentication()}>
          <Text style={fs16BoldWhite1}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
