import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";

import { AuthContext } from "./context/authContext";
import AppTabNavigator from "./navigators/AppTabNavigator";
import Loader from "./components/Loader/Loader";
import { LangContext } from "./context/langContext";

const PosApp = () => {
  const {lang} = useContext(LangContext);
  const [tokenIsFetched, setTokenIsFetched] = useState(false);
  const { refreshAccessToken } = useContext(AuthContext);

  const fetchToken = async () => {
    let res = await refreshAccessToken();
    setTokenIsFetched(res);
  };

  useEffect(() => {
    let mounted = true;
    if(mounted) fetchToken();
    return () => {
      mounted = false;
    }
  }, []);

  return (
    <>
      {tokenIsFetched ? <AppTabNavigator /> : <Loader /> }
    </>
  );
};

export default PosApp;

const styles = StyleSheet.create({});
