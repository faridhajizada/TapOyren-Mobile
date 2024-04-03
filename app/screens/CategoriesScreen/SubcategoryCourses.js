import React, { useEffect, useState, useContext } from "react";
import { StyleSheet } from "react-native";

// import { COURSES as courses } from "../../data/dummy-data";
import CourseComponent from "../../components/CategoryComponents/CourseComponent";
import CategoryScreens from "../../components/CategoryComponents/CategoryScreens";
import { getCourses } from "../../api/categoryScreenAPI";
import Loader from "../../components/Loader/Loader";
import { LangContext } from "../../context/langContext";

const SubcategoryCourses = ({ navigation, route }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {lang} = useContext(LangContext);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      let res = await getCourses(route.params.subcatId, lang.id);
      let data = await res.data;
      setCourses(data);
    } catch (error) {
      console.log('coursesScreen', error.message);
      setCategories([{myErr: 'Oops, something went wrong, pls try again later'}]);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    let mounted = true;
    if(mounted) fetchCourses();
    return () => {
      mounted = false;
    }
  }, []);

  const handleCourse = (id, title) => {
    navigation.navigate("CourseScreen", { id, title });
  };

  if (isLoading) return <Loader />

  return (
    <CategoryScreens
      data={courses}
      numColumns={2}
      columnStyle={{ justifyContent: "space-between" }}
      CBfunc={handleCourse}
      SomeComponent={CourseComponent}
      myKey='courseId'
      handleRefresh={fetchCourses}
    />
  );
};

export default SubcategoryCourses;

const styles = StyleSheet.create({});
