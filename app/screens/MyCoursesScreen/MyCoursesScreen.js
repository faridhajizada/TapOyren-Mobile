import React, {useEffect, useState, useContext} from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native';
import i18n from '../../service/i18n';

import MySafeAreaView from '../../components/MySafeAreaView/MySafeAreaView';
import commonStyles from '../../config/commonStyles';
import CategoryScreens from '../../components/CategoryComponents/CategoryScreens';
import CourseComponent from '../../components/CategoryComponents/CourseComponent';
import Loader from '../../components/Loader/Loader';
import { getMyCourses } from '../../api/accountScreenAPI';
import {AuthContext} from '../../context/authContext'


const MyCoursesScreen = ({navigation}) => {
  const [courses, setCourses] = useState(null);
  const [loader, setLoader] = useState(false);
  const {isAuth, userData, getAccessToken} = useContext(AuthContext);
  

  const fetchMyCourses = async () => {
    try {
      setLoader(true);
      const res = await getMyCourses(userData.id);
      const data = await res.data;
      setCourses(data);
      // console.log('data from mycourses', data)
    } catch (error) {
      console.log('error from myCourses ', error)
    } finally {
      setLoader(false);
      // console.log(await getAccessToken())
    }
  };
  
  const handleCourse = (id, title) => {
    navigation.navigate("CourseScreen", { id, title });
  };

  useEffect(() => {
    let mounted = true;
    if(mounted) {
      isAuth && fetchMyCourses();
    }
    return () => {
      mounted = false;
    }
  }, []);

  if(loader) return <Loader />

  return (
    <MySafeAreaView>
      <Text style={ commonStyles.screenTitle }>{i18n.t('myCourses.title')}</Text>
      <View style={styles.emptyWrap}>
        <Image source={require('../../assets/img/paper.png')} style={styles.img} resizeMode='contain' />
        <Text style={styles.title}>No enrolled course yet</Text>
        <Text>Search or browse categories to find a course for you.</Text>
        <Button title='fetch' onPress={fetchMyCourses} />
      </View>
      {
        courses && courses.map((i, idx) => {
          return (
            <Text key={idx}>{i.courseId}</Text>
          )
        })
      }
      {/* <CategoryScreens
          data={courses} // data?
          numColumns={2}
          columnStyle={{ justifyContent: "space-between" }}
          CBfunc={handleCourse}
          SomeComponent={CourseComponent}
          myKey='courseId'
          handleRefresh={fetchCourses}
        /> */}
    </MySafeAreaView>
  )
}

export default MyCoursesScreen

const styles = StyleSheet.create({
  emptyWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  img: {
    width: 100,
    height: 150,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10
  },
})
