import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const FAQ = () => {
  return (
    <WebView source={{uri: 'https://tapoyren.com/faq'}} style={{transform: [{ translateY: -70 }]}} />
  )
}

export default FAQ

const styles = StyleSheet.create({})