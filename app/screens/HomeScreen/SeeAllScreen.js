import React from 'react'
import CategoryScreens from '../../components/CategoryComponents/CategoryScreens'
import CourseComponent from '../../components/CategoryComponents/CourseComponent';

const SeeAllScreen = ({route, navigation}) => {

  const handleCourse = (id, title) => {
    navigation.navigate("CourseScreen", { id, title });
  };
  return (
    <CategoryScreens
      data={route.params.courses}
      numColumns={2}
      columnStyle={{ justifyContent: "space-between" }}
      CBfunc={handleCourse}
      SomeComponent={CourseComponent}
      myKey='courseId'
    />
  )
}

export default SeeAllScreen


