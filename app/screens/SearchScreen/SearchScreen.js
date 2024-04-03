import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Image,
} from "react-native";
import { getCourses } from "../../api/searchScreenAPI";
import Fuse from "fuse.js";
import i18n from "../../service/i18n";
import { LangContext } from "../../context/langContext";
import Loader from "../../components/Loader/Loader";
import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import CategoryScreens from "../../components/CategoryComponents/CategoryScreens";
import CourseComponent from "../../components/CategoryComponents/CourseComponent";
import commonStyles from "../../config/commonStyles";

const SearchScreen = ({ route, navigation }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [courses, setCourses] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [noCourses, setNoCourses] = useState(false);
  const { lang } = useContext(LangContext);
  const [options] = useState({
    includeScore: true,
    threshold: 0.4,
    keys: ["courseTitle"],
  });

  const handleCourse = (id, title) => {
    navigation.navigate("CourseScreen", { id, title });
  };

  const handleChange = useCallback(
    (text) => {
      setInputValue(text);
      if (text.trim() === "") {
        setNoCourses(false);
        setCourses([]);
        return;
      }
      let result = fuse.search(text);
      result.length === 0 ? setNoCourses(true) : setNoCourses(false);
      setCourses(result.map((i) => i.item));
    },
    [fuse]
  );

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      let res = await getCourses(lang.id);
      let data = await res.data;
      setFuse(new Fuse(data, options));
    } catch (error) {
      console.log("searchScreen", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) fetchCourses();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoading) return <Loader />;

  return (
    <MySafeAreaView>
      <Text style={commonStyles.screenTitle}>{i18n.t("search.title")}</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput
            style={[styles.searchInput]}
            placeholder={`${i18n.t("search.placeholder")}...`}
            clearButtonMode="while-editing"
            value={inputValue}
            onChangeText={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      </TouchableWithoutFeedback>
      {noCourses && <NoCoursesFound />}
      {inputValue === "" && <Discover />}
      <CategoryScreens
        data={courses}
        numColumns={2}
        columnStyle={{ justifyContent: "space-between" }}
        CBfunc={handleCourse}
        SomeComponent={CourseComponent}
        myKey="courseId"
        handleRefresh={fetchCourses}
      />
    </MySafeAreaView>
  );
};

export default SearchScreen;

const NoCoursesFound = () => {
  return (
    <View style={styles.noCoursesWrap}>
      <Text style={styles.title}>No matching courses</Text>
      <Text>Try a different search.</Text>
    </View>
  );
};
const Discover = () => {
  return (
    <View style={styles.noCoursesWrap}>
      <Image
        source={require("../../assets/img/discovery.png")}
        style={styles.img}
        resizeMode="contain"
      />
      <Text style={styles.title}>Discover our courses</Text>
      <Text style={styles.newDiscover}>
        Try discover new courses with search or browse our categories.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  flatlist: {
    padding: 10,
    borderWidth: 1,
  },
  noCoursesWrap: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    marginVertical: 10,
  },
  img: {
    width: 200,
    height: 200,
  },
  newDiscover: {
    marginVertical: 10,
    textAlign: "center",
  },
});
