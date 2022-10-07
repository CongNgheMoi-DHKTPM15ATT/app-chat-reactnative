import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {images} from '../../../constants';
function ItemFriend(props) {
  const {name, image} = props.data;
  return (
    <View
      style={{
        height: 80,
        backgroundColor: '#252526',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={images.item_friend}
        style={{
          height: 50,
          width: 50,
          borderRadius: 100,
          margin: 15,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          color: 'white',
        }}>
        {name}
      </Text>
      <View style={{flex: 1}}></View>
      <Image
        source={images.phone}
        style={{height: 30, width: 30, marginHorizontal: 10}}></Image>
      <Image
        source={images.video}
        style={{
          height: 25,
          width: 25,
          backgroundColor: '#252526',
          marginEnd: 30,
        }}></Image>
    </View>
  );
}
export default ItemFriend;
