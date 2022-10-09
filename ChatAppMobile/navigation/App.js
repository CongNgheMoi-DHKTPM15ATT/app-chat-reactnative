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
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  LoadingActivity,
  ChatFlaxlist,
  ListFriend,
  ListGroup,
  MyProfile,
  ChatScreen,
  LoginActivity,
  RegisterActivity,
} from '../screens';
import UITag from './UITag';
import {AuthProvider} from '../repositories/AuthContext';
const Stack = createNativeStackNavigator();
function App(props) {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="LoadingActivity"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'LoginActivity'} component={LoginActivity} />
        <Stack.Screen name={'LoadingActivity'} component={LoadingActivity} />
        <Stack.Screen name={'UITag'} component={UITag} />
        <Stack.Screen name={'Messenger'} component={ChatScreen} />
        <Stack.Screen name={'RegisterActivity'} component={RegisterActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
