import React from "react";
import {SafeAreaView, Text, View, ViewStyle} from "react-native";
import {
  flexChild,
  centerHV,
  flexColCC,
  sw90,
  sw20,
  sw10,
  colorWhite,
  colorBlue,
  sh2,
  sh6,
  sh4,
  fs20BoldBlack2,
  fs18BoldWhite2,
  fs14BoldWhite2,
} from "../../styles";
import {CardContainer} from "..";

export type Props = {error: Error; resetError: () => void};

export const ErrorFallbackComponent = (props: Props) => {
  const contentStyle: ViewStyle = {
    ...flexColCC,
    borderRadius: sw10,
    backgroundColor: colorWhite._2,
    shadowColor: colorBlue._1,
    shadowOffset: {width: 0, height: sh2},
    shadowOpacity: 0.1,
    shadowRadius: sh6,
    elevation: sh4,
  };
  return (
    <SafeAreaView style={{...flexChild, ...centerHV}}>
      <CardContainer style={contentStyle}>
        <Text style={fs20BoldBlack2}>Oops!</Text>
        <Text style={fs18BoldWhite2}>There is an Error</Text>
        <Text style={fs14BoldWhite2}>{props.error.message}</Text>
      </CardContainer>
    </SafeAreaView>
  );
};
