import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { markers, mapStandardStyle } from '../model/mapData';

import * as Location from 'expo-location';

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = () => {

  const [hasPermission, setHasPermission] = useState(false);
  const [region, setRegion] = useState(null);
  const [isRegionChanged, setIsRegionChanged] = useState(false);

  const [currentMarkers, setCurrentMarkers] = useState(markers);
  const [currentPositionMarker, setCurrentPositionMarker] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }

      if (isRegionChanged === false) {
        let currentPosition = await Location.getLastKnownPositionAsync({});
        setRegion({
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
          latitudeDelta: 0.04864195044303443,
          longitudeDelta: 0.040142817690068,
        })
        setCurrentPositionMarker({
          coordinate: {
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
          }
        })
      }
    })();
  });

  const onMarkerPress = (mapEventData) => {
    console.log('marker=' + mapEventData)
  }

  const displayCurrentPosition = () => {
    setIsRegionChanged(false)
  }

  const onRegionChangeComplete = (region) => {
    setIsRegionChanged(true)
    setRegion(null);
  }

  const displayCurrentPositionMarker = () => (
    <MapView.Marker coordinate={currentPositionMarker.coordinate} />
  )

  if (hasPermission === false) {
    return <Text>No access to location</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStandardStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {currentMarkers.map((marker, index) => {
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e)}>
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={require('../assets/map_marker.png')}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
        {currentPositionMarker !== null && displayCurrentPositionMarker()}
      </MapView>
      <Animated.View
        horizontal
        style={styles.buttonView}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}>
        <TouchableOpacity
          style={{
            marginTop: 8,
            marginEnd: 10,
          }}>
          <MaterialCommunityIcons.Button
            name="map-marker-radius"
            size={25}
            iconStyle={{ marginLeft: 8, }}
            backgroundColor='rgba(52, 52, 52, 0.6)'
            onPress={() => displayCurrentPosition()}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        horizontal
        style={styles.imageView}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
      >
        <View style={styles.card}>
          <Image
            source={markers[0].image}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.textContent}>
            <Text numberOfLines={1} style={styles.cardtitle}>{markers[0].title}</Text>
            <Text numberOfLines={1} style={styles.cardLike}>64 likes</Text>
            <Text numberOfLines={1} style={styles.cardDescription}>{markers[0].description}</Text>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => { }}
                style={[styles.remove, {
                  borderColor: '#FF6347',
                  borderWidth: 1
                }]}
              >
                <Text style={[styles.textSign, { color: '#FF6347' }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  buttonView: {
    position: "absolute",
    // bottom: 0,
    // left: 0,
    right: 0,
    // paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 40,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 14,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  cardLike: {
    fontSize: 12,
    color: "#444",
    fontWeight: "bold",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  remove: {
    width: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  }
});
