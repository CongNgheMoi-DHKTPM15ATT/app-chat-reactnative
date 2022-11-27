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
import ItemMemAcc from './ItemMemAcc';
import {images} from '../../constants';
function ListMemOnGroupWaitingAccept(props) {
  const [userId, setUser_id] = useState('');
  const [friend, setFriend] = useState([]);
  const [admin, setAdmin] = useState('');
  const [myUser, setMyUser] = useState('');
  const BASE_URL =
    'http://192.168.43.91:8080/api/conversation/get-request-list';
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('conver_id').then(result => {
      setUser_id(result);
    });
    AsyncStorage.getItem('user_id').then(result => {
      setMyUser(result);
    });
    AsyncStorage.getItem('admin').then(result => {
      setAdmin(result);
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
        conversation_id: userId,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        // const currentUser = resJson.members;
        // const currentUserRequests = resJson.requests;
        // console.log('demo day nha: ', currentUser.members);
        //  currentUserRequests.map(req=>{
        //   if (req==) {

        //   }
        //  })
        setFriend(resJson);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <ScrollView horizontal={false} style={{flex: 1}}>
      <View>
        {myUser == admin ? (
          <FlatList
            data={friend}
            renderItem={({item, index}) => (
              <ItemMemAcc chat={item} key={item.user_id} index={index} />
            )}
            keyExtractor={eachChat => eachChat.title}
          />
        ) : (
          <View>
            <Text style={{color: 'white', textAlign: 'center', padding: 10}}>
              Những người đã nhận được lời mời vào nhóm nhưng chưa có sự đồng ý
              tham gia
            </Text>
            <Image
              source={images.celendar}
              style={{
                height: 100,
                width: 100,
                alignSelf: 'center',
                marginTop: 150,
              }}></Image>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
export default ListMemOnGroupWaitingAccept;
