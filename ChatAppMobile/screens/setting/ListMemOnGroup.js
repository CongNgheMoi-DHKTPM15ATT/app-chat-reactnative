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
  Dimensions,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemChat from '../chat/draws/ItemChat';
import ItemMem from './ItemMem';
function ListMemOnGroup(props) {
  const [userId, setUser_id] = useState('');
  const [friend, setFriend] = useState([]);
  const BASE_URL = 'http://192.168.43.91:8080/api/conversation/id';
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('conver_id').then(result => {
      setUser_id(result);
    });
  });
  useEffect(() => {
    // setIsLoading(true);
    getAllUsers();
  }, [userId]);
  getAllUsers = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: userId,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.members;
        // console.log('demo day nha: ', currentUser.members);
        setFriend(currentUser);
        AsyncStorage.setItem('admin', resJson.admin);
        AsyncStorage.removeItem('conver_id');
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <ScrollView horizontal={false} style={{flex: 1}}>
      <View>
        <FlatList
          data={friend}
          renderItem={({item, index}) => (
            <ItemMem chat={item} key={item.user_id} index={index} />
          )}
          keyExtractor={eachChat => eachChat.title}
        />
      </View>
    </ScrollView>
  );
}
export default ListMemOnGroup;
