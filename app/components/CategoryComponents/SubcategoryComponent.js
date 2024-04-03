import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import commonStyles from "../../config/commonStyles";
import { Ionicons } from "@expo/vector-icons";

const SubcategoryComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        item.courseCount > 0
          ? onPress(item.subcategoryId, item.subcategoryTitle)
          : null
      }
    >
      <View style={[styles.subcategory, commonStyles.shadow]}>
        <Text numberOfLines={1} style={styles.subcatTitle}>
          {item.subcategoryTitle}
        </Text>
        <Text>
          {item.courseCount} {item.courseCount !== 1 ? 'courses' : 'course' }
          <Ionicons name="chevron-forward" size={15} />
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SubcategoryComponent;

const styles = StyleSheet.create({
  subcategory: {
    paddingVertical: 25,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subcatTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
});
