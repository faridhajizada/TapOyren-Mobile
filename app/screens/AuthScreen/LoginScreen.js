import React, { useState, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Button, CheckBox, Input, Overlay } from "react-native-elements";
import { forgetPassword } from "../../api/accountScreenAPI";

import colors from "../../config/colors";
import i18n from '../../service/i18n'


const LoginScreen = ({loginFromParent}) => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  // const {setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);

  const handleSignIn = async () => {
    // username validation
    // if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username)) return setUsernameError('Email is invalid')
    // else setUsernameError('')
    // password validation
    // if(password.length < 8) return setPasswordError('Password less than 8 charcters')
    // else setPasswordError('')
    let user = {
        email: username,
        password,
    }
    loginFromParent(user, setLoading);
  };
  const handleResetPassword = async () => {
    // if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return setEmailError('Email is invalid')
    // else setEmailError('')
    try {
      setLoadingReset(true);
      let res = await forgetPassword({email});
      let data = await res.data;
      console.log(data)
      setShowResetConfirm(true);
      setEmail('');
    } catch (error) {
      console.log('reset pass error ', error);
    } finally {
      setLoadingReset(false);
      setModalVisible(false);
    }
  };
  return (
    <View>
      <Input
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        leftIcon={{ type: "ionicon", name: "person", color: "gray" }}
        errorMessage={usernameError}
        inputContainerStyle={usernameError && {borderBottomColor: 'red'}}
      />
      <Input
        placeholder="Password"
        value={password}
        // onChangeText={setPassword}
        onChangeText={(e) => setPassword(prev => prev = e.toString())}
        leftIcon={{ type: "ionicon", name: "lock-closed", color: "gray" }}
        secureTextEntry
        errorMessage={passwordError}
        inputContainerStyle={passwordError && {borderBottomColor: 'red'}}
      />
      {showResetConfirm && <Text style={{fontSize: 16, color: 'red'}}>{i18n.t('auth.checkEmail')}</Text>}
      {/* <CheckBox
        title="Remember me"
        checked={rememberMe}
        textStyle={{ fontWeight: "500", fontSize: 16 }}
        containerStyle={{ backgroundColor: null }}
        onPress={() => setRememberMe((prev) => !prev)}
      /> */}
      <Button
        title={i18n.t('auth.signin')}
        buttonStyle={{ backgroundColor: colors.primary, marginVertical: 20 }}
        onPress={handleSignIn}
        disabled={username.trim() && password.trim() ? false : true}
        loading={loading}
      />

      {/* ------- forget pass modal ------- */}

      <Pressable onPress={() => setModalVisible(true)}>
        <Text style={{fontSize: 17}}>{i18n.t('auth.forget')}</Text>
      </Pressable>
      <Overlay
        isVisible={modalVisible}
        onBackdropPress={() => {setModalVisible(false); setShowResetConfirm(false)}}
        overlayStyle={{ width: "95%" }}
        animationType='fade'
      >
        <View style={styles.modalContent}>
          <Input
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            leftIcon={{ type: "ionicon", name: "mail", color: "gray" }}
            errorMessage={emailError}
            inputContainerStyle={emailError && {borderBottomColor: 'red'}}
          />
          <Button
            title="Reset Password"
            buttonStyle={{ backgroundColor: colors.primary, marginTop: 15 }}
            onPress={handleResetPassword}
            disabled={email.trim() ? false : true}
            loading={loadingReset}
          />
        </View>
      </Overlay>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  modalContent: {
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
});
