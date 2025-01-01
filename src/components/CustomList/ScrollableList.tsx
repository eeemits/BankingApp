import {
  View,
  Text,
  ViewStyle,
  ScrollView,
  TouchableOpacity,
  ScrollViewProps,
} from "react-native";
import React, {Fragment, FunctionComponent} from "react";
import {TransactionList, TransactionType} from "../../types/transaction";
import {
  flexChild,
  fs10BoldGray1,
  spaceAroundHV,
  sw18,
  sw20,
  sw4,
  sw5,
  flexGrow,
  flexWrap,
  centerHV,
  fsAlignCenter,
  colorWhite,
  sw100,
  sh8,
  fs10BoldWhite1,
  colorGreen,
} from "../../styles";
import {isArrayNotEmpty} from "../../utils";

interface ScrollableListProps extends ScrollViewProps {
  items: TransactionList[];
  type?: TransactionType;
  paddingHorizontal?: number;
  paddingVertical?: number;
  isHorizontal?: boolean;
}

export const ScrollableList: FunctionComponent<ScrollableListProps> = props => {
  const {
    items,
    paddingHorizontal,
    paddingVertical,
    type,
    isHorizontal,
    children,
    contentContainerStyle,
  } = props;

  const containerStyle: ViewStyle = {
    ...flexChild,
    paddingHorizontal: paddingHorizontal ? paddingHorizontal : sw5,
    paddingVertical: paddingVertical ? paddingVertical : sw20,
  };

  const childContainerStyle: ViewStyle = {
    ...flexChild,
    paddingHorizontal: sw4,
    paddingVertical: sh8,
  };

  const pillStyle: ViewStyle = {
    ...flexGrow,
    borderRadius: sw18,
    paddingHorizontal: sw4,
    maxWidth: sw100,
  };

  const scrollContainerStyle = contentContainerStyle
    ? contentContainerStyle
    : {
        ...centerHV,
        ...flexGrow,
        ...spaceAroundHV,
      };

  return (
    <Fragment>
      <View style={containerStyle}>
        <ScrollView
          horizontal={isHorizontal}
          contentContainerStyle={scrollContainerStyle}
          {...props}>
          {children
            ? children
            : isArrayNotEmpty(items) &&
              items.map((item: TransactionList, index: number) => (
                <TouchableOpacity
                  style={pillStyle}
                  key={index}
                  onPress={() => item.onPress(item.type)}>
                  <View
                    key={index}
                    style={
                      item.style
                        ? {
                            ...childContainerStyle,
                            ...item.style,
                            backgroundColor:
                              type === item.type
                                ? colorGreen._3
                                : colorWhite._2,
                          }
                        : {...childContainerStyle}
                    }>
                    <Text
                      style={{
                        ...(type === item.type
                          ? fs10BoldWhite1
                          : fs10BoldGray1),
                        ...flexWrap,
                        ...fsAlignCenter,
                      }}>
                      {item.type}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
        </ScrollView>
      </View>
    </Fragment>
  );
};
