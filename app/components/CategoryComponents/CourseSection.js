import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import CourseSectionVideo from "./CourseSectionVideo";

const CourseSection = ({
  sectionItem,
  setVideoId,
  handleSelection,
  selectedItem,
}) => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => setisOpen((prev) => !prev)}>
      <View style={styles.section}>
        <View style={styles.sectionInfo}>
          <Text numberOfLines={1} style={styles.sectionTitle}>
            {sectionItem.title}
          </Text>
          <Text style={{ color: "gray" }}>{(sectionItem.timescale/3600).toFixed(2)}</Text>
        </View>
        {isOpen && (
          <View style={{ paddingVertical: 7 }}>
            <FlatList
              data={sectionItem.courseVideos}
              extraData={selectedItem}
              renderItem={({ item }) => (
                <CourseSectionVideo
                  sectionVideo={item}
                  setVideoId={setVideoId}
                  handleSelection={handleSelection}
                  selectedItem={selectedItem}
                />
              )}
              keyExtractor={(item) => item.title}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CourseSection;

const styles = StyleSheet.create({
  section: {
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  sectionInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    marginRight: 5,
  },
});
