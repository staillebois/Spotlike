import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons';

const CameraScreen = (navigation) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    console.log('mount');
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    
  }, []);

  const flip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const takePicture = () => {
    (async () => {
      Camera.takePictureAsync({ onPictureSaved: onPictureSaved });
    })();
    // Camera.takePictureAsync({ onPictureSaved: onPictureSaved });
  };

  const onPictureSaved = photo => {
    console.log(photo);
  }

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  console.log('test')
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
            }} />
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}>
            <Icon.Button
              name="ios-camera"
              size={70}
              iconStyle={{ marginLeft: 8 }}
              backgroundColor='rgba(52, 52, 52, 0)'
              onPress={() => takePicture()}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              alignItems: 'flex-end',
              marginBottom: 8,
              marginRight: 8
            }}>
            <Icon.Button
              name="ios-reverse-camera"
              size={25}
              iconStyle={{ marginLeft: 8 }}
              backgroundColor='rgba(52, 52, 52, 0)'
              onPress={() => flip()}
            />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen;
