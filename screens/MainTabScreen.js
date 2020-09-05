import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import SpotScreen from './SpotScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import CameraScreen from './CameraScreen';

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Camera" inactiveColor="grey">
    <Tab.Screen
      name="Camera"
      component={CameraScreen}
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
      component={SpotScreen}
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
      component={ProfileScreen}
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
