import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';
import {UIHeader} from '../../../components';
import {images} from '../../../constants';
import ItemFriend from './ItemFriend';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ListFriend(props) {
  const BASE_URL = 'http://192.168.1.104:8080/api/user/get-friends-pending';
  const Conven_URL = 'http://192.168.1.104:8080/api/messages';
  const [userId, setUser_id] = useState('');
  const [friends, setFriend] = useState([]);
  const [chat, setChat] = useState([]);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });

  useEffect(() => {
    getAllUsers();
  });

  getAllUsers = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        status: 'FRIENDED',
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson;
        console.log('day ne ba da: ', currentUser);
        setFriend(currentUser);
        // console.log(friends);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };

  const getMessById = id => {
    const method = 'POST';
    fetch(Conven_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: id,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.conversations;
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', currentUser);
        setChat(currentUser);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <ScrollView horizontal={false} style={{flex: 1}}>
      <UIHeader
        leftIconName={''}
        rightIconName={''}
        onPressLeftIcon={() => {
          alert('Left icon');
        }}
        onPressRightIcon={() => {
          alert('Right icon of list friend');
        }}></UIHeader>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 30,
            backgroundColor: '#252526',
            flexDirection: 'column',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.addfriend}
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'blue',
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 13,
              }}
            />
            <Text style={{color: 'white', fontSize: 16, margin: 15}}>
              Lời mời kết bạn
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <Image
              source={images.listfriend}
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'blue',
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 13,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  marginStart: 15,
                  marginTop: 10,
                }}>
                Danh bạ máy
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  opacity: 0.5,
                  marginStart: 15,
                }}>
                Các liên hệ có dùng zalo
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 20, backgroundColor: '#252526'}}>
          <View style={{height: 10, backgroundColor: 'black'}}></View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                height: 30,
                width: 90,
                backgroundColor: 'gray',
                borderRadius: 25,
                justifyContent: 'center',
                margin: 15,
              }}>
              <Text style={{alignSelf: 'center', color: 'white'}}>
                Tất cả 63
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                width: 100,
                borderWidth: 0.5,
                borderRadius: 25,
                justifyContent: 'center',
                marginTop: 15,
                borderColor: 'white',
              }}>
              <Text style={{alignSelf: 'center', color: 'white'}}>
                Mới truy cập
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{height: 1, backgroundColor: 'gray', opacity: 0.2}}></View>
        </View>
        <View style={{flex: 60}}>
          <FlatList
            data={friends}
            renderItem={({item, index}) => (
              <ItemFriend
                data={item}
                onPress={() => {
                  // alert(`name is: ${item._id}`);
                  getMessById(item._id);
                  navigate('Messenger', {users: chat});
                }}
              />
            )}
            keyExtractor={eachChat => eachChat._id}
            key={eachChat => eachChat._id}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default ListFriend;
