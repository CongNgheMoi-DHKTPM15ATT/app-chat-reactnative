import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Modal,
} from 'react-native';
import {images} from '../constants';
function MessengerModel(props) {
  var screen = Dimensions.get('window');
  const {onPress, data, onPressDelete} = props;
  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 300,
        borderRadius: 30,
        width: screen.width - 80,
        height: 130,
        backgroundColor: 'gray',
        flexDirection: 'column',
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'flex-end',
          marginLeft: 250,
        }}>
        <Image source={images.close} style={{height: 24, width: 24}}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressDelete}
        style={{
          height: 40,
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Xóa tin nhắn </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 40,
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Chuyển tiếp tin nhắn</Text>
      </TouchableOpacity>
    </View>
  );
}
export default MessengerModel;
