import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);

const CameraScreen = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [loaded, setIsLoaded] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const cameraRef = useRef();

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      setIsLoaded(true);
    });
    props.navigation.addListener('blur', () => {
      setIsLoaded(false);
      setIsPreview(false);
    });
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const flip = () => {
    if (isPreview) {
      return;
    }
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const source = data.uri;
      if (source) {
        await cameraRef.current.pausePreview();
        setIsPreview(true);
        console.log("picture source", source);
      }
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const renderDefaultButton = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          alignSelf: 'flex-end',
        }} />
      <TouchableOpacity
        style={{
          flex: 1,
          alignSelf: 'flex-end',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons.Button
          name="circle-slice-8"
          size={70}
          disabled={!isCameraReady}
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
        }}>
        <Icon.Button
          name="ios-refresh"
          size={30}
          disabled={!isCameraReady}
          iconStyle={{ marginLeft: 8 }}
          backgroundColor='rgba(52, 52, 52, 0)'
          onPress={() => flip()}
        />
      </TouchableOpacity>
    </View>
  );

  const renderCancelPreviewButton = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          marginBottom: 8,
        }}>
        <Icon.Button
          name="ios-close"
          size={30}
          disabled={!isCameraReady}
          iconStyle={{ marginLeft: 8 }}
          backgroundColor='rgba(52, 52, 52, 0)'
          onPress={() => cancelPreview()}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flex: 1,
          alignSelf: 'flex-end',
          alignItems: 'flex-end',
          marginBottom: 8,
        }}>
        <Icon.Button
          name="ios-arrow-dropright"
          size={60}
          disabled={!isCameraReady}
          iconStyle={{ marginLeft: 8 }}
          backgroundColor='rgba(52, 52, 52, 0)'
          onPress={() => cancelPreview()}
        />
      </TouchableOpacity>
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (loaded === false) {
    return <View />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        ref={cameraRef}
        style={{ flex: 1 }}
        type={type}
        ratio='16:9'
        onCameraReady={onCameraReady}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          {!isPreview && renderDefaultButton()}
          {isPreview && renderCancelPreviewButton()}
        </View>
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    left: 15,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c4c5c4",
    opacity: 0.7,
    zIndex: 2,
  },
  closeCross: {
    width: "68%",
    height: 1,
    backgroundColor: "black",
  },
})

export default CameraScreen;
