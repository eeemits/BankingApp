import {colorTransparent} from "./color";

export const alignFlexStart = {alignItems: "flex-start"} as const;
export const alignItemsEnd = {alignItems: "flex-end"} as const;
export const alignItemsStart = {alignItems: "flex-start"} as const;
export const alignSelfStart = {alignSelf: "flex-start"} as const;
export const alignSelfCenter = {alignSelf: "center"} as const;
export const alignSelfEnd = {alignSelf: "flex-end"} as const;
export const centerHorizontal = {justifyContent: "center"} as const;
export const centerVertical = {alignItems: "center"} as const;
export const centerHV = {...centerHorizontal, ...centerVertical} as const;
export const justifyContentEnd = {justifyContent: "flex-end"} as const;
export const justifyContentStart = {justifyContent: "flex-start"} as const;
export const spaceBetweenHorizontal = {
  justifyContent: "space-between",
} as const;
export const spaceBetweenVertical = {alignContent: "space-between"} as const;
export const spaceBetweenHV = {
  ...spaceBetweenHorizontal,
  ...spaceBetweenVertical,
} as const;
export const spaceAroundHorizontal = {justifyContent: "space-around"} as const;
export const spaceAroundVertical = {alignContent: "space-around"} as const;
export const spaceAroundHV = {
  ...spaceAroundHorizontal,
  ...spaceAroundVertical,
} as const;

export const imageContain = {resizeMode: "contain"} as const;

export const flexChild = {flex: 1} as const;
export const flexGrow = {flexGrow: 1} as const;
export const flexNone = {flex: 0} as const;
export const flexShrink = {flexShrink: 1} as const;

export const absolutePosition = {position: "absolute"} as const;
export const underline = {textDecorationLine: "underline"} as const;

export const flexContainer = {display: "flex"} as const;
export const flexCol = {...flexContainer, flexDirection: "column"} as const;
export const flexRow = {...flexContainer, flexDirection: "row"} as const;
export const flexRowReverse = {
  ...flexContainer,
  flexDirection: "row-reverse",
} as const;
export const flexColCC = {...flexCol, ...centerHV} as const;
export const flexRowCC = {...flexRow, ...centerHV} as const;
export const flexColSbSb = {...flexCol, ...spaceBetweenHV} as const;
export const flexRowSbSb = {...flexRow, ...spaceBetweenHV} as const;
export const flexColSaSa = {...flexCol, ...spaceAroundHV} as const;
export const flexRowSaSa = {...flexRow, ...spaceAroundHV} as const;
export const flexWrap = {flexWrap: "wrap"} as const;
export const fullHeight = {height: "100%"} as const;
export const fullWidth = {width: "100%"} as const;
export const fullHW = {...fullHeight, ...fullWidth} as const;
export const autoWidth = {width: "auto"} as const;
export const autoHeight = {height: "auto"} as const;

export const noMargin = {margin: 0} as const;
export const noPadding = {padding: 0} as const;
export const noBGColor = {backgroundColor: colorTransparent} as const;
export const noHorizontalPadding = {paddingLeft: 0, paddingRight: 0} as const;
export const rowCenterVertical = {...centerVertical, ...flexRow} as const;

export const border = (
  color: string,
  width: number,
  radius?: number,
  style?: "solid" | "dotted" | "dashed",
) => ({
  borderColor: color,
  borderRadius: radius,
  borderStyle: style !== undefined ? style : "solid",
  borderWidth: width,
});
