import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  TextInput,
} from 'react-native';
import {fontSizes, colors, images} from '../constants';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
function UIHeaderChat(props) {
  const {
    title,
    leftIconName,
    rightIconName,
    onPressLeftIcon,
    onPressRightIcon,
    phoneRightIconName,
    videoRightIconName,
    onPressPhoneRightIcon,
    onPressVideoRightIcon,
  } = props;
  return (
    <View
      style={{
        height: 55,
        backgroundColor: '#202124',
        flexDirection: 'row',
      }}>
      {leftIconName != undefined ? (
        <TouchableOpacity onPress={onPressLeftIcon}>
          <Image
            source={images.back}
            style={{
              height: 25,
              width: 25,
              top: 5,
              left: 1,
              colors: 'white',
              margin: 10,
            }}></Image>
        </TouchableOpacity>
      ) : (
        <View style={{height: 50, width: 50, backgroundColor: 'red'}}> </View>
      )}
      <Text
        // onChangeText={text => {
        //   setSearchText(text);
        // }}
        style={{
          height: 60,
          flex: 1,
          marginEnd: 35,
          marginStart: 50,
          borderRadius: 5,
          color: 'white',
          paddingVertical: 15,
          marginLeft: 5,
          fontSize: 18,
        }}>
        ANTi
      </Text>
      {phoneRightIconName != undefined ? (
        <TouchableOpacity onPress={onPressPhoneRightIcon}>
          <Image
            source={images.phone2}
            style={{
              height: 23,
              width: 23,
              marginRight: 10,
              marginTop: 13,
            }}></Image>
        </TouchableOpacity>
      ) : (
        <View style={{height: 50, width: 50, backgroundColor: 'red'}}> </View>
      )}
      {videoRightIconName != undefined ? (
        <TouchableOpacity onPress={onPressVideoRightIcon}>
          <Image
            source={images.video_call}
            style={{
              height: 25,
              width: 25,
              marginLeft: 5,
              marginTop: 13,
            }}></Image>
        </TouchableOpacity>
      ) : (
        <View style={{height: 50, width: 50, backgroundColor: 'red'}}> </View>
      )}
      {rightIconName != undefined ? (
        <TouchableOpacity onPress={onPressRightIcon}>
          <Image
            source={images.icon_menu2}
            style={{
              height: 30,
              width: 30,
              margin: 10,
            }}></Image>
        </TouchableOpacity>
      ) : (
        <View style={{height: 50, width: 50, backgroundColor: 'red'}}> </View>
      )}
    </View>
  );
}
export default UIHeaderChat;
