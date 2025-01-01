import {View, Text, ViewStyle, TouchableOpacity, TextStyle} from "react-native";
import React, {FunctionComponent, ReactNode} from "react";
import {
  colorBlue,
  colorWhite,
  flexGrow,
  fs10BoldGray3,
  sh10,
  sh280,
  sw10,
  sw400,
} from "../../styles";

export interface CardContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  title?: string;
  textStyles?: TextStyle;
  backgroundColor?: string;
  onPress?: () => void;
}

export const CardContainer: FunctionComponent<CardContainerProps> = ({
  children,
  style,
  title,
  backgroundColor,
  onPress,
  textStyles,
}: CardContainerProps) => {
  const viewStyle: ViewStyle = {
    ...flexGrow,
    maxWidth: sw400,
    maxHeight: sh280,
    backgroundColor: backgroundColor || colorWhite._3,
    borderRadius: sw10,
    shadowColor: colorBlue._1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  };

  const defaultTextStyle: TextStyle = {
    ...fs10BoldGray3,
    ...textStyles,
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const disabledBtn = !onPress;

  const defaultStyle: ViewStyle = style ? {...viewStyle, ...style} : viewStyle;

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabledBtn}>
      <View style={{paddingVertical: sh10, paddingHorizontal: sw10}}>
        <View style={defaultStyle}>
          {title && <Text style={defaultTextStyle}>{title}</Text>}
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};
