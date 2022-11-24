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
import EmojiPicker from 'rn-emoji-keyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images, fontSizes, colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
function SearchPhone(props) {
  var screen = Dimensions.get('window');
  const {onPress, data, onPressDelete} = props;
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [userId, setUser_id] = useState('');
  const [profile, setProfile] = useState([]);
  // const BASE_URL = 'http://192.168.43.91:8080/api/user/search';
  const BASE_URL = 'http://192.168.1.104:8080/api/user/search';

  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  const searchPhone = phone => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        filter: phone,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson[0];
        AsyncStorage.setItem('status_search', currentUser.status);
        AsyncStorage.setItem('avatar_search', currentUser.avatar);
        AsyncStorage.setItem('phone_search', currentUser.phone);
        AsyncStorage.setItem('user_name_search', currentUser.user_name);
        AsyncStorage.setItem('user_id_search', currentUser._id);
        AsyncStorage.setItem('conversation', currentUser.conversation);

        // console.log('abc: ', currentUser.status);
        navigation.navigate('ProfileDetail', {user: currentUser});
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
      }}>
      <Text style={{color: 'white', marginHorizontal: 15, marginVertical: 5}}>
        Thêm bạn
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'flex-end',
          marginLeft: 330,
          position: 'absolute',
          flexDirection: 'row',
        }}>
        <Image source={images.close} style={{height: 24, width: 24}}></Image>
      </TouchableOpacity>
      <View
        style={{
          height: 50,
          flexDirection: 'row',
          bottom: 0,
          left: 0,
          backgroundColor: '#202124',
          right: 0,
        }}>
        <TextInput
          onChangeText={text => {
            setPhone(text);
          }}
          placeholder="Thêm bạn bằng số điện thoại"
          placeholderTextColor={colors.primary}
          value={phone}
          style={{paddingLeft: 15, color: 'white', fontSize: 16}}></TextInput>
        <TouchableOpacity
          onPress={() => {
            setPhone('');
          }}>
          {phone.trim().length > 0 ? (
            <Image
              source={images.close}
              style={{
                height: 25,
                width: 25,
                margin: 15,
                marginLeft: 55,
              }}></Image>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (phone.trim().length == 0) {
              return;
            }
            searchPhone(phone);
          }}>
          {phone.trim().length > 0 ? (
            <Image
              source={images.loupe}
              style={{
                height: 25,
                width: 25,
                margin: 15,
                marginLeft: 1,
              }}></Image>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SearchPhone;
