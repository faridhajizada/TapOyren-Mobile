import React, {useContext, useState, useEffect} from "react";
import { StyleSheet, ScrollView, Text, TextInput, View, Pressable } from "react-native";
import { Button, Overlay, PricingCard } from "react-native-elements";
import * as Network from 'expo-network';
import { AuthContext } from "../../context/authContext";
import { LangContext } from "../../context/langContext";
import { initiatePayment } from '../../api/paymentAPI';
import WebView from "react-native-webview";
import { Ionicons } from '@expo/vector-icons';
import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import i18n from '../../service/i18n'


const EnrollCourse = ({route, navigation}) => {
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [url, setUrl] = useState('');
  const [urlIsLoading, setUrlIsLoading] = useState(false);
  const {priceMonthly, priceQuarterly, priceSemiannually, priceAnnually} = route.params.prices;
  const {userData} = useContext(AuthContext);
  const {lang} = useContext(LangContext);
  const prices = [
    {idx: 0, title: 'course.enroll.monthly', type: 'monthly', color: '#4f9deb', info: null, price: priceMonthly},
    {idx: 1, title: 'course.enroll.quarterly', type: 'quarterly', color: '#A72CE9', info: ["Recommended"], price: priceQuarterly},
    {idx: 2, title: 'course.enroll.semiannually', type: 'semiannually', color: '#FF7500', info: ["Some basic info if u want"], price: priceSemiannually},
    {idx: 3, title: 'course.enroll.annually', type: 'annually', color: 'light-green', info: ["Some basic info if u want"], price: priceAnnually},
  ];
  
  const fetchIp = async () => {
    let res = await Network.getIpAddressAsync();
    console.log(res)
  }

  // useEffect(() => {
  //   fetchIp()
  // }, [])

  const handleEnroll = async (item) => {
    setUrlIsLoading(true);
    let payload = {
      amount: (item.price * 100).toFixed() + '',
      currency: "944",
      language: lang.value,
      ipAddress: "string",
      courseId: route.params.courseId,
      studentId: +userData.id
    }
    try {
      let res = await initiatePayment(payload);
      let url = await res.data;
      await setUrl(url)
      setIsVisibleOverlay(true)
    } catch (error) {
      console.log('error from enrollcourse', error)
    } finally {
      setUrlIsLoading(false);
    }
  }

  return (
    <MySafeAreaView>
      <ScrollView>
        {
          prices.map(item => {
            if(item.price !== 0) {
              return <PricingCard
                key={item.idx}
                color={item.color}
                title={i18n.t(item.title)}
                price={'₼ ' + item.price}
                info={item.info}
                button={{ title: `  ${i18n.t('course.enroll.btn')}`, icon: "payments", loading: urlIsLoading }}
                onButtonPress={() => handleEnroll(item)}
              />
            }
          })
        }
        <Overlay isVisible={isVisibleOverlay} fullScreen>
          <View style={styles.container}>
            {/* <Pressable onPress={() => {setIsVisibleOverlay(false)}} style={{padding: 7, width: 48}}> */}
            <Pressable onPress={() => {navigation.goBack()}} style={{padding: 7, width: 48}}>
              <Ionicons name='close-outline' color='#3c3c3c' size={34} />
            </Pressable>
            <WebView
              source={{uri: url}}
              onLoadEnd={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                // console.log(nativeEvent)
              }}
            />
          </View>
        </Overlay>
      </ScrollView>
    </MySafeAreaView>
  );
};

export default EnrollCourse;

const styles = StyleSheet.create({
  container: {
    paddingTop: 35,
    flex: 1
  },
});
