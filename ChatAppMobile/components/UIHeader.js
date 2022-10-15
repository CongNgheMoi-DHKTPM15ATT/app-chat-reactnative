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
function UIHeader(props) {
  const {
    title,
    leftIconName,
    rightIconName,
    onPressLeftIcon,
    onPressRightIcon,
  } = props;
  return (
    <View
      style={{height: 55, backgroundColor: '#202124', flexDirection: 'row'}}>
      {leftIconName != undefined ? (
        <Image
          source={images.icon_search}
          style={{
            height: 25,
            width: 25,
            top: 5,
            left: 10,
            position: 'absolute',
            colors: 'white',
            margin: 10,
          }}></Image>
      ) : (
        <View style={{height: 50, width: 50, backgroundColor: 'red'}}> </View>
      )}
      <TextInput
        placeholderTextColor={'white'}
        autoCorrect={false}
        placeholder="Tìm kiếm"
        // onChangeText={text => {
        //   setSearchText(text);
        // }}
        style={{
          height: 60,
          flex: 1,
          marginEnd: 8,
          borderRadius: 5,
          color: 'white',
          paddingStart: 60,
        }}
      />
      {rightIconName != undefined ? (
        <TouchableOpacity onPress={onPressRightIcon}>
          <Image
            source={images.icon_menu}
            style={{
              height: 25,
              width: 25,
              margin: 15,
            }}></Image>
        </TouchableOpacity>
      ) : (
        <View style={{height: 50, width: 50, backgroundColor: 'red'}}> </View>
      )}
    </View>
  );
}
export default UIHeader;
