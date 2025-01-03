import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import React, {FunctionComponent} from "react";
import {CustomSpacer} from "..";
import {
  flexChild,
  fullHW,
  fsAlignLeft,
  sh4,
  fsAlignCenter,
  sh8,
  border,
  colorBlue,
  sw1,
  sw8,
  fullWidth,
} from "../../styles";

interface CustomTextInputProps extends TextInputProps {
  label: string;
  spaceToLabel?: number;
  textLabelStyle?: TextStyle;
}

export const CustomTextInput: FunctionComponent<CustomTextInputProps> = ({
  label,
  textLabelStyle,
  spaceToLabel,
  ...props
}: CustomTextInputProps) => {
  const textStyle: TextStyle = {
    ...fsAlignCenter,
    paddingVertical: sh8,
    ...border(colorBlue._4, sw1, sw8),
    ...fullWidth,
  };
  return (
    <View style={{...fullWidth}}>
      <Text style={{...fsAlignLeft, ...textLabelStyle}}>{label}</Text>
      <CustomSpacer space={spaceToLabel || sh4} />
      <TextInput style={textStyle} {...props}></TextInput>
    </View>
  );
};
