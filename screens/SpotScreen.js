import React, { useRef } from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-deck-swiper';
import { HomeScreenPics } from '../constants/Pics'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SpotScreen = () => {
  const swipeRef = useRef();

  const Card = ({ pic }) => (
    <ImageBackground source={pic} style={styles.image} imageStyle={{ borderRadius: 10}}>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={styles.dislikeButton}>
          <MaterialCommunityIcons
            name="close"
            size={20}
            style={styles.dislikeIcon}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={styles.likeButton}>
          <MaterialCommunityIcons
            name="heart"
            size={20}
            style={styles.likeIcon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )

  const dislike = () => (
    console.log('dislike')
  )

  const like = () => (
    console.log('like')
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.container}>
        <Swiper
          useViewOverflow={Platform.OS === 'ios'}
          ref={swipeRef}
          cards={HomeScreenPics}
          infinite={true}
          renderCard={Card}
          stackSize={1}
          backgroundColor="rgba(0,0,0,0)"
          cardVerticalMargin={20}
          onSwipedLeft={() => dislike()}
          onSwipedRight={() => like()}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'white',
                  borderColor: 'red',
                  color: 'red',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 50,
                  marginLeft: -50
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'white',
                  borderColor: 'green',
                  color: 'green',
                  borderWidth: 5
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
        >
        </Swiper>
      </View>
    </SafeAreaView>
  );
};

export default SpotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderColor: '#E8E8E8',
    marginBottom: 70,
    borderWidth: 3,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    // alignContent: 'flex-end',
    // alignSelf: 'flex-end',
  },
  dislikeButton: {
    backgroundColor: '#d02860',
    alignSelf: 'flex-end',
    borderRadius: 15,
    padding: 10,
    marginLeft: 40,
    marginBottom: 40,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  likeButton: {
    backgroundColor: '#00897B',
    alignSelf: 'flex-end',
    borderRadius: 15,
    padding: 10,
    marginRight: 40,
    marginBottom: 40,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  dislikeIcon: {
    color: '#fff',
  },
  likeIcon: {
    color: '#fff'
  }
})
