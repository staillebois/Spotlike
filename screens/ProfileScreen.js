import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, StatusBar, Dimensions, FlatList, Image, ImageBackground, TouchableOpacity, Text, TextInput } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import { HomeScreenPics } from '../constants/Pics'
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/context';

const { width } = Dimensions.get("window");

const ProfileScreen = () => {

  const [modalPic, setModalPic] = useState('');
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const { signOut, setsignOut } = React.useContext(AuthContext);

  const toggleModalEdit = () => {
    setModalEditVisible(!isModalEditVisible);
  };

  const showModalImage = (pic) => {
    setIsModalImageVisible(!isModalImageVisible)
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
          onPress={() => { showModalImage(item.pic) }}>
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
          <View style={{
            // alignContent: 'flex-end'
            flex: 1,
            alignItems: 'flex-end'
          }}>
            <MaterialCommunityIcons
              name="account-edit"
              size={25}
              onPress={toggleModalEdit}
              style={{color: 'white'}}
            />
            <View style={{flex: 1}}></View>
            <Icon
              name="exit-to-app"
              size={25}
              style={{color: 'white'}}
              onPress={() => { signOut() }}
            />
          </View>
        </View>
      </View>
      <View style={styles.infoBoxWrapper}>
        <View style={[styles.infoBox, {
          borderRightColor: '#666666',
          borderRightWidth: 1
        }]}>
          <Title style={{color: 'white'}}>140K</Title>
          <Caption style={{color: 'white'}}>Likes</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title style={{color: 'white'}}>351</Title>
          <Caption style={{color: 'white'}}>Photos</Caption>
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
          onPress={() => showModalImage('')}
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

  const renderModalEdit = () => (
    <View style={{ margin: 20 }}>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold', color: 'white' }}>
          John Doe
          </Text>
      </View>

      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} style={{color: 'white'}} />
        <TextInput
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" size={20} style={{color: 'white'}} />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <Feather name="phone" size={20} style={{color: 'white'}} />
        <TextInput
          placeholder="Phone"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="envelope-o" size={20} style={{color: 'white'}} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#666666"
          keyboardType="email-address"
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <FontAwesome name="globe" size={20} style={{color: 'white'}} />
        <TextInput
          placeholder="Country"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <View style={styles.action}>
        <Icon name="map-marker-outline" size={20} style={{color: 'white'}} />
        <TextInput
          placeholder="City"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.commandButton} onPress={toggleModalEdit}>
        <Text style={styles.panelButtonTitle}>Submit</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      {!isModalImageVisible && !isModalEditVisible && renderGallery()}
      {isModalImageVisible && renderModalImage()}
      {isModalEditVisible && renderModalEdit()}
    </SafeAreaView >
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#666666',
    borderBottomWidth: 1,
    borderTopColor: '#666666',
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
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: 'white',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});
