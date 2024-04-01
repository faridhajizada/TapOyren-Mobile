import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'

import commonStyles from '../../config/commonStyles'
import colors from '../../config/colors'

const CategoryComponent = ({item, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.parentCategoryId, item.parentCategoryTitle)}>
      <View style={[styles.category, commonStyles.shadow]}>
        <Text numberOfLines={3} style={styles.title}>{item.parentCategoryTitle}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default CategoryComponent

const styles = StyleSheet.create({
  category: {
    width: 150,
    height: 150,
    padding: 10,
    borderRadius: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 10,
    backgroundColor: colors.primary,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: colors.white, 
  }
})
