import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'

const Terms = () => {
  return (
    <WebView source={{uri: 'https://tapoyren.com/terms_and_conditions'}} style={{transform: [{ translateY: -70 }]}} />
  )
}

export default Terms

const styles = StyleSheet.create({})