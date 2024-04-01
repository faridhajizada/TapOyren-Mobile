import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import i18n from "../service/i18n";

const LangContext = createContext(null);

const LangProvider = ({children}) => {
  const [lang, setLang] = useState({value: 'az', id: 1});
  // const [langId, setLangId] = useState(2);

  useEffect(() => {
    handleLang()
  }, []);

  const handleLang = async () => {
    let lang = await getLocalLang();
    // console.log('lang in context ', lang)
    lang ? setLocalLang(lang) : setLocalLang({value: 'az', id: 1});
  }

  const getLocalLang = async () => {
    let result = await SecureStore.getItemAsync('lang');
    return JSON.parse(result);
  };
  const setLocalLang = async (lang) => {
    await SecureStore.setItemAsync('lang', JSON.stringify(lang));
    i18n.changeLanguage(lang.value);
    setLang(lang)
  };

  return (
    <LangContext.Provider 
    value={{lang, setLocalLang}}>
      {children}
    </LangContext.Provider>
  )
}

export {LangContext, LangProvider};