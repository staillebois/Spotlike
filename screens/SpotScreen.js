import React, { useRef } from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import Swiper from 'react-native-deck-swiper';
import { HomeScreenPics } from '../constants/Pics'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SpotScreen = () => {
  const swipeRef = useRef();

  const Card = ({ pic }) => (
      <Image source={pic} style={styles.image}/>
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
      <View style={styles.buttonView}>
      <TouchableOpacity
        onPress={() => swipeRef.current.swipeLeft()}
        style={styles.dislikeButton}>
        <MaterialCommunityIcons
          name="close-circle"
          size={50}
          style={styles.dislikeIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()  => swipeRef.current.swipeRight()}
        style={styles.likeButton}>
        <MaterialCommunityIcons
          name="heart-circle"
          size={50}
          style={styles.likeIcon}
        />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SpotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { 
    flex: 1, 
    width: null, 
    height: null,
    borderColor: '#E8E8E8',
    marginBottom: 120,
    borderWidth: 5,
    borderRadius: 10, 
    resizeMode: 'cover' 
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  buttonView: { 
    flexDirection: 'row',
     alignItems: 'center'
  },
  dislikeButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 40,
    marginRight: 10,
    marginBottom: 50,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  likeButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 40,
    marginBottom: 50,
    borderColor: '#E8E8E8',
    borderWidth: 1,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  dislikeIcon: {
    color: '#d02860',
  },
  likeIcon: {
    color: '#00897B' 
  }
})
