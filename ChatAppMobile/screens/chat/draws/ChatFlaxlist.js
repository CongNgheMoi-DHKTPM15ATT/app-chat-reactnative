import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../../../constants';
import ItemChat from './ItemChat';
import {UIHeader} from '../../../components';
function ChatActivity(props) {
  const [isActive, setIsActive] = useState(false);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [userId, setUser_id] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState([]);
  // https://halo-chat.herokuapp.com/api/conversation
  // const BASE_URL = 'http://192.168.43.91:8080/api/conversation';
  const BASE_URL = 'http://192.168.1.104:8080/api/conversation';

  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  useEffect(() => {
    // setIsLoading(true);
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
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.conversations;
        console.log(currentUser);
        setChat(currentUser);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setIsLoading(false));
  };
  //search local
  const [searchText, setSearchText] = useState('');
  const filterSearch = () =>
    chat.filter(eachFood =>
      eachFood.receiver.nick_name
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
  return (
    <View style={{flex: 1}}>
      <UIHeader
        leftIconName={'search'}
        rightIconName={'QR'}
        onPressLeftIcon={() => {
          alert('Left icon');
        }}
        onChangeText={text => {
          setSearchText(text);
        }}
        onPressRightIcon={() => {}}></UIHeader>
      {filterSearch().length > 0 ? (
        <FlatList
          data={filterSearch()}
          renderItem={({item, index}) => (
            <ItemChat
              chat={item}
              key={item._id}
              index={index}
              onPress={() => {
                // alert(`name is: ${item._id}`);
                navigate('Messenger', {users: item});
              }}
            />
          )}
          keyExtractor={eachChat => eachChat.title}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', fontSize: 30}}>No data</Text>
        </View>
      )}
    </View>
  );
}
export default ChatActivity;
