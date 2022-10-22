import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  BackHandler,
  Keyboard,
} from 'react-native';
import EmojiModal from 'react-native-emoji-modal';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import ItemMess from './ItemMess';
import socket from '../../utils/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
import EmojiContext from '../../components/context';
import emojisData from '../../data/emojis.json';
import EmojisTab from '../../components/EmojisTab';
export default function ChatScreen(props) {
  const BASE_URL = 'https://halo-chat.herokuapp.com/api/messages';
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [typeText, setTypeText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  let {receiver, _id, content, image, time, numberOfChat} =
    props.route.params.users;
  const {navigate, goBack} = props.navigation;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', function () {
      if (showEmojis) {
        setShowEmojis(false);
      }
    });

    Keyboard.addListener('keyboardWillShow', () => {
      if (showEmojis) {
        setShowEmojis(false);
      }
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => {});
      Keyboard.removeAllListeners('keyboardWillShow', () => {});
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getMessagesByUserId();
    getUsername();
  }, [chatHistory]);
  //kiểm tra user
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('user_name');
      const userId = await AsyncStorage.getItem('user_id');
      if (value !== null || userId !== null) {
        setUser(value);
        setUserId(userId);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };
  // ham lay mess tu conversation_id
  getMessagesByUserId = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: _id,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.messages;
        setChatHistory(currentUser);
        console.log(currentUser);
        currentUser.sort(function (a, b) {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setIsLoading(false));
  };
  // ket nois socket
  useEffect(() => {
    socket.initializeSocket();
  });
  // ham nhan tin nhan tu socket
  useEffect(() => {
    socket.on('getMessage'),
      msg => {
        console.log('message recives in reactApp', msg);
      };
  });
  //gửi tin nhắn nè mấy bà
  const handleSendMessage = async () => {
    const response = await sendMessage();
    socket.emit('send', {
      senderId: userId,
      receiverId: receiver._id,
      nick_name: receiver.nick_name,
      text: typeText,
    });
    // setChatHistory(_listMessage => [response, ..._listMessage]);
    return;
  };
  sendMessage = () => {
    const url = 'http://192.168.1.104:8080/api/messages/send';
    const method = 'POST';
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: userId,
        conversation_id: _id,
        text: typeText,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.data;
        // getMessagesByUserId();
        // setChatHistory(currentUser);
      });
  };

  return (
    <View style={{flex: 1}}>
      <UIHeaderChat
        title={receiver.nick_name}
        leftIconName={'search'}
        rightIconName={'back'}
        phoneRightIconName={'phone'}
        videoRightIconName={'video'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {}}
        onPressPhoneRightIcon={() => {}}
        onPressVideoRightIcon={() => {}}></UIHeaderChat>

      {/* <ScrollView
        ref={ref => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({animated: true})
        }> */}
      <FlatList
        // .reverse()
        data={chatHistory}
        inverted
        renderItem={({item, index}) => (
          <ItemMess
            title={receiver.nick_name}
            chat={item}
            index={index}
            onPress={() => {
              alert(`name is: ${item.content}`);
            }}
            item={item}
            // key={`${item.createdAt}`}
          />
        )}
        // keyExtractor={eachChat => eachChat.timeSend}
      />
      {/* </ScrollView> */}

      <View
        style={{
          height: 50,
          flexDirection: 'row',
          bottom: 0,
          left: 0,
          backgroundColor: '#202124',
          right: 0,
        }}>
        <Image
          source={require('../../assets/emoji.png')}
          style={{
            height: 30,
            width: 30,
            marginLeft: 10,
            marginBottom: 10,
            marginVertical: 10,
          }}></Image>
        {/* <EmojiModal onEmojiSelected={emoji => {}} /> */}
        <TextInput
          placeholderTextColor={'white'}
          autoCorrect={false}
          placeholder="Tin nhắn"
          onChangeText={text => {
            setTypeText(text);
          }}
          value={typeText}
          style={{
            height: 50,
            flex: 1,
            marginEnd: 8,
            borderRadius: 5,
            color: 'white',
            paddingStart: 20,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            if (typeText.trim().length == 0) {
              return;
            }
            setTypeText('');

            handleSendMessage();
          }}>
          {typeText.trim().length > 0 ? (
            <Image
              source={images.send}
              style={{
                height: 25,
                width: 25,
                margin: 15,
              }}></Image>
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
