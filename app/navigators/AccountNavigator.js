import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthScreen from "../screens/AuthScreen/AuthScreen";
import AccountScreen from "../screens/AccountScreen/AccountScreen";
import { AuthContext } from "../context/authContext";
// import { UserContext } from "../context/context";
import AccountSettings from '../screens/AccountScreen/AccountSettings';
import Language from '../screens/AccountScreen/Language';
import AboutUs from '../screens/AccountScreen/AboutUs';
import FAQ from '../screens/AccountScreen/FAQ';
import Terms from '../screens/AccountScreen/Terms';
import Contact from '../screens/AccountScreen/Contact';

const Stack = createNativeStackNavigator();

const AccountNavigator = () => {
  const {isAuth} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {isAuth ? (
        <>
          <Stack.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{ headerShown: false }}
          // options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="AccountSettings"
          component={AccountSettings}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="AccountLanguage"
          component={Language}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="AccountAboutus"
          component={AboutUs}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="AccountFAQ"
          component={FAQ}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="AccountContact"
          component={Contact}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="AccountTerms"
          component={Terms}
          options={({ route }) => ({ title: route.params.title })}
        />
      </>
      ) : (
        <Stack.Screen
          name="AuthScreen"
          component={AuthScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AccountNavigator;

const styles = StyleSheet.create({});
