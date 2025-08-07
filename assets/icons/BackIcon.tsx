import React from "react";
import { Path, Svg } from "react-native-svg";

const BackIcon = ({ color = "#FFFFFF", height = 24, width = 24 }: any) => {
  return (
    <Svg height={height} viewBox="0 -960 960 960" width={width} fill={color}>
      <Path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
    </Svg>
  );
};

export default BackIcon;
