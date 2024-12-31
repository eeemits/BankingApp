import React, {type FunctionComponent} from "react";
import {SafeAreaView, useColorScheme} from "react-native";

import {Colors} from "react-native/Libraries/NewAppScreen";

export const App: FunctionComponent = () => {
  const isDarkMode = useColorScheme() === "dark";

  console.log("wow");

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return <SafeAreaView style={backgroundStyle} />;
};
