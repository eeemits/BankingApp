import {type FunctionComponent} from "react";
import {GlobalProvider} from "./context/GlobalState";
import {SafeAreaView} from "react-native-safe-area-context";
import {colorWhite, flexChild} from "./styles";
import {DashboardScreen} from "./pages/Private/Dashboard";

export const App: FunctionComponent = () => {
  return (
    <GlobalProvider>
      <SafeAreaView style={{backgroundColor: colorWhite._3, ...flexChild}}>
        <DashboardScreen />
      </SafeAreaView>
    </GlobalProvider>
  );
};
