import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

import commonStyles from "../../config/commonStyles";
import colors from "../../config/colors";
import i18n from '../../service/i18n'

// Category Course Page

const CourseComponent = ({ item, onPress }) => {
  const [isImgLoad, setIsImgLoad] = useState(false);
  return (
    <TouchableOpacity onPress={() => onPress(item.courseId, item.courseTitle)}>
      <View
        style={[
          styles.course,
          commonStyles.shadow,
          { overflow: isImgLoad ? "visible" : "hidden" },
        ]}
      >
        <Image
          style={[
            styles.courseImg,
            isImgLoad ? { height: 140, top: 0 } : { height: 1, top: -1 },
          ]}
          source={{ uri: item.courseImageUrl }}
          onLoad={() => setIsImgLoad(true)}
        />
        {!isImgLoad ? (
          <View style={styles.loaderView}>
            <LottieView
              source={require("../../assets/animations/loader.json")}
              autoPlay
              style={styles.loader}
            />
          </View>
        ) : null}
        <View style={styles.infoWrap}>
          <Text numberOfLines={2} style={styles.title}>
            {item.courseTitle}
          </Text>
          <View>
            <View style={styles.info}>
              {item.isEnrolled === null ? 
              <Text>&#8380; {item.priceMonthly}</Text> : 
              <Text style={{color: colors.primary, fontWeight: 'bold'}}>{i18n.t('course.enrolled')}</Text>}
              <Text style={{}}>
                {item.rating} <Ionicons name="star" color={colors.primary} />
              </Text>
            </View>
            <Text>
              <Ionicons name="time-outline" size={15} />{" "}
              {(item.courseDuration / 3600).toFixed(2)} {i18n.t('course.hour')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseComponent;

const styles = StyleSheet.create({
  course: {
    flex: 1,
    width: 150,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  courseImg: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "gray",
  },
  infoWrap: {
    flex: 1,
    padding: 5,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginBottom: 7,
  },
  loaderView: {
    justifyContent: "center",
    alignItems: "center",
    height: 140,
    overflow: "hidden",
  },
  loader: {
    width: 40,
    height: 40,
  },
});
