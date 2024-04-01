import { StyleSheet } from "react-native";

import colors from './colors';

export default StyleSheet.create({
  screenTitle: {
    fontSize: 36,
    paddingLeft: 10,
    color: colors.primary,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
