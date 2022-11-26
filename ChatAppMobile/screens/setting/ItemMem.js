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
function ItemMem(props) {
  let {user_id, nick_name} = props.chat;
  const [admin, setAdmin] = useState('');
  const [myUser, setMyUser] = useState('');
  const [con_id, setCon_id] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const {onPress} = props;
  const {index} = props;
  const BASE_URL = 'http://192.168.1.104:8080/api/group/remove-mem';
  const LOAD_URL = 'http://192.168.1.104:8080/api/conversation/id';
  useEffect(() => {
    AsyncStorage.getItem('user_id').then(result => {
      setMyUser(result);
    });
    AsyncStorage.getItem('admin').then(result => {
      setAdmin(result);
    });
    AsyncStorage.getItem('conver_id').then(result => {
      setCon_id(result);
    });
  });
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleRemoveMembers = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: con_id,
        user_id: user_id,
        user_control_id: user_id,
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
      onPress={() => toggleModal()}
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
      {myUser != user_id && myUser == admin ? (
        <Modal
          style={{
            backgroundColor: 'gray',
            height: 70,
            marginTop: 300,
            marginLeft: 0,
            marginBottom: 0,
            width: '100%',
          }}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={{}}>
            <Text style={{color: 'white', alignSelf: 'center'}}>
              Thông tin thành viên
            </Text>
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                {nick_name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                Xem trang cá nhân
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                Bổ nhiệm làm nhóm phó
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                Chặn thành viên
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRemoveMembers()}
              style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{color: 'red', marginHorizontal: 15, marginVertical: 5}}>
                Xóa khỏi nhóm
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        <Modal
          style={{
            backgroundColor: 'gray',
            height: 70,
            marginTop: 450,
            marginLeft: 0,
            marginBottom: 0,
            width: '100%',
          }}
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}>
          <View style={{}}>
            <Text style={{color: 'white', alignSelf: 'center'}}>
              Thông tin thành viên
            </Text>
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                {nick_name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                Xem trang cá nhân
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
}
export default ItemMem;
