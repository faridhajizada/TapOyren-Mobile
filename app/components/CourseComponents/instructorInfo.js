import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import i18n from '../../service/i18n'

const InstructorInfo = ({navigation, course, courseId}) => {
  return (
    <View style={styles.instructorBlock}>
      <View style={styles.instructorWrap}>
        <View style={styles.instructorImgWrap}>
          <Image
            resizeMode="contain"
            style={[styles.instructorImg, { backgroundColor: "silver" }]}
            source={
              course.instructorAvatar
                ? { uri: course.instructorAvatar }
                : require("../../assets/img/logo.png")
            }
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.instructor}>{course.instructorName}</Text>
          <Text style={styles.secondary}>{i18n.t('course.instructor.title')}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("InstructorProfile", {
            // instructorName: course.instructorName,
            instructorId: course.instructorId,
            img: course.instructorAvatar,
            courseId
          })
        }
      >
        <Text style={styles.profileBtn}>{i18n.t('course.profile')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InstructorInfo;

const styles = StyleSheet.create({
  instructorBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 15,
    paddingTop: 0,
  },
  instructorWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  instructorImgWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 7,
    overflow: "hidden",
  },
  instructorImg: {
    width: 60,
    height: 60,
  },
  instructor: {
    fontWeight: "600",
    fontSize: 20,
  },
  secondary: {
    color: 'gray'
  },
  profileBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
    color: colors.primary,
  },
});
