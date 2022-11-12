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
function UpdateModel(props) {
  var screen = Dimensions.get('window');
  const {
    onPress,
    onPressChooseFormLir,
    data,
    idUser,
    onPressCamera,
    onPressChoose,
    onPressView,
  } = props;

  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 150,
        borderRadius: 30,
        width: screen.width - 80,
        height: 400,
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

      <Image
        source={images.updateimage}
        style={{height: 150, width: '100%'}}></Image>

      <TouchableOpacity
        onPress={onPressView}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Xem ảnh đại diện</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressCamera}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Chụp ảnh mới</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressChooseFormLir}
        style={{
          height: 50,
          width: '100%',
          backgroundColor: 'black',
          padding: 10,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', fontSize: 16}}>Chọn ảnh từ thiết bị</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressChoose}
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
          Chọn ảnh đại diện có sẵn
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default UpdateModel;
