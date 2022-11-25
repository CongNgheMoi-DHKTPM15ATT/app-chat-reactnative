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
    color,
    numOfMember,
  } = props;
  return (
    <View
      style={{
        height: 55,
        opacity: color != undefined ? 0.8 : 1,
        backgroundColor:
          color != undefined ? 'rgba(52, 52, 52, 0.8)' : '#202124',

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
        <View></View>
      )}
      <View
        style={{
          flexDirection: 'column',
          width: 200,
        }}>
        <Text
          // onChangeText={text => {
          //   setSearchText(text);
          // }}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            height: 30,
            flex: 1,
            marginEnd: 35,
            marginStart: 50,
            borderRadius: 5,
            color: 'white',
            paddingVertical: numOfMember != null || numOfMember > 1 ? 5 : 15,
            marginLeft: 5,
            fontSize: 18,
          }}>
          {title}
        </Text>
        {numOfMember != null || numOfMember > 1 ? (
          <Text
            // onChangeText={text => {
            //   setSearchText(text);
            // }}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              flex: 1,
              marginEnd: 35,
              marginStart: 50,
              borderRadius: 5,
              color: 'white',
              marginLeft: 5,
              fontSize: 10,
            }}>
            Số thành viên: {numOfMember.length + 1}
          </Text>
        ) : (
          <View></View>
        )}
      </View>
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
        <View
          style={{
            height: 23,
            width: 23,
            marginRight: 10,
            marginTop: 13,
          }}></View>
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
        <View
          style={{
            height: 25,
            width: 25,
            marginLeft: 5,
            marginTop: 13,
          }}></View>
      )}
      {rightIconName != undefined ? (
        <TouchableOpacity onPress={onPressRightIcon}>
          <Image
            source={images.icon_menu2}
            style={{
              height: 30,
              width: 30,
              margin: 10,
              marginLeft: 10,
            }}></Image>
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
}
export default UIHeaderChat;
