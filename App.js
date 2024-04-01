import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigatorTheme from "./app/config/navigatorTheme";
import { AuthProvider } from "./app/context/authContext";
import PosApp from "./app/PosApp";
import './app/service/i18n'
import { LangProvider } from "./app/context/langContext";

export default function App() {
  return (
    <AuthProvider>
      <LangProvider>
        <NavigationContainer theme={navigatorTheme}>
          <PosApp />
        </NavigationContainer>
      </LangProvider>
    </AuthProvider>
  );
}
