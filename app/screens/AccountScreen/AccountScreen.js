import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Switch } from "react-native-elements";

import MySafeAreaView from "../../components/MySafeAreaView/MySafeAreaView";
import { AuthContext } from "../../context/authContext";
import { LangContext } from "../../context/langContext";
import commonStyles from "../../config/commonStyles";
import colors from "../../config/colors";
import i18n from "../../service/i18n";

const listItems = [
  {icon: 'settings-outline', txt: 'account.list.info', func: 'settings'},
  {icon: 'language-outline', txt: 'account.list.lang', func: 'lang'},
  {icon: 'information-circle-outline', txt: 'account.list.about', func: 'about'},
  {icon: 'book-outline', txt: 'account.list.faq', func: 'faq'},
  {icon: 'call-outline', txt: 'account.list.call', func: 'contact'},
  {icon: 'document-outline', txt: 'account.list.terms', func: 'terms'},
  {icon: 'log-out-outline', txt: 'account.list.logout', func: 'logout'},
]
// const listItems = [
//   {icon: 'settings-outline', txt: 'Profile Info', func: 'settings'},
//   {icon: 'language-outline', txt: 'Language', func: 'lang'},
//   {icon: 'information-circle-outline', txt: 'About Us', func: 'about'},
//   {icon: 'book-outline', txt: 'FAQ', func: 'faq'},
//   {icon: 'call-outline', txt: 'Contact Us', func: 'contact'},
//   {icon: 'document-outline', txt: 'Terms and Conditions', func: 'terms'},
//   {icon: 'log-out-outline', txt: 'Logout', func: 'logout'},
// ]

const AccountScreen = ({navigation}) => {
  const { logout, userData } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  // const {lang} = useContext(LangContext);

  // useEffect(() => {}, [lang]);

  const handleNavigate = (switcher) => {
    switch (switcher) {
      case 'settings': return navigation.navigate('AccountSettings', {title: i18n.t(listItems[0].txt)});
      case 'lang': return navigation.navigate('AccountLanguage', {title: i18n.t(listItems[1].txt)});
      case 'about': return navigation.navigate('AccountAboutus', {title: i18n.t(listItems[2].txt)});
      case 'faq': return navigation.navigate('AccountFAQ', {title: i18n.t(listItems[3].txt)});
      case 'contact': return navigation.navigate('AccountContact', {title: i18n.t(listItems[4].txt)});
      case 'terms': return navigation.navigate('AccountTerms', {title: i18n.t(listItems[5].txt)});
      case 'logout': return logout();
      default:
        break;
    }
  }
  
  
  return (
    <MySafeAreaView>
      <Text style={ commonStyles.screenTitle }>{i18n.t('account.title')}</Text>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarBox}>
            <Image source={{uri: 'https://b1.filmpro.ru/c/377809.600xp.jpg'}} style={styles.avatar} />
          </View>
          <View style={styles.nameBox}>
            <Text style={styles.name}>{userData.given_name}</Text>
            <Text style={styles.role}>{i18n.t('account.role.student')}</Text>
          </View>
        </View>
        <View style={styles.content}>
          {/* <View style={styles.listItem}>
            <View style={styles.left}>
              <Ionicons name='moon-outline' size={25} color={colors.primary} />
            </View>
            <View style={styles.right}>
              <Text style={styles.listItemTitle}>{i18n.t('account.list.theme')}</Text>
              <Switch value={checked} onValueChange={(value) => setChecked(value)} />
            </View>
          </View> */}

          {listItems.map(item => (
            <TouchableOpacity onPress={() => handleNavigate(item.func)} key={item.txt}>
              <View style={styles.listItem}>
                <View style={styles.left}>
                  <Ionicons name={item.icon} size={25} color={colors.primary} />
                </View>
                <View style={styles.right}>
                  <Text style={styles.listItemTitle}>{i18n.t(item.txt)}</Text>
                  <Ionicons name="chevron-forward-outline" size={22} color={colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>
    </MySafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  nameBox: {
    paddingTop: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  listItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: 'silver',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 7,
  },
  listItemTitle: {
    fontSize: 18,
  }
});
