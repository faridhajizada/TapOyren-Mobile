import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const AboutUs = () => {
  return (
    <WebView source={{uri: 'https://tapoyren.com/about'}} style={{transform: [{ translateY: -70 }]}} />
  )
}

export default AboutUs

const styles = StyleSheet.create({})