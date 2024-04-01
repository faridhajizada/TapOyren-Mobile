import React, { useEffect, useContext } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import colors from '../config/colors';
import CategoriesNavigator from './CategoriesNavigator';
import SearchNavigator from './SearchNavigator';
import MyCoursesNavigator from './MyCoursesNavigator';
import HomeNavigator from './HomeNavigator';
import AccountNavigator from './AccountNavigator';
import i18n from '../service/i18n';
import { LangContext } from '../context/langContext';


const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
  // const {lang} = useContext(LangContext);

  // useEffect(() => {}, [lang]);

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          tabBarStyle: Platform.OS === 'ios' ? null : {paddingBottom: 5},
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home":
                iconName = focused ? "ios-home" : "ios-home-outline";
                break;
              case "Search":
                iconName = focused ? "search" : "search-outline";
                break;
              case "CategoriesNavigator":
                iconName = focused ? "grid" : "grid-outline";
                break;
              case "MyLearning":
                iconName = focused ? "book" : "book-outline";
                break;
              case "Account":
                iconName = focused ? "person" : "person-outline";
                break;
              default:
                iconName = focused ? "alert-circle" : "alert-circle-outline";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeNavigator} options={{title: i18n.t('tabs.home')}} />
        <Tab.Screen name="Search" component={SearchNavigator} options={{title: i18n.t('tabs.search')}} />
        <Tab.Screen name="CategoriesNavigator" component={CategoriesNavigator} options={{title: i18n.t('tabs.categories')}} />
        <Tab.Screen name="MyLearning" component={MyCoursesNavigator} options={{title: i18n.t('tabs.myCourses')}} />
        <Tab.Screen name="Account" component={AccountNavigator} options={{title: i18n.t('tabs.account')}} />
      </Tab.Navigator>
  )
}

export default AppTabNavigator

const styles = StyleSheet.create({})
