import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VimeoPlayer } from "@mindtechapps/rn-vimeo-player";
import { Tab, TabView } from "react-native-elements";
import sanitize from "sanitize-html";
import WebView from "react-native-webview";
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';

import colors from "../../config/colors";
import { getCourse } from "../../api/courseScreenAPI";
import Loader from "../../components/Loader/Loader";
import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import CourseSections from "../../components/CategoryComponents/CourseSections";
import CourseMore from "./CourseMore";
import InstructorInfo from "../../components/CourseComponents/instructorInfo";
import { AuthContext } from "../../context/authContext";
import { useIsFocused } from '@react-navigation/native';
import i18n from '../../service/i18n'


const CourseScreen = ({ route, navigation }) => {
  const [{ videoId, videoTitle }, setVideoId] = useState({});
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [course, setCourse] = useState({});
  const {isAuth, userData} = useContext(AuthContext);
  const isFocused = useIsFocused(true);
  const [progress, setProgress] = useState(0);
  const [localPath, setLocalPath] = useState('');

  const fetchCourse = async () => {
    try {
      setisLoading(true);
      let res = await getCourse(route.params.id);
      let data = await res.data;
      setCourse(data[0]);
      // console.log(data[0].priceQuarterly);
    } catch (error) {
      console.log("Error from course screen ", error);
    } finally {
      setisLoading(false);
    }
  };

  const handleDelete = async () => {
    await FileSystem.deleteAsync(localPath);
    setProgress(0);
    setLocalPath('');
  }

  const handleDownload = async () => {
    // const url = `https://player.vimeo.com/video/${videoId}`
    // const url = `https://player.vimeo.com/video/692856274`
    const url = 'http://techslides.com/demos/sample-videos/small.mp4';
    
    const callback = downloadProgress => {
      let prog = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      prog *= 100;
      setProgress(parseInt(prog));
    };
    
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + 'video1.mp4',
      {},
      callback
    );
    
    try {
      const { uri } = await downloadResumable.downloadAsync();
      setLocalPath(uri);
      console.log('Finished downloading to ', uri);
    } catch (e) {
      console.error(e);
    }
  }

  const goToEnroll = () => {
    if (isAuth) {
      const prices = {
        priceMonthly: course.priceMonthly,
        priceQuarterly: course.priceQuarterly,
        priceSemianually: course.priceSemianually,
        priceAnually: course.priceAnually,
      }
      navigation.navigate("Enroll", { title: course.title, prices, courseId: course.id });
    } else {
      navigation.navigate('Account', { screen: 'AuthScreen' })
    }
  };

  useEffect(() => {
    if (!isFocused) return;
    let mounted = true;
    if(mounted) fetchCourse()
    return () => {
      mounted = false;
    }
  }, [route.params.id, isFocused, isAuth]);

  if (isLoading) return <Loader />;

  return (
    <MySafeAreaView>
      {videoId && (
        <View>
          <View style={{height: Dimensions.get("window").width / 1.78}}>
            {/* <VimeoPlayer videoId={videoId} loaderColor={colors.primary} /> */}
            <WebView 
              source={{
                uri: `https://player.vimeo.com/video/${videoId}`, 
                headers: {"Referer": "https://tapoyren.com"}
              }} 
              onLoadStart={() => setIsVideoLoading(true)} 
              onLoadEnd={() => setIsVideoLoading(false)}
              onError={(err) => console.warn('error from video webview', err)}
              allowsFullscreenVideo={true}
            />
            {isVideoLoading && <View style={styles.videoLoader}><Loader /></View>}
          </View>
          <View style={styles.playingTitle}>
            <Text style={{ fontSize: 17 }}>{videoTitle}</Text>
            <Button onPress={handleDownload} disabled={!!progress } title="Save" />
            <Button onPress={handleDelete} disabled={!localPath} title="Delete" style={{color: 'red'}} />
            <Text>{progress}%</Text>
            {progress === 100 && (
              <Video
                style={{width: 320,height: 200}}
                source={{
                  uri: localPath
                }}
                useNativeControls
                resizeMode="contain"
                // isLooping
              />
            )}
          </View>
        </View>
      )}
      {!videoId && <InstructorInfo navigation={navigation} course={course} courseId={route.params.id} />}
      <Tab
        value={tabIndex}
        onChange={setTabIndex}
        indicatorStyle={{ backgroundColor: "blue" }}
      >
        <Tab.Item
          title={i18n.t('course.tabs.videos')}
          titleStyle={styles.tabTitle}
          containerStyle={styles.tabContainer}
        />
        <Tab.Item
          title={i18n.t('course.tabs.about')}
          titleStyle={styles.tabTitle}
          containerStyle={styles.tabContainer}
        />
        <Tab.Item
          title={i18n.t('course.tabs.more.title')}
          titleStyle={styles.tabTitle}
          containerStyle={styles.tabContainer}
        />
      </Tab>
      {/* <ScrollView> */}
        <TabView value={tabIndex} onChange={setTabIndex}>
          <TabView.Item style={{ width: "100%"}} onMoveShouldSetResponder={e => e.stopPropagation()}>
            <CourseSections
              setVideoId={setVideoId}
              courseId={route.params.id}
              isEnroll={course.isEnroll}
            />
          </TabView.Item>
          <TabView.Item onMoveShouldSetResponder={e => e.stopPropagation()}>
            <ScrollView style={{padding: 10}}>
              {videoId && (
                <InstructorInfo navigation={navigation} course={course} />
              )}
              <Text h1>
                {sanitize(course.about, {
                  allowedTags: [],
                  allowedAttributes: [],
                })}
              </Text>
            </ScrollView>
          </TabView.Item>
          <TabView.Item onMoveShouldSetResponder={e => e.stopPropagation()}>
            <CourseMore course={course} navigation={navigation} />
          </TabView.Item>
        </TabView>
      {/* </ScrollView> */}
      {course.isEnrolled === null && (
        <TouchableOpacity style={styles.enrollBtnWrap} onPress={goToEnroll}>
          <Text style={styles.enrollBtn}>{i18n.t('course.enroll.title')}</Text>
        </TouchableOpacity>
      )}
    </MySafeAreaView>
  );
};

export default CourseScreen;

const styles = StyleSheet.create({
  videoLoader: {
    position: 'absolute',
    // top: Dimensions.get("window").width / (1.78 * 2) - 40,
    // left: Dimensions.get("window").width / 2 - 40,
    width: '100%',
    height: '100%',
    backgroundColor: '#eee'
  },
  playingVideo: {
    fontSize: 20,
    fontWeight: "600",
    padding: 10,
  },
  playingTitle: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "silver",
  },
  priceRating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  price: {
    color: colors.primary,
    fontSize: 20,
  },
  tabTitle: {
    color: "#000",
    textTransform: "capitalize",
    paddingVertical: 1,
  },
  tabContainer: {
    backgroundColor: "#eee",
  },
  enrollBtnWrap: {
    backgroundColor: colors.primary,
    justifyContent: "center",
  },
  enrollBtn: {
    color: colors.white,
    textAlign: "center",
    paddingVertical: 12,
    fontWeight: "600",
    fontSize: 18,
  },
});
