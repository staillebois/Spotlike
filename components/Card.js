import React from 'react'
import { Platform, StyleSheet, View, Image, Text } from 'react-native'

export const Card = ({ pic }) => (
      <Image source={pic}>
      </Image>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // aspectRatio: 3/2,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  }
})
