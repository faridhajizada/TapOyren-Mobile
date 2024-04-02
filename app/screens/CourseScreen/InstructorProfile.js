import React, { useState, useEffect } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import sanitize from "sanitize-html";
import { getInstructorCourses } from "../../api/courseScreenAPI";
import CategoryScreens from "../../components/CategoryComponents/CategoryScreens";
import CourseComponent from "../../components/CategoryComponents/CourseComponent";
import Loader from "../../components/Loader/Loader";
import i18n from '../../service/i18n'


const InstructorProfile = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false);
  const [instructorObj, setInstructorObj] = useState({});
  const [instructorCourses, setInstructorCourses] = useState([]);

  const fetchInstructor = async () => {
    try {
      setLoading(true);
      let res = await getInstructorCourses(route.params.instructorId);
      let data = await res.data;
      await setInstructorObj(data[0]);
      let filtered = data[0]?.categoryCoursesDto.filter(i => i?.courseId !== route.params?.courseId);
      setInstructorCourses(filtered);
    } catch (error) {
      console.log("error instructor page ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if(mounted) fetchInstructor();
    return () => {
      mounted = false;
    }
  }, []);

  const handleCourse = (id, title) => {
    navigation.push("CourseScreen", { id, title });
  };

  if (loading) return <Loader />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.instructorWrap}>
        <View style={styles.instructorImgWrap}>
          <Image
            resizeMode="contain"
            style={[styles.instructorImg, { backgroundColor: "silver" }]}
            source={
              route.params.img
                ? { uri: route.params.img }
                : require("../../assets/img/logo.png")
            }
          />
        </View>
        <View>
          <Text style={styles.instructor}>{instructorObj?.instructorName}</Text>
          <Text style={{}}>{i18n.t('course.instructor.title')}</Text>
        </View>
      </View>
      {instructorObj.about != "" && (
        <View style={styles.about}>
          <TextInfo title={i18n.t('course.instructor.about')} txt={instructorObj?.about} />
        </View>
      )}
      <View style={styles.courses}>
        <Text style={styles.h2}>{i18n.t('course.instructor.courses')}</Text>
        <CategoryScreens
          // data={instructorObj.categoryCoursesDto}
          data={instructorCourses}
          numColumns={2}
          columnStyle={{ justifyContent: "space-between" }}
          CBfunc={handleCourse}
          SomeComponent={CourseComponent}
          myKey="courseId"
          myPadding={15}
        />
      </View>
    </ScrollView>
  );
};

export default InstructorProfile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  h2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  instructorWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  instructorImgWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 15,
    overflow: "hidden",
  },
  instructorImg: {
    width: 120,
    height: 120,
  },
  instructor: {
    fontWeight: "600",
    fontSize: 20,
  },
});

const TextInfo = ({ txt, title }) => {
  const [show, setShow] = useState(false);

  const toggleText = () => {
    setShow((prev) => !prev);
  };
  return (
    <View style={{}}>
      <Text style={styles.h2}>{title}</Text>
      {/* <Text numberOfLines={show ? null : 2} style={{fontSize: 16}}>{txt}</Text> */}
      <Text h1 numberOfLines={show ? null : 2} style={{ fontSize: 16 }}>
        {sanitize(txt, {
          allowedTags: [],
          allowedAttributes: [],
        })}
      </Text>
      <Pressable onPress={toggleText}>
        <Text style={{ textAlign: "right" }}>
          show {show ? "less" : "more"}
        </Text>
      </Pressable>
    </View>
  );
};
