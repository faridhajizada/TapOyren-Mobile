import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Animated,
  ActivityIndicator,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { getCourses as getCoursesBySubcatId } from "../../api/categoryScreenAPI";
import { AuthContext } from "../../context/authContext";
import { LangContext } from "../../context/langContext";
import { getCourses } from "../../api/searchScreenAPI";
import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import HorizontalCourses from "../../components/HomeScreen/HorizontalCourses";
import i18n from "../../service/i18n";
import { Ionicons } from "@expo/vector-icons";
import img from "./../../assets/img/hero-splash.png";
import colors from "../../config/colors";

const HomeScreen = ({ navigation }) => {
  const [byRating, setByRating] = useState([]);
  const [accaCourses, setAccaCourses] = useState([]);
  const [cfaCourses, setCfaCourses] = useState([]);
  const [loading, setLoading] = useState(true); 
  const { isAuth } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
  const fade1 = useRef(new Animated.Value(0)).current;
  const fade2 = useRef(new Animated.Value(0)).current;
  const fade3 = useRef(new Animated.Value(0)).current;

  const sortByRating = (courses) => {
    let sortedByRating = courses.sort((a, b) => {
      if (+a.rating < +b.rating) return 1;
      if (+a.rating > +b.rating) return -1;
      return 0;
    });
    setByRating(sortedByRating);
  };

  const handleCourse = (id, title) => {
    navigation.navigate("CourseScreen", { id, title });
  };

  const handleSeeAll = (title, courses) => {
    navigation.navigate("SeeAllScreen", { title, courses });
  };

  const fetchCourses = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
      let res = await getCourses(lang.id);
      let data = await res.data;
      sortByRating(data);
    } catch (error) {
      console.log("homescreen", error);
    } finally {
      await SplashScreen.hideAsync();
      Animated.timing(fade1, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }).start();
      Animated.timing(fade2, {
        toValue: 1,
        duration: 500,
        delay: 800,
        useNativeDriver: true,
      }).start();
      Animated.timing(fade3, {
        toValue: 1,
        duration: 500,
        delay: 1300,
        useNativeDriver: true,
      }).start();
    }
  };

  const fetchACCA = async () => {
    try {
      let res = await getCoursesBySubcatId(4, lang.id);
      let data = await res.data;
      setAccaCourses(data);
    } catch (error) {
      console.log("homescreen fetchACCA", error);
    }
  };

  const fetchCFA = async () => {
    try {
      let res = await getCoursesBySubcatId(5, lang.id);
      let data = await res.data;
      setCfaCourses(data);
    } catch (error) {
      console.log("homescreen fetchCFA", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          await fetchCourses();
          await fetchACCA();
          await fetchCFA();
          setLoading(false); // После загрузки данных устанавливаем состояние загрузки в false
        }
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false); // В случае ошибки также устанавливаем состояние загрузки в false
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [isAuth, lang]);

  return (
    <MySafeAreaView>
      <ScrollView>
        {/* ----- Main - Header ----- */}
        <View style={styles.header}>
          <View>
            <Animated.View style={{ opacity: fade1 }}>
              <Text style={styles.headerTitle}>{i18n.t("home.title.h1")}</Text>
            </Animated.View>
            <Animated.View style={{ opacity: fade2 }}>
              <Text style={styles.headerTitle}>{i18n.t("home.title.h2")}</Text>
            </Animated.View>
            <Animated.View style={{ opacity: fade3 }}>
              <Text style={styles.headerTitle}>{i18n.t("home.title.h3")}</Text>
            </Animated.View>
          </View>
          <Image style={styles.headerImg} resizeMode="contain" source={img} />
        </View>
        {/* ----- Main - Header ----- */}

        {/* ----- Top Rated ----- */}
        <View style={styles.section}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>
              {i18n.t("home.headers.topRated")}
              <Ionicons
                name="flame"
                alt="flame-logo"
                color={"orange"}
                size={22}
              />
            </Text>

            <Pressable
              onPress={() => handleSeeAll("Top Rated", byRating.slice(0, 40))}
            >
              <Text style={styles.seeAll}>{i18n.t("home.seeAll")}</Text>
            </Pressable>
          </View>
          <HorizontalCourses
            data={byRating.slice(0, 8)}
            handleCourse={handleCourse}
          />
        </View>
        {/* ----- Top Rated ----- */}

        {/* --- ACCA --- */}
        <View style={styles.section}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>ACCA</Text>
            <Pressable onPress={() => handleSeeAll("ACCA", accaCourses)}>
              <Text style={styles.seeAll}>{i18n.t("home.seeAll")}</Text>
            </Pressable>
          </View>
          <HorizontalCourses
            data={accaCourses.slice(0, 5)}
            handleCourse={handleCourse}
          />
        </View>

        {/* --- CFA --- */}
        <View style={styles.section}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>CFA</Text>
            <Pressable onPress={() => handleSeeAll("CFA", cfaCourses)}>
              <Text style={styles.seeAll}>{i18n.t("home.seeAll")}</Text>
            </Pressable>
          </View>
          <HorizontalCourses
            data={cfaCourses.slice(0, 5)}
            handleCourse={handleCourse}
          />
        </View>
      </ScrollView>
    </MySafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  section: {
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingLeft: 20,
  },
  headerImg: {
    flex: 1,
    height: 120,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 35,
    color: colors.primary,
  },
  sectionTitleWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  seeAll: {
    color: colors.primary,
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
