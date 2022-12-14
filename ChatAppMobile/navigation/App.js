import React, {Component, useState, useEffect} from 'react';
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
  CallScreen,
  ProfileDetail,
  AcceptActivity,
  RegisterPhoneActivity,
} from '../screens';
import UITag from './UITag';
import {AuthProvider} from '../repositories/AuthContext';
import SearchPhone from '../model/SearchPhone';
import AddGroup from '../model/AddGroup';
import SettingChat from '../screens/setting/SettingChat';
import AddMem from '../model/AddMem';
import CountryPicker from '../components/CountryPicker';
import MemberScreen from '../screens/setting/MemberScreen';
import RegisterPassword from '../screens/RegisterPassword';
import ContactsList from '../screens/phonebook/draws/ContactsList';
import UpdateProfile from '../screens/profile/UpdateProfile';
const Stack = createNativeStackNavigator();
function App(props) {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        useLegacyImplementation={true}
        initialRouteName="LoadingActivity"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'LoginActivity'} component={LoginActivity} />
        <Stack.Screen name={'LoadingActivity'} component={LoadingActivity} />
        <Stack.Screen name={'UITag'} component={UITag} />
        <Stack.Screen name={'Messenger'} component={ChatScreen} />
        <Stack.Screen name={'RegisterActivity'} component={RegisterActivity} />
        <Stack.Screen
          name={'RegisterPhoneActivity'}
          component={RegisterPhoneActivity}
        />
        <Stack.Screen name={'CallScreen'} component={CallScreen} />
        <Stack.Screen name={'ProfileDetail'} component={ProfileDetail} />
        <Stack.Screen name={'SearchPhone'} component={SearchPhone} />
        <Stack.Screen name={'AddGroup'} component={AddGroup} />
        <Stack.Screen name={'ChatFlaxlist'} component={ChatFlaxlist} />
        <Stack.Screen name={'AcceptActivity'} component={AcceptActivity} />
        <Stack.Screen name={'SettingChat'} component={SettingChat} />
        <Stack.Screen name={'AddMem'} component={AddMem} />
        <Stack.Screen name={'CountryPicker'} component={CountryPicker} />
        <Stack.Screen name={'MemberScreen'} component={MemberScreen} />
        <Stack.Screen name={'RegisterPassword'} component={RegisterPassword} />
        <Stack.Screen name={'ContactsList'} component={ContactsList} />
        <Stack.Screen name={'UpdateProfile'} component={UpdateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
