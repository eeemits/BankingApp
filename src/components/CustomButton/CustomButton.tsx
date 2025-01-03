import {View, Text, TouchableOpacity, ViewStyle, TextStyle} from "react-native";
import React, {FunctionComponent} from "react";
import {
  centerHV,
  colorBlue,
  fs12BoldWhite1,
  fsAlignCenter,
  sh8,
} from "../../styles";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const CustomButton: FunctionComponent<CustomButtonProps> = ({
  title,
  onPress,
  containerStyle,
  textStyle,
}: CustomButtonProps) => {
  const defaultStyle: ViewStyle = {
    ...centerHV,
    backgroundColor: colorBlue._1,
    ...containerStyle,
  };

  const defaultTextStyle: TextStyle = {
    ...fs12BoldWhite1,
    ...fsAlignCenter,
    ...textStyle,
  };

  return (
    <View style={{paddingVertical: sh8}}>
      <TouchableOpacity
        style={defaultStyle}
        onPress={onPress}
        disabled={!onPress}>
        <Text style={defaultTextStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
