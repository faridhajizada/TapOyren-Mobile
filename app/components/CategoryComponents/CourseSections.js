import React, { useState, useEffect } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from "react-native";

import { getCourseSections } from "../../api/courseScreenAPI";
import Loader from "../Loader/Loader";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";

const SectionHeader = ({ section }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text numberOfLines={2} style={styles.sectionHeaderTitle}>
        {section.title}
      </Text>
      <Text>{(section.timescale / 3600).toFixed(2)}</Text>
    </View>
  );
};

const SectionItem = ({
  item,
  isEnroll,
  setVideoId,
  selectedItemId,
  setSelectedItemId,
}) => {
  const handlePlay = () => {
    if (isEnroll || item.preview) {
      setVideoId({ videoId: item.vimeoVideoId, videoTitle: item.title });
      setSelectedItemId(item.id);
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
          size={24}
          style={{ marginRight: 5 }}
        />
        <View style={styles.videoInfo}>
          <Text numberOfLines={1} style={styles.sectionItemTitle}>
            {item.title}
          </Text>
          <Text style={{ color: "gray" }}>
            {(item.timescale / 3600).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CourseSections = ({ setVideoId, courseId, isEnroll, scrollToTop }) => {
  const [courseSections, setCourseSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const fetchSections = async () => {
    try {
      setIsLoading(true);
      let res = await getCourseSections(courseId);
      let data = res.data;
      if(data,length === 0) {
        
        scrollToTop();
      }
      if (data && Array.isArray(data)) {
        let newData =data?.map((i) => ({ ...i, data: i.courseVideos }));
        setCourseSections(newData);
      } else {
        console.log("Invalid data format received from API");
      }
    } catch (error) {
      console.log("CourseScreen ", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchSections();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <SectionList
      style={styles.list}
      sections={courseSections}
      renderItem={({ item }) => (
        <SectionItem
          item={item}
          setVideoId={setVideoId}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          isEnroll={isEnroll}
        />
      )}
      renderSectionHeader={({ section }) => <SectionHeader section={section} />}
      extraData={selectedItemId}
      keyExtractor={(item) => item.vimeoVideoId.toString()}
    />
  );
};

export default CourseSections;

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  sectionHeaderTitle: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
  },
  sectionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 7,
  },
  videoInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
  },
  sectionItemTitle: {
    flex: 1,
    fontSize: 15,
    textTransform: "capitalize",
  },
});
