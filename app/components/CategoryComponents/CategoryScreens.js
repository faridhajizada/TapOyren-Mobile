import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";

const CategoryScreens = ({
  data = [],
  numColumns = 1,
  columnStyle = false,
  CBfunc = null,
  SomeComponent = null,
  myKey,
  handleRefresh,
  myPadding = 25
}) => {
  const renderItem = ({ item }) => {
    if (item.myErr) {
      return <Text>{item.myErr}</Text>
    }
    return <SomeComponent item={item} onPress={CBfunc} />
  }

  const onRefresh = () => (
    handleRefresh && handleRefresh()
  );


  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={{padding: myPadding}}
      numColumns={numColumns}
      columnWrapperStyle={columnStyle}
      // ListEmptyComponent={<Text>Please try again later</Text>}
      keyExtractor={(item) => {
        if (typeof(item[myKey]) === "number") { return item[myKey].toString() }
        return item[myKey];
      }}
      refreshing={false}
      onRefresh={onRefresh}
    />
  );
};

export default CategoryScreens;

const styles = StyleSheet.create({
  flatlist: {
    padding: 25,
  },
});
