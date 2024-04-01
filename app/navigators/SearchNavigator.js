import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "../screens/SearchScreen/SearchScreen";
import CourseScreen from '../screens/CourseScreen/CourseScreen';
import InstructorProfile from '../screens/CourseScreen/InstructorProfile';
import EnrollCourse from "../screens/CourseScreen/EnrollCourse";

const Stack = createNativeStackNavigator();

const SearchNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="SearchScreen">
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseScreen"
        component={CourseScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="InstructorProfile"
        component={InstructorProfile}
        options={{title: 'Instructor'}}
      />
      <Stack.Screen
        name="Enroll"
        component={EnrollCourse}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigator;

const styles = StyleSheet.create({});
