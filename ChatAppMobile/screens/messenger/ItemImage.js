import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
function ItemImage(props) {
  let {item} = props;

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {item.avatar.map(t => (
        <TouchableOpacity>
          <Image
            source={{
              uri: `${t}`,
            }}
            style={{
              height: 150,
              width: 300,
              left: 0,
              right: 0,
            }}
            resizeMode="contain"></Image>
        </TouchableOpacity>
      ))}
    </View>
  );
}
export default ItemImage;
