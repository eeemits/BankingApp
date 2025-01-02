import React, {type FunctionComponent} from "react";
import {colorWhite, flexChild} from "./styles";
import ErrorBoundary from "react-native-error-boundary";
import {ErrorFallbackComponent} from "./components";
import {SafeAreaView} from "react-native-safe-area-context";
import {MainRoutes} from "./navigation";

export const App: FunctionComponent = () => {
  const handleJSErrorForErrorBoundary = (error: any, stackTrace: string) => {
    console.log(stackTrace, error);
  };
  return (
    <ErrorBoundary
      onError={handleJSErrorForErrorBoundary}
      FallbackComponent={ErrorFallbackComponent}>
      <SafeAreaView style={{backgroundColor: colorWhite._3, ...flexChild}}>
        <MainRoutes />
      </SafeAreaView>
    </ErrorBoundary>
  );
};
