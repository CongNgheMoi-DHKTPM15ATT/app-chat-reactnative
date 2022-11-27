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
  ScrollView,
  Keyboard,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images, fontSizes, colors} from '../constants';
import EmojiPicker from 'rn-emoji-keyboard';
import {useNavigation} from '@react-navigation/native';
import {ItemChat, ItemFriend} from '../screens';
import ItemUser from '../screens/chat/draws/ItemUser';
import Task from '../screens/chat/draws/Task';
function AddGroup(props) {
  var screen = Dimensions.get('window');
  const [isOpen, setIsOpen] = useState(false);
  const {onPress, data, onPressDelete} = props;
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [phone, setPhone] = useState('');
  const [nameGroup, setNameGroup] = useState('');
  const [userId, setUser_id] = useState('');
  const [profile, setProfile] = useState([]);
  const [chat, setChat] = useState([]);
  const [value, setValue] = useState(false);
  const [taskItems, setTaskItems] = useState([]);

  // const BASE_URL = 'http://192.168.43.91:8080/api/user/search';
  const BASE_URL = 'http://192.168.43.91:8080/api/user/search';
  // const GROUP_URL = 'http://192.168.43.91:8080/api/conversation/create-group';
  const GROUP_URL = 'http://192.168.43.91:8080/api/conversation/create-group';
  const handlePick = (emojiObject: EmojiType) => {
    setNameGroup(emojiObject.emoji);
    console.log(emojiObject);
    /* example emojiObject = { 
        "emoji": "❤️",
        "name": "red heart",
        "slug": "red_heart",
      }
    */
  };
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  useEffect(() => {
    getAllUsers();
  }, [userId]);

  useEffect(() => {
    // console.log('éc éc', chat);
    let Select = [];
    for (let i = 0; i < chat.length; i++) {
      if (chat[i].check === true) {
        Select.push({avatar: chat[i].avatar, _id: chat[i]._id});
      }
      // console.log('éc éc', Select);
      setTaskItems(Select, ...taskItems);
    }
  }, [chat]);
  useEffect(() => {
    // console.log('éc éc éc', taskItems);
  }, [taskItems]);
  // const BASE_URL_Con = 'http://192.168.43.91:8080/api/user/get-friends-pending';
  const BASE_URL_Con = 'http://192.168.43.91:8080/api/user/get-friends-pending';

  getAllUsers = () => {
    const method = 'POST';
    fetch(BASE_URL_Con, {
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
        // console.log('day ne ba da: ', currentUser);
        setChat(currentUser);
        // console.log(friends);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };

  //search local
  const filterSearch = () =>
    chat.filter(eachFood =>
      eachFood.user_name.toLowerCase().includes(phone.toLowerCase()),
    );
  const onChecked = id => {
    let cloneChat = chat.map(eachChat => {
      if (id == eachChat._id) {
        return {
          ...eachChat,
          check:
            eachChat.check == false || eachChat.check == undefined
              ? true
              : false,
        };
      }
      return eachChat;
    });
    // sua doi
    setChat(cloneChat);
    // getSelectChat();
  };
  //create group
  // {
  //   "user_id": [
  //     "635cd13ef94a4a2396c4ebfb",
  //     "635cd1f7f94a4a2396c4ec5b",
  //     "635cdcb2a7ff15907316f5c6"
  //   ],
  //   "group_name": "ANH_THU",
  //   "admin_id": "635cd100f94a4a2396c4ebf7"
  // }
  //
  const onPickToGroup = taskItems => {
    let listUserId = [];
    let _id = taskItems.map(t => listUserId.push(t._id));
    const method = 'POST';
    fetch(GROUP_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: listUserId,
        group_name: nameGroup,
        admin_id: userId,
      }),
    })
      .then(res => res.json())
      .then(resJson => {})
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => navigate('UITag'));
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
      }}>
      <Text style={{color: 'white', marginHorizontal: 15, marginVertical: 5}}>
        Nhóm mới: 0
      </Text>
      <Text
        style={{
          color: 'white',
          marginHorizontal: 15,
          marginVertical: 5,
          opacity: 0.5,
        }}>
        Đã chọn
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'flex-end',
          marginLeft: 330,
          position: 'absolute',
          flexDirection: 'row',
        }}>
        <Image source={images.close} style={{height: 24, width: 24}}></Image>
      </TouchableOpacity>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            bottom: 0,
            left: 0,
            backgroundColor: '#202124',
            right: 0,
          }}>
          <TouchableOpacity
            onPress={onPress}
            style={{
              justifyContent: 'flex-start',
              position: 'absolute',
              flexDirection: 'row',
              marginTop: 20,
              margin: 20,
            }}>
            <Image
              source={images.camera}
              style={{height: 30, width: 30}}></Image>
          </TouchableOpacity>
          <TextInput
            onChangeText={text => {
              setNameGroup(text);
            }}
            placeholder="Đặt tên nhóm"
            placeholderTextColor={'gray'}
            value={nameGroup}
            style={{
              paddingLeft: 70,
              color: 'white',
              fontSize: 16,
              width: 270,
            }}></TextInput>

          {nameGroup.trim().length > 0 ? (
            <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
              <Image
                source={require('../assets/emoji.png')}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 20,
                  marginVertical: 10,
                }}></Image>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
          <TouchableOpacity
            onPress={() => {
              if (nameGroup.trim().length == 0) {
                return;
              }
              AsyncStorage.setItem('name_group', nameGroup);
            }}>
            {nameGroup.trim().length > 0 ? (
              <Image
                source={images.check}
                style={{
                  height: 25,
                  width: 25,
                  margin: 15,
                  marginTop: 20,
                  marginLeft: 1,
                }}></Image>
            ) : (
              <View></View>
            )}
          </TouchableOpacity>

          <EmojiPicker
            onEmojiSelected={handlePick}
            open={isOpen}
            value={nameGroup}
            onChange={setNameGroup}
            onClose={() => setIsOpen(false)}
          />
        </View>
        <View
          style={{
            height: 40,
            flexDirection: 'row',
            bottom: 0,
            left: 0,
            backgroundColor: '#202124',
            borderRadius: 5,
            margin: 10,
            right: 0,
          }}>
          <Image
            source={images.icon_search}
            style={{height: 30, width: 30, margin: 5}}></Image>
          <TextInput
            onChangeText={text => {
              setPhone(text);
            }}
            placeholder="Tìm tên hoặc số điện thoại"
            placeholderTextColor={'gray'}
            value={phone}
            style={{
              paddingLeft: 10,
              color: 'white',
              fontSize: 16,
              width: 270,
            }}></TextInput>
        </View>

        {filterSearch().map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onChecked(item._id);
              }}
              style={{
                height: 80,
                backgroundColor: '#252526',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              key={index}>
              <Image
                source={{uri: item.avatar}}
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
                {item.user_name}
              </Text>
              <View style={{flex: 1}}></View>
              <CheckBox
                value={item.check}
                onValueChange={() => {
                  onChecked(item._id);
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
      {taskItems.length > 0 ? (
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            marginTop: 50,
            backgroundColor: '#202124',
            justifyContent: 'flex-end',
          }}>
          <FlatList
            horizontal
            data={taskItems}
            renderItem={({item, index}) => <Task text={item} />}
            keyExtractor={eachChat => eachChat._id}
            key={eachChat => eachChat._id}
          />

          {taskItems.length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                onPickToGroup(taskItems);
              }}>
              <Image
                source={images.check}
                style={{
                  height: 25,
                  width: 25,
                  margin: 15,
                  marginTop: 20,
                  marginLeft: 1,
                }}></Image>
            </TouchableOpacity>
          ) : (
            <View></View>
          )}
        </View>
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
}
export default AddGroup;
