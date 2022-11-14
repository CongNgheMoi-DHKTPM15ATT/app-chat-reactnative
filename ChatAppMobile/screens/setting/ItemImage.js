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
  const [isActive, setIsActive] = useState(false);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        style={{
          padding: 10,
          height: 50,
          width: 50,
          backgroundColor: 'gray',
          marginHorizontal: 5,
          alignItems: 'center',
        }}>
        <Image source={images.camera} style={{height: 24, width: 24}}></Image>
      </TouchableOpacity>
    </View>
  );
}
export default ItemImage;
