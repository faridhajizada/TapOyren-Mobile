import React, { useState, useEffect } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCourseSections } from "../../api/courseScreenAPI";
import colors from "../../config/colors";

const SectionItem = ({ item, isEnroll, setVideoId, selectedItemId }) => {
  const handlePlay = () => {
    if (isEnroll || item.preview) {
      setVideoId({ videoId: item.vimeoVideoId, videoTitle: item.title });
      setVideoId({ videoId: sectionVideo.id, videoTitle: sectionVideo.title });
      // setSelectedItemId(item.id);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePlay}>
      <View
        style={[
          styles.sectionItem,
          {
            backgroundColor:
              item.id === selectedItemId ? "rgba(110, 195, 255, .3)" : null,
          },
        ]}
      >
        <Ionicons
          name={
            isEnroll || item.preview ? "play-circle-outline" : "lock-closed"
          }
          color={colors.primary}
          size={32}
          style={styles.icon}
        />
        <View style={styles.videoInfo}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.time}>{(item.timescale / 3600).toFixed(2)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CourseSections = ({ setVideoId, courseId, isEnroll }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await getCourseSections(courseId);
        if (res?.data && Array.isArray(res.data)) {
          const sectionsData = res.data.map((section) => ({
            title: section.title,
            timescale: section.timescale,
            data: section.sectionVideos || [],
          }));
          setSections(sectionsData);
        } else {
          console.error("Data is not in the expected format:", res);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    fetchSections();
  }, [courseId]);

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => `${item.id.toString()}${index}`}
        renderItem={({ item }) => (
          <SectionItem
            item={item}
            isEnroll={isEnroll}
            setVideoId={setVideoId}
            // selectedItemId={selectedItemId}
            // setSelectedItemId={setSelectedItemId}
            handleSelection={handleSelection}
            selectedItem={selectedItem} 
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginHorizontal: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: colors.primary,
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 0,
  },
  sectionItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
  },
  icon: {
    marginRight: 5,
  },
  title: {
    flex: 1,
    fontSize: 16,
  },
  time: {
    color: "gray",
  },
  videoInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CourseSections;
