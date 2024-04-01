import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const SplashScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Image source={require('../../assets/splash.png')} style={{flex: 1, width: '100%', height: "100%"}} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})
