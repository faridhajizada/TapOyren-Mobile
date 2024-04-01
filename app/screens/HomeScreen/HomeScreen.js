import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Pressable,
  Animated,
} from "react-native";
import * as SplashScreen from 'expo-splash-screen';

import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import colors from "../../config/colors";
import { getCourses } from "../../api/searchScreenAPI";
import HorizontalCourses from "../../components/HomeScreen/HorizontalCourses";
import { getCourses as getCoursesBySubcatId } from '../../api/categoryScreenAPI';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from "../../context/authContext";
import i18n from "../../service/i18n";
import { LangContext } from "../../context/langContext";


const HomeScreen = ({ navigation }) => {
  const [byRating, setByRating] = useState([]);
  const [accaCourses, setAccaCourses] = useState([]);
  const [cfaCourses, setCfaCourses] = useState([]);
  const {isAuth} = useContext(AuthContext);
  const {lang} = useContext(LangContext);
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
        useNativeDriver: true
      }).start();
      Animated.timing(fade2, {
        toValue: 1,
        duration: 500,
        delay: 800,
        useNativeDriver: true
      }).start();
      Animated.timing(fade3, {
        toValue: 1,
        duration: 500,
        delay: 1300,
        useNativeDriver: true
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
    let mounted = true;
    if(mounted) {
      fetchCourses();
      fetchACCA();
      fetchCFA();
    }
    return () => {
      mounted = false;
    }
    
  }, [isAuth, lang]);

  return (
    <MySafeAreaView>
      <ScrollView>
        
          <View style={styles.header}>
            <View>
              <Animated.View style={{opacity: fade1}}><Text style={styles.headerTitle}>{i18n.t('home.title.h1')}</Text></Animated.View>
              <Animated.View style={{opacity: fade2}}><Text style={styles.headerTitle}>{i18n.t('home.title.h2')}</Text></Animated.View>
              <Animated.View style={{opacity: fade3}}><Text style={styles.headerTitle}>{i18n.t('home.title.h3')}</Text></Animated.View>
            </View>
            <Image
              style={styles.headerImg}
              resizeMode="contain"
              source={{
                uri: "https://tapoyren.com/public/design/assets/hero-splash.png",
              }}
            />
          </View>

        {/* --- TOP RATED--- */}
        <View style={[styles.topRated, styles.section]}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>
            {i18n.t('home.headers.topRated')} <Ionicons name="flame" color={'orange'} size={22} />
            </Text>
            <Pressable
              onPress={() => handleSeeAll("Top Rated", byRating.slice(0, 40))}
            >
              <Text style={{color: colors.primary, fontSize: 18}}>{i18n.t('home.seeAll')}</Text>
            </Pressable>
          </View>
          <HorizontalCourses data={byRating.slice(0, 5)} handleCourse={handleCourse} />
        </View>

        {/* --- ACCA --- */}
        <View style={[styles.randomSubcatCourses, styles.section]}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>ACCA</Text>
            <Pressable
              onPress={() => handleSeeAll("ACCA", accaCourses)}
            >
              <Text style={{color: colors.primary, fontSize: 18}}>{i18n.t('home.seeAll')}</Text>
            </Pressable>
          </View>
          <HorizontalCourses data={accaCourses.slice(0, 5)} handleCourse={handleCourse} />
        </View>

        {/* --- CFA --- */}
        <View style={[styles.randomSubcatCourses, styles.section]}>
          <View style={styles.sectionTitleWrap}>
            <Text style={styles.sectionTitle}>CFA</Text>
            <Pressable
              onPress={() => handleSeeAll("CFA", cfaCourses)}
            >
              <Text style={{color: colors.primary, fontSize: 18}}>{i18n.t('home.seeAll')}</Text>
            </Pressable>
          </View>
          <HorizontalCourses data={cfaCourses.slice(0, 5)} handleCourse={handleCourse} />
        </View>
      </ScrollView>
    </MySafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  section: {
    marginVertical: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingLeft: 20,
  },
  headerImg: {
    flex: 1,
    marginLeft: 50,
  },
  headerTitle: {
    fontWeight: "700",
    fontSize: 30,
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
});


const TextInfo = ({txt, title}) => {
  const [show, setShow] = useState(false);

  const toggleText = () => {
    setShow(prev => !prev)
  }
  return (
    // <View style={{paddingHorizontal: 15, paddingVertical: 10, borderWidth: 1}}>
    //   <Text style={{fontWeight: '600', fontSize: 17}}>{title}</Text>
    //   <Text numberOfLines={show ? null : 1} style={{fontSize: 16}}>{txt}</Text>
    //   <Pressable onPress={toggleText}><Text style={{textAlign: 'right'}}>show {show ? 'less' : 'more'}</Text></Pressable>
    // </View>
    null
  )
}