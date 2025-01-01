import React, {FunctionComponent, useState} from "react";
import {Text, TouchableOpacity, Alert, TextStyle} from "react-native";
import ReactNativeBiometrics, {BiometryTypes} from "react-native-biometrics";
import {
  centerHV,
  colorBlack,
  colorJet,
  flexRow,
  fs16BoldGray3,
  sh5,
  sw12,
  sw2,
} from "../../styles";
import {CustomSpacer, Icon, IconProps} from "..";

interface SensitiveTextProps {
  amount: number;
  textStyle?: TextStyle;
  iconStyle?: IconProps;
}

export const SensitiveText: FunctionComponent<SensitiveTextProps> = ({
  amount,
  textStyle,
  iconStyle,
}: SensitiveTextProps) => {
  const [isMasked, setIsMasked] = useState(true);
  const rnBiometrics = new ReactNativeBiometrics();

  const handleRevealAmount = async () => {
    try {
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      if (available) {
        const result = await rnBiometrics.simplePrompt({
          promptMessage: "Authenticate to reveal the amount",
        });

        if (result.success) {
          setIsMasked(false);
        } else {
          Alert.alert("Authentication failed", "Please try again.");
        }
      } else {
        let message = "Biometric authentication is not supported.";
        if (biometryType === BiometryTypes.FaceID) {
          message = "Face ID is not set up on this device.";
        } else if (biometryType === BiometryTypes.TouchID) {
          message = "Touch ID is not set up on this device.";
        } else if (biometryType === BiometryTypes.Biometrics) {
          message = "Biometric sensor is unavailable.";
        }
        Alert.alert("Error", message);
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  const fontStyle: TextStyle = {
    ...fs16BoldGray3,
    color: isMasked ? colorJet._4 : colorBlack._1,
    paddingTop: sh5,
    ...textStyle,
  };

  return (
    <TouchableOpacity
      onPress={handleRevealAmount}
      style={{...flexRow, ...centerHV}}>
      <Text style={fontStyle}>
        {isMasked ? "****" : `MYR ${amount.toFixed(2)}`}
      </Text>
      <CustomSpacer space={sw2} isHorizontal={true} />
      <Icon name="eye" size={sw12} color={colorJet._4} {...iconStyle} />
    </TouchableOpacity>
  );
};
