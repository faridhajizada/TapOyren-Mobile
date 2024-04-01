import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyCoursesScreen from "../screens/MyCoursesScreen/MyCoursesScreen";

const Stack = createNativeStackNavigator();

const MyCoursesNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="MyCoursesScreen">
      <Stack.Screen
        name="MyCoursesScreen"
        component={MyCoursesScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="CourseScreen"
        component={CourseScreen}
        options={({ route }) => ({ title: route.params.title })}
      /> */}
      {/* <Stack.Screen
        name="InstructorProfile"
        component={InstructorProfile}
        options={{title: 'Instructor'}}
      />
      <Stack.Screen
        name="Enroll"
        component={EnrollCourse}
        // options={({ route }) => ({ title: 'route.params.title' })}
      /> */}
    </Stack.Navigator>
  );
};

export default MyCoursesNavigator;

const styles = StyleSheet.create({});
