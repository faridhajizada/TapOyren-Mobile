import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const Contact = () => {
  return (
    <WebView source={{uri: 'https://tapoyren.com/contact'}} style={{transform: [{ translateY: -70 }]}} />
  )
}

export default Contact

const styles = StyleSheet.create({})