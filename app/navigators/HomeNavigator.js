import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SeeAllScreen from "../screens/HomeScreen/SeeAllScreen";
import CourseScreen from '../screens/CourseScreen/CourseScreen';
import InstructorProfile from "../screens/CourseScreen/InstructorProfile";
import EnrollCourse from "../screens/CourseScreen/EnrollCourse";

const Stack = createNativeStackNavigator();

const HomeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CourseScreen"
        component={CourseScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="SeeAllScreen"
        component={SeeAllScreen}
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

export default HomeNavigator;

const styles = StyleSheet.create({});
