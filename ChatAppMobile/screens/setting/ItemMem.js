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
  const BASE_URL = 'http://192.168.43.91:8080/api/group/remove-mem';
  const ADMIN_URL = 'http://192.168.43.91:8080/api/conversation/give-admin';
  const LOAD_URL = 'http://192.168.43.91:8080/api/conversation/id';
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

  const handleAdmin = id => {
    const method = 'POST';
    fetch(ADMIN_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id,
        conversation_id: con_id,
        admin_id: myUser,
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
        setModalVisible(false);
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
                Tr?????ng nh??m
              </Text>
            ) : (
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 2,
                  opacity: 0.5,
                  fontSize: 10,
                }}>
                ???? tham gia
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
              Th??ng tin th??nh vi??n
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
                Xem trang c?? nh??n
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAdmin(user_id)}
              style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                B??? nhi???m l??m nh??m tr?????ng
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                Ch???n th??nh vi??n
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleRemoveMembers()}
              style={{flexDirection: 'row', padding: 10}}>
              <Text
                style={{color: 'red', marginHorizontal: 15, marginVertical: 5}}>
                X??a kh???i nh??m
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
              Th??ng tin th??nh vi??n
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
                Xem trang c?? nh??n
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </TouchableOpacity>
  );
}
export default ItemMem;
