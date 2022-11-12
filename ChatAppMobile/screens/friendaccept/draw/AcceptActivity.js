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
  FlatList,
} from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images, fontSizes, colors} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import ItemFriend from '../../phonebook/draws/ItemFriend';
import ItemAccept from './ItemAccept';
function AcceptActivity(props) {
  var screen = Dimensions.get('window');
  const {onPress, data, onPressDelete} = props;
  const navigation = useNavigation();
  const [userId, setUser_id] = useState('');
  const [friends, setFriend] = useState([]);
  // const BASE_URL = 'http://192.168.43.91:8080/api/user/search';
  const BASE_URL = 'http://192.168.1.104:8080/api/user/get-friends-pending';

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
        status: 'ACCEPTING',
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
      }}>
      <Text style={{color: 'white', marginHorizontal: 15, marginVertical: 5}}>
        Lời mời kết bạn
      </Text>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
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
          height: 300,
          bottom: 0,
          left: 0,
          backgroundColor: '#202124',
          right: 0,
        }}>
        <FlatList
          data={friends}
          renderItem={({item, index}) => <ItemAccept data={item} />}
          keyExtractor={eachChat => eachChat._id}
          key={eachChat => eachChat._id}
        />
      </View>
    </View>
  );
}
export default AcceptActivity;
