import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

const MySafeAreaView = ({children, bgColor = '#fff'}) => {
  return (
    <SafeAreaView style={[styles.container, 
      {backgroundColor: bgColor}
    ]}>
      <StatusBar backgroundColor='white' barStyle='dark-content' />
      {children}
    </SafeAreaView>
  )
}

export default MySafeAreaView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  }
})
