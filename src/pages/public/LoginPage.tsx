import {View, Alert, TouchableOpacity} from "react-native";
import React, {Fragment, FunctionComponent, useContext, useRef} from "react";
import {
  centerHV,
  colorBlue,
  colorGreen,
  flexChild,
  fs20BoldGray1,
  fullWidth,
  sh12,
  sh16,
  sh40,
  sh8,
  sw12,
  sw20,
  sw25,
  sw32,
  sw40,
} from "../../styles";
import {
  CardContainer,
  CustomButton,
  CustomSpacer,
  CustomTextInput,
  Icon,
} from "../../components";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeBiometrics, {BiometryTypes} from "react-native-biometrics";
import {GlobalContext} from "../../context/GlobalState";
import {NavigationProps} from "../../types/route";
import {LoginResponse} from "../../types/user";
import {isNotEmptyString} from "../../utils";

export const LoginPage: FunctionComponent = () => {
  const user = useRef({username: "", password: ""});
  const navigation = useNavigation<NavigationProps>();

  const {setAuthenticating} = useContext(GlobalContext);

  const verifyUserCredentials = async (): Promise<LoginResponse> => {
    const request = JSON.stringify({
      username: user.current.username,
      password: user.current.password,
      expiresInMins: 30,
    });
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: request,

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

  const handleSignIn = async () => {
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
              setAuthenticating(true);
            },
          },
          {
            text: "No",
            style: "cancel",
            onPress: async () => {
              const storage = {accessToken};
              await AsyncStorage.setItem(
                "accessToken",
                JSON.stringify(storage),
              );
              setAuthenticating(true);
            },
          },
        ],
      );
      return;
    }
    const storage = {accessToken};
    await AsyncStorage.setItem("accessToken", JSON.stringify(storage));
    setAuthenticating(true);
  };
  return (
    <Fragment>
      <TouchableOpacity
        style={{
          paddingTop: sh40,
          left: sw12,
        }}
        onPress={() => navigation.pop()}>
        <Icon name="arrow-back-circle" size={sw32} color={colorGreen._1} />
      </TouchableOpacity>

      {/* Main content, centered */}
      <View style={{...flexChild, ...centerHV, paddingHorizontal: sw12}}>
        <CardContainer
          style={{paddingVertical: sh8, paddingHorizontal: sw20}}
          title="Login"
          textStyles={fs20BoldGray1}>
          {/* Username Input */}
          <CustomTextInput
            label={"Username"}
            onChange={event =>
              (user.current = {
                ...user.current,
                username: event.nativeEvent.text,
              })
            }
          />

          <CustomSpacer space={sh16} />

          {/* Password Input */}
          <CustomTextInput
            label={"Password"}
            secureTextEntry={true}
            onChange={event =>
              (user.current = {
                ...user.current,
                password: event.nativeEvent.text,
              })
            }
          />

          <CustomSpacer space={sh16} />

          {/* Login Button */}
          <CustomButton
            title={"Login"}
            onPress={async () => await handleSignIn()}
            containerStyle={{
              ...fullWidth,
              backgroundColor: colorBlue._3,
              paddingVertical: sh12,
              paddingHorizontal: sw40,
              borderRadius: sw25,
            }}
          />
        </CardContainer>
      </View>
    </Fragment>
  );
};
