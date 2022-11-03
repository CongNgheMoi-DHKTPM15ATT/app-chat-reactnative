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
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images, fontSizes, colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
function AppOption(props) {
  var screen = Dimensions.get('window');
  const {onPress, onPressAddGroup, onPressGroupCall, onPressAddFriend} = props;
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [userId, setUser_id] = useState('');
  const [profile, setProfile] = useState([]);

  return (
    <View
      style={{
        justifyContent: 'center',
        marginTop: 40,
        marginStart: 130,
        borderRadius: 3,
        width: screen.width - 150,
        height: 200,
        backgroundColor: 'black',
        flexDirection: 'column',
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'flex-end',
          marginLeft: 170,
          marginTop: -20,
        }}>
        <Image source={images.close} style={{height: 24, width: 24}}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressAddGroup}
        style={{flexDirection: 'row', padding: 10}}>
        <Image source={images.group} style={{height: 24, width: 24}}></Image>
        <Text style={{color: 'white', marginHorizontal: 15, marginVertical: 5}}>
          Tạo nhóm
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressAddFriend}
        style={{flexDirection: 'row', padding: 10}}>
        <Image source={images.adduser} style={{height: 24, width: 24}}></Image>
        <Text style={{color: 'white', marginHorizontal: 15, marginVertical: 5}}>
          Thêm bạn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressGroupCall}
        style={{flexDirection: 'row', padding: 10}}>
        <Image source={images.video} style={{height: 24, width: 24}}></Image>
        <Text style={{color: 'white', marginHorizontal: 15, marginVertical: 5}}>
          Tạo cuộc gọi nhóm
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default AppOption;
