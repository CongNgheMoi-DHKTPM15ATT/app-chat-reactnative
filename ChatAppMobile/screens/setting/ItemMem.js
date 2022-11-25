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
  const [isModalVisible, setModalVisible] = useState(false);
  const {onPress} = props;
  const {index} = props;
  useEffect(() => {
    console.log('demo day nha: ', user_id);
    AsyncStorage.getItem('user_id').then(result => {
      setAdmin(result);
    });
  }, []);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
      {user_id != admin ? (
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
            <TouchableOpacity style={{flexDirection: 'row', padding: 10}}>
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
