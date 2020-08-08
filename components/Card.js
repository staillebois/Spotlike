import React from 'react'
import { Platform, StyleSheet, View, Image, Text } from 'react-native'

export const Card = ({ pic }) => (
  <View style={styles.container}>
      <Image source={pic}>
      </Image>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
