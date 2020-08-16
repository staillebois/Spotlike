import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SpotScreen from './SpotScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import CameraScreen from './CameraScreen';

import { useTheme, Avatar } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SpotStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CameraStack = createStackNavigator();
const ExploreStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Camera" inactiveColor="grey">
    <Tab.Screen
      name="Camera"
      component={CameraStackScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: 'black',
        tabBarIcon: ({ color, focused  }) => (
          <MaterialCommunityIcons name="camera-control" color={focused  ? '#FFDE03' : color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Spot"
      component={SpotStackScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: 'black',
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name="cards-heart" color={focused ? '#00897B' : color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Top"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: '∘',
        tabBarColor: '#FFAB00',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="map-marker-check" color={color} size={26} />
        ),
      }}
    /> */}
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: 'black',
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name="map-marker-radius" color={focused ? '#d02860' : color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: '',
        tabBarColor: 'black',
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name="account" color={focused ? '#694fad' : color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const SpotStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <SpotStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <SpotStack.Screen
        name="Spot"
        component={SpotScreen}
        options={{
          title: 'Spotlike',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                iconStyle={{ marginLeft: 8 }}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      'https://api.adorable.io/avatars/80/abott@adorable.png',
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </SpotStack.Navigator>
  );
};

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                iconStyle={{ marginLeft: 8 }}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
                onPress={() => navigation.navigate('EditProfile')}
              />
            </View>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const CameraStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <CameraStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <CameraStack.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: '',
          headerTransparent: 'true',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                iconStyle={{ marginLeft: 8 }}
                backgroundColor='rgba(52, 52, 52, 0.6)'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
    </CameraStack.Navigator>
  );
};

const ExploreStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ExploreStack.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          title: '',
          headerTransparent: 'true',
          headerLeft: () => (
            <View style={{ marginLeft: 10 }}>
              <Icon.Button
                name="ios-menu"
                size={25}
                iconStyle={{ marginLeft: 8 }}
                backgroundColor='rgba(52, 52, 52, 0.6)'
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        }}
      />
    </ExploreStack.Navigator>
  );
};
