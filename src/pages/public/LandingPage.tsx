import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {Text, View, ViewStyle} from "react-native";
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
  fs18BoldGray3,
  fs24BoldBlack2,
  fs16RegGray3,
  sh8,
  sh32,
} from "../../styles";
import {GlobalContext} from "../../context/GlobalState";
import {CustomButton} from "../../components";
import {useNavigation} from "@react-navigation/native";
import {NavigationProps} from "../../types/route";

export const LandingPage: FunctionComponent = () => {
  const navigation = useNavigation<NavigationProps>();

  const {setAuthenticating} = useContext(GlobalContext);
  const [isAvailable, setIsAvailable] = useState(false);

  const handleDeviceIsAvailable = async () => {
    try {
      const rnBiometrics = new ReactNativeBiometrics();

      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      if (available) {
        return {
          available,
          biometryType,
          rnBiometrics: await rnBiometrics.createKeys(),
        };
      }

      return {available, biometryType};
    } catch (error) {
      console.log(error);
      return {available: false, biometryType: undefined};
    }
  };

  const handleAuthentication = async () => {
    const storedToken = await AsyncStorage.getItem("accessToken");
    if (storedToken) {
      const token = JSON.parse(storedToken);
      const {accessToken, publicKey} = token;

      if (!accessToken) return;

      if (publicKey) {
        const rnBiometrics = new ReactNativeBiometrics();
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: "Authenticate with Face ID",
        });

        if (!success) return;
      }

      setAuthenticating(true);
    }
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

  useEffect(() => {
    const availableDevice = async () => {
      const {available, biometryType} = (await handleDeviceIsAvailable()) ?? {};
      if (available && biometryType === BiometryTypes.FaceID) {
        const storedToken = await AsyncStorage.getItem("accessToken");

        if (!storedToken) {
          setIsAvailable(false);
          return;
        }
        const token = JSON.parse(storedToken);
        const {accessToken, publicKey} = token;
        setIsAvailable(accessToken && publicKey);
      }
    };
    availableDevice();
  }, []);

  return (
    <View style={{...flexChild, ...centerHV}}>
      <View style={centerVertical}>
        <Text style={fs18BoldGray3}>Earn Money</Text>
        <Text style={fs24BoldBlack2}>Trade Crypto</Text>
        <Text style={{...fs16RegGray3, paddingVertical: sh8}}>Spend Cash</Text>
      </View>
      <View style={{paddingVertical: sh32}}>
        {isAvailable ? (
          <CustomButton
            containerStyle={buttonStyle}
            title="Retry Biometrics"
            onPress={async () => await handleAuthentication()}
          />
        ) : null}
        <CustomButton
          containerStyle={buttonStyle}
          title="Sign In with passkey"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};
