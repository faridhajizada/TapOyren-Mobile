import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CategoriesHome from "../screens/CategoriesScreen/CategoriesHome";
import SubcategoriesScreen from "../screens/CategoriesScreen/SubcategoriesScreen";
import SubcategoryCourses from "../screens/CategoriesScreen/SubcategoryCourses";
import CourseScreen from '../screens/CourseScreen/CourseScreen';
import EnrollCourse from '../screens/CourseScreen/EnrollCourse';
import InstructorProfile from "../screens/CourseScreen/InstructorProfile";

const Stack = createNativeStackNavigator();

const CategoriesNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="CategoriesHome">
      <Stack.Screen
        name="CategoriesHome"
        component={CategoriesHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Subcategories"
        component={SubcategoriesScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="SubcategoryCourses"
        component={SubcategoryCourses}
        options={({ route }) => ({ 
          title: route.params.title,
          animation: "slide_from_bottom"
        })}
      />
      <Stack.Screen
        name="CourseScreen"
        component={CourseScreen}
        options={({ route }) => ({ 
          title: route.params.title,
          animation: "fade"
        })}
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

export default CategoriesNavigator;

const styles = StyleSheet.create({});
