import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Modal from 'react-native-modal';
import {images} from '../../constants';
import moment from 'moment-feiertage';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ItemMemAcc(props) {
  let {_id, user_name, avatar} = props.chat;
  const [admin, setAdmin] = useState('');
  const [myUser, setMyUser] = useState('');
  const [con_id, setCon_id] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const {onPress} = props;
  const {index} = props;
  const BASE_URL = 'http://192.168.43.91:8080/api/group/accept';
  const LOAD_URL = 'http://192.168.43.91:8080/api/conversation/id';
  useEffect(() => {
    AsyncStorage.getItem('user_id').then(result => {
      setMyUser(result);
    });
    AsyncStorage.getItem('conver_id').then(result => {
      setCon_id(result);
    });
  });

  const handleAccMembers = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: con_id,
        user_id: _id,
        user_control_id: myUser,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        // console.log('demo day nha: ', currentUser.members);
        //  currentUserRequests.map(req=>{
        //   if (req==) {

        //   }
        //  })
        alert(resJson.msg);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#202124',
      }}>
      <View style={{flexDirection: 'row', padding: 15}}>
        <Image
          source={{uri: avatar}}
          style={{height: 50, width: 50, borderRadius: 100}}></Image>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                paddingHorizontal: 20,
                paddingBottom: 10,
                paddingTop: 10,
              }}>
              {user_name}
            </Text>
            <View style={{flex: 1}}></View>
            <TouchableOpacity
              onPress={() => handleAccMembers()}
              style={{
                height: 50,
                width: 80,
                backgroundColor: 'blue',
                borderRadius: 5,
                justifyContent: 'center',
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Xác nhận
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('ok')}
              style={{
                height: 50,
                width: 90,
                backgroundColor: 'blue',
                borderRadius: 5,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
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
export default ItemMemAcc;
