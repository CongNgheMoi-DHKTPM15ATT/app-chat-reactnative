import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {images} from '../../constants';
import moment from 'moment-feiertage';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ItemMem(props) {
  let {user_id, nick_name} = props.chat;
  const [admin, setAdmin] = useState('');
  const {onPress} = props;
  const {index} = props;
  useEffect(() => {
    console.log('demo day nha: ', user_id);
    AsyncStorage.getItem('user_id').then(result => {
      setAdmin(result);
    });
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#202124',
      }}>
      <View style={{flexDirection: 'row', padding: 15}}>
        {/* <Image
          source={{uri: receiver.avatar}}
          style={{height: 50, width: 50, borderRadius: 100}}></Image> */}
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}>
              {nick_name}
            </Text>

            <View style={{flex: 1}}></View>
            {user_id == admin ? (
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 2,
                  opacity: 0.5,
                  fontSize: 10,
                }}>
                Trưởng nhóm
              </Text>
            ) : (
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 2,
                  opacity: 0.5,
                  fontSize: 10,
                }}>
                Đã tham gia
              </Text>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'gray',
          opacity: 0.2,
          marginStart: 80,
        }}></View>
    </TouchableOpacity>
  );
}
export default ItemMem;
