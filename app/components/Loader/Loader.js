import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../assets/animations/loader.json")}
        autoPlay
        style={styles.loader}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 80,
    height: 80,
  },
});
