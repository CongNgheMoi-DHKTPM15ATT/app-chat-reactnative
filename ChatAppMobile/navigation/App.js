import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  LoadingActivity,
  ChatFlaxlist,
  ListFriend,
  ListGroup,
  MyProfile,
} from '../screens';
import UITag from './UITag';
const Stack = createNativeStackNavigator();
function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoadingActivity"
        screenOptions={{
          headerShown: false,
        }}>
        {/* <Stack.Screen name={'LoginAcc'} component={LoginAcc} /> */}
        <Stack.Screen name={'LoadingActivity'} component={LoadingActivity} />
        <Stack.Screen name={'UITag'} component={UITag} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
