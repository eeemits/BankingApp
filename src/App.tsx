import React, {type FunctionComponent} from "react";
import {GlobalProvider} from "./context/GlobalState";
import {SafeAreaView} from "react-native-safe-area-context";
import {colorWhite, flexChild} from "./styles";
import {DashboardScreen} from "./pages/Private/Dashboard";
import ErrorBoundary from "react-native-error-boundary";
import {ErrorFallbackComponent} from "./components";

export const App: FunctionComponent = () => {
  const handleJSErrorForErrorBoundary = (error: any, stackTrace: string) => {
    console.log(stackTrace, error);
  };

  return (
    <ErrorBoundary
      onError={handleJSErrorForErrorBoundary}
      FallbackComponent={ErrorFallbackComponent}>
      <GlobalProvider>
        <SafeAreaView style={{backgroundColor: colorWhite._3, ...flexChild}}>
          <DashboardScreen />
        </SafeAreaView>
      </GlobalProvider>
    </ErrorBoundary>
  );
};
