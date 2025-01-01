import React, {FunctionComponent} from "react";
import {View, Text, Image, TouchableOpacity, ViewStyle} from "react-native";
import {Icon} from "..";
import {
  colorBlue,
  colorWhite,
  flexRow,
  flexRowSbSb,
  fs14BoldWhite2,
  fs16BoldWhite1,
  fs24BoldWhite1,
  sh10,
  sh32,
  sh4,
  sh40,
  spaceBetweenHorizontal,
  sw20,
  sw40,
} from "../../styles";

interface HeaderProps {
  spaceToBottom?: number;
  containerStyle?: ViewStyle;
}

export const HeaderSection: FunctionComponent<HeaderProps> = ({
  spaceToBottom,
  containerStyle,
}: HeaderProps) => {
  const defaultStyle: ViewStyle = {
    backgroundColor: colorBlue._5,
    paddingVertical: sh32,
    paddingHorizontal: sw20,
    borderBottomLeftRadius: sw20,
    borderBottomRightRadius: sw20,
    marginBottom: spaceToBottom ? spaceToBottom : 0,
    ...containerStyle,
  };

  return (
    <View style={defaultStyle}>
      <View style={{...flexRow, ...spaceBetweenHorizontal, paddingTop: sh10}}>
        <Text style={fs16BoldWhite1}>Dashboard</Text>
        <Image
          source={{
            uri: "https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png",
          }}
          style={{width: sw40, height: sh40, borderRadius: sw20}}
        />
      </View>
      <Text style={fs14BoldWhite2}>Hi, Hiring Manager!</Text>
      <View>
        <Text style={{...fs16BoldWhite1, paddingVertical: sh4}}>
          Total Balance
        </Text>
        <View style={flexRowSbSb}>
          <Text style={fs24BoldWhite1}>MYR 124.57</Text>
          <TouchableOpacity>
            <Icon name="notifications" size={24} color={colorWhite._1} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
