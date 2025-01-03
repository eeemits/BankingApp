import {View, Text, ViewStyle} from "react-native";
import React, {Fragment, FunctionComponent} from "react";
import {
  flexRowSbSb,
  fs18BoldBlack2,
  fs14BoldBlue3,
  flexChild,
  sh20,
  sw18,
  rowCenterVertical,
  flexWrap,
  centerHV,
  sw8,
  fullWidth,
} from "../../styles";
import {SectionContainerList} from "../../types/transaction";
import {isArrayNotEmpty} from "../../utils";
import {CustomSpacer, Icon} from "..";

interface SectionContainerProps {
  sections: SectionContainerList[];
  containerStyle?: ViewStyle;
}

export const SectionContainer: FunctionComponent<SectionContainerProps> = ({
  sections,
  containerStyle,
}) => {
  const style = {
    ...flexChild,
    ...fullWidth,
  };
  const defaultStyle: ViewStyle = containerStyle
    ? {...style, ...containerStyle}
    : style;
  return (
    <Fragment>
      <View style={defaultStyle}>
        {isArrayNotEmpty(sections) &&
          sections.map((item, index) => (
            <Fragment key={index}>
              <View style={{...flexRowSbSb, ...flexWrap}}>
                <View style={{...rowCenterVertical, ...centerHV}}>
                  {item.iconStyle && <Icon size={sw18} {...item.iconStyle} />}
                  <CustomSpacer isHorizontal={true} space={sw8} />
                  <Text style={{...fs18BoldBlack2, ...item.labelStyle}}>
                    {item.label}
                  </Text>
                </View>
                <Text style={{...fs14BoldBlue3, ...item.subLabelStyle}}>
                  {item.subLabel}
                </Text>
              </View>
              {index !== sections.length - 1 && <CustomSpacer space={sh20} />}
            </Fragment>
          ))}
      </View>
    </Fragment>
  );
};
