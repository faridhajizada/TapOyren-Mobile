import React, {useState, useEffect, useContext} from "react";
import { Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, ScrollView, FlatList, Platform, Image } from "react-native";
import Fuse from 'fuse.js'
import i18n from '../../service/i18n'

import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import commonStyles from '../../config/commonStyles'
import { getCourses } from "../../api/searchScreenAPI";
import Loader from '../../components/Loader/Loader';
import CategoryScreens from "../../components/CategoryComponents/CategoryScreens";
import CourseComponent from '../../components/CategoryComponents/CourseComponent';
import { LangContext } from "../../context/langContext";

const SearchScreen = ({ route, navigation }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [courses, setCourses] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [noCourses, setNoCourses] = useState(false);
  const {lang} = useContext(LangContext);
  const [options] = useState({
    includeScore: true,
    threshold: .4,
    keys: ['courseTitle']
  });

  const handleCourse = (id, title) => {
    navigation.navigate("CourseScreen", { id, title });
  };

  const handleChange = (text) => {
    setInputValue(text);
    if (text.trim() === '') {
      setNoCourses(false);
      setCourses([]);
      return;
    }
    let result = fuse.search(text);
    result.length === 0 ? setNoCourses(true) : setNoCourses(false);
    setCourses(result.map(i => i.item));
  }

  const fetchCourses = async () => {
    try {
      setisLoading(true);
      let res = await getCourses(lang.id);
      let data = await res.data;
      // setFuse(new Fuse([{id: 0, courseTitle: 'title 1'}, {id: 1, courseTitle: 'title 2'}, {id: 2, courseTitle: 'pzdc'}], options));
      setFuse(new Fuse(data, options));
    } catch (error) {
      console.log('searchscreen', error)
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    if(mounted) fetchCourses();
    return () => {
      mounted = false;
    }
  }, []);

  if (isLoading) return <Loader />
  
  return (
    <MySafeAreaView>
      <Text style={ commonStyles.screenTitle }>{i18n.t('search.title')}</Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <TextInput 
            style={[styles.searchInput, {borderColor: isFocused ? 'blue' : 'silver'}]}
            placeholder={`${i18n.t('search.placeholder')}...`}
            clearButtonMode='while-editing'
            value={inputValue}
            onChangeText={handleChange}
            onFocus={()=> setIsFocused(true)}
            onBlur={()=> setIsFocused(false)}
          />
        </View>
      </TouchableWithoutFeedback>
        {noCourses && <NoCoursesFound />}
        {inputValue === '' && <Discover /> }
        <CategoryScreens
          data={courses}
          numColumns={2}
          columnStyle={{ justifyContent: "space-between" }}
          CBfunc={handleCourse}
          SomeComponent={CourseComponent}
          myKey='courseId'
          handleRefresh={fetchCourses}
        />
    </MySafeAreaView>
  );
};

export default SearchScreen;

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
    borderWidth: 1
  },
  noCoursesWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    marginVertical: 10
  },
});

const NoCoursesFound = () => {
  return (
    <View style={styles.noCoursesWrap}>
      <Text style={styles.title}>No matching courses</Text>
      <Text>Try a different search.</Text>
    </View>
  );
}
const Discover = () => {
  return (
    <View style={styles.noCoursesWrap}>
      <Image source={require('../../assets/img/discovery.png')} style={{width: 100, height: 100}} resizeMode='contain' />
      <Text style={styles.title}>Discover our courses</Text>
      <Text style={{paddingHorizontal: 10, textAlign: 'center'}}>Try discover new courses with search or browse our categories.</Text>
    </View>
  );
}
