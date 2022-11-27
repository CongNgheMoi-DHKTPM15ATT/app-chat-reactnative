import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import {images} from '../../../constants';
import UserModel from '../../../model/UserModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ItemFriend(props) {
  const {user_name, _id, friends, avatar} = props.data;
  const {onPress} = props;
  const [modalOpenUser, setModalUser] = useState(false);
  const [userId, setUser_id] = useState('');
  const REMOVE_URL = 'http://192.168.43.91:8080/api/user/remove-friend';
  const BLOCK_URL = 'http://192.168.43.91:8080/api/user/block-friend';
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  handleRemoveFriend = async () => {
    const method = 'POST';
    fetch(REMOVE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        receiver_id: _id,
        status: 'NOFRIEND',
      }),
    })
      .then(res => res.json())
      .then(resJson => {})
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  handleBlockFriend = async () => {
    const method = 'POST';
    fetch(BLOCK_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        receiver_id: _id,
        status: 'BLOCK',
      }),
    })
      .then(res => res.json())
      .then(resJson => {})
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={() => {
        setModalUser(true);
      }}
      style={{
        height: 80,
        backgroundColor: '#252526',
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
      <View style={{flex: 1}}></View>
      <Image
        source={images.phone}
        style={{height: 30, width: 30, marginHorizontal: 10}}></Image>
      <Image
        source={images.video}
        style={{
          height: 25,
          width: 25,
          backgroundColor: '#252526',
          marginEnd: 30,
        }}></Image>
      <Modal
        style={{
          justifyContent: 'center',
        }}
        transparent={true}
        visible={modalOpenUser}
        animationType="fade">
        <UserModel
          data={avatar}
          idUser={_id}
          onPress={() => {
            setModalUser(false);
          }}
          onPressRemove={() => {
            handleRemoveFriend();
          }}
          onPressBlock={() => {
            handleBlockFriend();
          }}></UserModel>
      </Modal>
    </TouchableOpacity>
  );
}
export default ItemFriend;
