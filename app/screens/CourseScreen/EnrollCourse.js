import React, { useContext, useState } from "react";
import { ScrollView, StyleSheet, View, Pressable } from "react-native";
import { PricingCard, Overlay } from "react-native-elements";
import * as Network from "expo-network";
import { AuthContext } from "../../context/authContext";
import { LangContext } from "../../context/langContext";
import { initiatePayment } from "../../api/paymentAPI";
import WebView from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import i18n from "../../service/i18n";

const EnrollCourse = ({ route, navigation }) => {
  const [isVisibleOverlay, setIsVisibleOverlay] = useState(false);
  const [url, setUrl] = useState("");
  const [urlIsLoading, setUrlIsLoading] = useState(false);
  const { priceMonthly, priceQuarterly, priceSemiannually, priceAnnually } =
    route.params.prices;
  const { userData } = useContext(AuthContext);
  const { lang } = useContext(LangContext);
  const prices = [
    {
      idx: 0,
      title: "course.enroll.monthly",
      type: "monthly",
      color: "#4f9deb",
      info: null,
      price: priceMonthly,
    },
    {
      idx: 1,
      title: "course.enroll.quarterly",
      type: "quarterly",
      color: "#A72CE9",
      info: ["Recommended"],
      price: priceQuarterly,
    },
    {
      idx: 2,
      title: "course.enroll.semiannually",
      type: "semiannually",
      color: "#FF7500",
      info: ["Some basic info if u want"],
      price: priceSemiannually,
    },
    {
      idx: 3,
      title: "course.enroll.annually",
      type: "annually",
      color: "#ff00ff",
      info: ["Some basic info if u want"],
      price: priceAnnually,
    },
  ];

  const fetchIp = async () => {
    try {
      const res = await Network.getIpAddressAsync();
      console.log(res);
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  };

  const handleEnroll = async (item) => {
    setUrlIsLoading(true);
    const payload = {
      amount: (item.price * 100).toFixed(),
      currency: "944",
      language: lang.value,
      ipAddress: "string",
      courseId: route.params.courseId,
      studentId: +userData.id,
    };

    try {
      const res = await initiatePayment(payload);
      const url = res.data;
      setUrl(url);
      setIsVisibleOverlay(true);
    } catch (error) {
      console.error("Error initiating payment:", error);
    } finally {
      setUrlIsLoading(false);
    }
  };

  return (
    <MySafeAreaView>
      <ScrollView>
        {prices.map(
          (item) =>
            item.price !== 0 && (
              <PricingCard
                key={item.idx}
                color={item.color}
                title={i18n.t(item.title)}
                price={"₼ " + item.price}
                info={item.info}
                button={{
                  title: `  ${i18n.t("course.enroll.btn")}`,
                  icon: "payments",
                  loading: urlIsLoading,
                }}
                onButtonPress={() => handleEnroll(item)}
              />
            )
        )}
        <Overlay isVisible={isVisibleOverlay} fullScreen>
          <View style={styles.container}>
            <Pressable
              onPress={() => {
                setIsVisibleOverlay(false);
              }}
              style={{ padding: 7, width: 48 }}
            >
              <Ionicons name="close-outline" color="#3c3c3c" size={34} />
            </Pressable>
            <WebView
              source={{ uri: url }}
              onLoadEnd={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
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
    flex: 1,
  },
});
