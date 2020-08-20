import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Dimensions, FlatList, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { HomeScreenPics } from '../constants/Pics'
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");

const ProfileScreen = () => {

  const [isShowModal, setIsShowModal] = useState(false);
  const [modalPic, setModalPic] = useState('');

  const showModalImage = (visible, pic) => {
    setIsShowModal(visible)
    setModalPic(pic)
  }

  const renderImages = ({ item }) => {
    return (
      <Animatable.View
        style={{ flex: 1, alignItems: 'flex-start' }}
        animation="zoomIn"
        delay={item.id * 100}
        useNativeDriver={true}
      >
        <TouchableOpacity
          key={item.id}
          style={{ flex: 1 }}
          onPress={() => { showModalImage(true, item.pic) }}>
          <Image
            source={item.pic}
            style={{
              height: width / 3,
              width: width / 3,
            }}
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  const renderGallery = () => (
    <View style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
            }}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
            }]}>John Doe</Title>
            <Caption style={styles.caption}>@j_doe</Caption>
          </View>
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1
        }]}>
          <Title>140K</Title>
          <Caption>Likes</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>351</Title>
          <Caption>Photos</Caption>
        </View>
      </View>
      <FlatList
        horizontal={false}
        numColumns={3}
        data={HomeScreenPics}
        keyExtractor={item => item.id}
        renderItem={renderImages}
      />
    </View>
  );

  const renderModalImage = () => (
    <View style={styles.container}>
      <ImageBackground
        source={modalPic}
        style={styles.image}
      >
        <TouchableOpacity
        onPress={() => showModalImage(false, '')}
        style={styles.closeButton}>
        <MaterialCommunityIcons
          name="close"
          size={20}
          style={styles.closeIcon}
        />
      </TouchableOpacity>
      </ImageBackground>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {isShowModal === false && renderGallery()}
      {isShowModal === true && renderModalImage()}
    </SafeAreaView >
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'flex-start'
  },
  closeButton: {
    backgroundColor: '#d02860',
    alignItems: 'flex-start',
    borderRadius: 15,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  closeIcon: {
    color: '#fff',
  }
});
