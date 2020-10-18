import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { markers, mapStandardStyle } from '../model/mapData';

import * as Location from 'expo-location';

const { width } = Dimensions.get("window");
const CARD_HEIGHT = 180;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = () => {

  const [hasPermission, setHasPermission] = useState(false);
  const [region, setRegion] = useState(null);
  const [isRegionChanged, setIsRegionChanged] = useState(false);

  const [loadedMarkers, setLoadedMarkers] = useState(markers);

  const [previewIndex, setPreviewIndex] = useState(0);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [toolBarEnabled, setToolBarEnabled] = useState(true);

  const [mapFlex, setMapFlex] = useState(0);
  const [mapBottom, setMapBottom] = useState(0);

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
      }
    })();
  });

  const onMarkerPress = (mapEventData, index) => {
    setIsPreviewVisible(true)
    setToolBarEnabled(true)
    setPreviewIndex(index)
    setMapBottom(1) // Quick fix for 'toolbarEnabled' on MapView
  }

  const onRegionChangeComplete = (region) => {
    setIsRegionChanged(true)
    setRegion(null);
  }

  const onMapPress = () => {
    setIsPreviewVisible(false)
  }

  const onMapReady = () => {
    setMapFlex(1) //Quick fix for 'showsMyLocationButton' on MapView
  }

  const onRemoveMarker = () => {
    setIsPreviewVisible(false)
    setToolBarEnabled(false)
    loadedMarkers.splice(previewIndex, 1)
  }

  const displayPreview = () => (
    <View style={styles.card}>
    <ImageBackground
      source={markers[previewIndex].image}
      style={styles.cardImage}
      resizeMode="cover"
    >
      {/* <View style={styles.button}> */}
        <TouchableOpacity
          onPress={onRemoveMarker}
          style={styles.removeButton}>
          <MaterialCommunityIcons
            name="close"
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      {/* </View> */}
    </ImageBackground>
    <View style={styles.textContent}>
      <Text numberOfLines={1} style={styles.cardLike}>64 likes </Text>
        <Text numberOfLines={1} style={styles.cardOwner}>[By @Seal]</Text>
      </View>
    </View>
  )

  if (hasPermission === false) {
    return <Text>No access to location</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <MapView
        style={{flex: mapFlex, bottom: mapBottom}}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStandardStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        toolbarEnabled={toolBarEnabled}
        onPress={onMapPress}
        onMapReady={onMapReady}
      >
        {loadedMarkers.map((marker, index) => {
          return (
            <MapView.Marker key={index} coordinate={marker.coordinate} onPress={(e) => onMarkerPress(e, index)}>
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
      </MapView>
      <Animated.View
        horizontal
        style={styles.buttonView}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}>
      </Animated.View>
      <Animated.View
        horizontal
        style={styles.imageView}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}>
        {isPreviewVisible && displayPreview()}
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
    marginBottom: 50,
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
    // flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  cardOwner: {
    fontSize: 14,
  },
  cardLike: {
    fontSize: 14,
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
  },
  removeButton: {
    padding: 5,
    backgroundColor: '#d02860',
    alignSelf: 'flex-end',
    marginRight: 5,
    marginTop: 5,
    borderRadius: 15,
    alignItems: 'flex-end',
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  deleteIcon: {
    color: '#fff',
  },
});
