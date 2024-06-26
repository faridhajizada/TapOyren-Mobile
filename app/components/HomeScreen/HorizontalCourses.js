import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../../config/colors";
import commonStyles from "../../config/commonStyles";
import i18n from "../../service/i18n";

const HorizontalCourses = ({ data, handleCourse, loading }) => {
  const renderSkeletonItem = () => {
    return (
      <View style={[styles.course, commonStyles.shadow]}>
        <Animated.View style={[styles.skeletonImg]} />
        <View style={styles.info}>
          <View style={styles.viewSkeleton} />
          <View style={styles.viewSkeleton} />
          <View style={styles.viewSkeleton} />
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleCourse(item.courseId, item.courseTitle)}
      >
        <View style={[styles.course, commonStyles.shadow]}>
          <Image style={styles.img} source={{ uri: item.courseImageUrl }} />
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={2}>
              {item.courseTitle}
            </Text>
            <View style={styles.priceRating}>
              {item.isEnrolled === null ? (
                <Text style={{ fontSize: 16 }}>
                  &#8380; {item.priceMonthly}
                </Text>
              ) : (
                <Text style={{ color: colors.primary, fontWeight: "bold" }}>
                  {i18n.t("course.enrolled")}
                </Text>
              )}
              <Text style={{ fontSize: 16 }}>
                <Ionicons name="time-outline" size={16} />
                {(item.courseDuration / 3600).toFixed(2)}
                {i18n.t("course.hour")}
              </Text>
              <Text style={{ fontSize: 16 }}>
                {item.rating}
                <Ionicons name="star" color={colors.primary} size={18} />
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (!data || loading || data.length === 0 || data === undefined) {
    return (
      <FlatList
        data={[...Array(5).keys()]}
        renderItem={renderSkeletonItem}
        horizontal
        keyExtractor={(item, index) => "skeleton_" + index}
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      horizontal
      keyExtractor={(item) => "" + item.courseId}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default HorizontalCourses;

const styles = StyleSheet.create({
  course: {
    flexDirection: "row",
    width: Dimensions.get("screen").width - 45,
    marginHorizontal: 7,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 7,
  },
  info: {
    padding: 7,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "600",
    fontSize: 17,
  },
  img: {
    width: 80,
    height: 90,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
  },
  priceRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skeletonImg: {
    width: 80,
    height: 90,
    borderTopLeftRadius: 7,
    borderBottomLeftRadius: 7,
    backgroundColor: "silver",
  },
  viewSkeleton: {
    width: "100%",
    height: 20,
    backgroundColor: "silver",
    borderRadius: 5,
  },
});
