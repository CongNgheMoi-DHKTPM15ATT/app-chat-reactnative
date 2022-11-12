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
function UserModel(props) {
  var screen = Dimensions.get('window');
  const {onPress, onPressRemove, data, idUser, onPressBlock} = props;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 300,
        borderRadius: 30,
        width: screen.width - 80,
        height: 130,
        backgroundColor: 'black',
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
        onPress={() => {
          alert(idUser);
        }}
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: data}}
          style={{height: 70, width: 70, borderRadius: 100}}></Image>
        <Text style={{color: 'white', fontSize: 16, paddingLeft: 15}}>
          Xem trang cá nhân
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressBlock}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>
          Chặn tin nhắn từ người này
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressRemove}
        style={{
          height: 40,
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{color: 'red', fontSize: 16}}>Xóa bạn</Text>
      </TouchableOpacity>
    </View>
  );
}
export default UserModel;
