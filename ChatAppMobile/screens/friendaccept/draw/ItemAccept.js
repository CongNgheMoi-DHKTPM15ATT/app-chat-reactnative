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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
function ItemAccept(props) {
  const {user_name, _id, friends, avatar} = props.data;
  const [userId, setUser_id] = useState('');
  const navigation = useNavigation();
  const {onPress} = props;
  const BASE_URL = 'http://192.168.1.104:8080/api/user/confirm-friend-request';
  const CON_URL = 'http://192.168.1.104:8080/api/conversation/create';
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  handleAccept = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        receiver_id: _id,
        is_accept: 'FRIENDED',
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        // console.log(friends);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => {
        handleCreateConversation();
        navigation.navigate('UITag');
      });
  };
  handleCreateConversation = () => {
    const method = 'POST';
    fetch(CON_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: [userId, _id],
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const url = 'http://192.168.1.104:8080/api/messages/send';

        const method = 'POST';
        fetch(url, {
          method,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender_id: userId,
            conversation_id: resJson._id,
            text: 'Các bạn đã được kêt nối với nhau trên Nulo. Hãy bắt đầu cuộc trò chuyện ngay thôi',
            content_type: 'notification',
          }),
        })
          .then(res => res.json())
          .then(resJson => {
            const currentUser = resJson;
            console.log('abcdef: ', resJson);
            // getMessagesByUserId();
            // setChatHistory(currentUser);
          });
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };

  return (
    <View
      style={{
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: avatar}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 100,
          margin: 15,
        }}
      />
      <View style={{flexDirection: 'column'}}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 16,
            color: 'white',
            width: 150,
          }}>
          {user_name}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontSize: 13,
            opacity: 0.5,
            color: 'white',
            width: 150,
            paddingBottom: 5,
          }}>
          - Tìm kiếm số điện thoại
        </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 100,
              borderRadius: 50,
              backgroundColor: 'gray',
              alignContent: 'center',
              marginHorizontal: 10,
            }}>
            <Text style={{color: 'white', textAlign: 'center', paddingTop: 5}}>
              Từ chối
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleAccept();
            }}
            style={{
              height: 30,
              width: 100,
              borderRadius: 50,
              backgroundColor: 'gray',
              alignContent: 'center',
              marginHorizontal: 10,
            }}>
            <Text style={{color: 'blue', textAlign: 'center', paddingTop: 5}}>
              Đồng ý
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
}
export default ItemAccept;
