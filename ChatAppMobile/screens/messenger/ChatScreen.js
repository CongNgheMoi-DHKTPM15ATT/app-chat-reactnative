import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import ItemMess from './ItemMess';
import socket from '../../utils/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
function ChatScreen(props) {
  const BASE_URL = 'https://halo-chat.herokuapp.com/api/messages';
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [typeText, setTypeText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState('');
  let {receiver, _id, content, image, time, numberOfChat} =
    props.route.params.users;
  const {navigate, goBack} = props.navigation;
  useEffect(() => {
    setIsLoading(true);
    getMessagesByUserId();
  }, [chatHistory]);
  //kiểm tra user
  const getUsername = async () => {
    try {
      const value = await AsyncStorage.getItem('user_name');
      if (value !== null) {
        setUser(value);
      }
    } catch (e) {
      console.error('Error while loading username!');
    }
  };
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
        currentUser.sort(function (a, b) {
          return (
            new new Date(b.createdAt).getTime() - Date(a.createdAt).getTime()
          );
        });
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setIsLoading(false));
  };
  //gửi tin nhắn nè mấy bà
  // const handleSendMessage = async (typeText) => {
  //   try {
  //     const params = {
  //       sender_id: _id,
  //       conversation_id: chatAcount.conversation_id,
  //       text: typeText,
  //     };
  //     const response = await messageAPI.sendMessage(params);
  //     socket.emit("send", {
  //       senderId: _id,
  //       receiverId: chatAcount.receiver_id,
  //       nick_name: chatAcount.user_nick_name,
  //       text: typeText,
  //     });
  //     _setListMessage((_listMessage) => [typeText, ..._listMessage]);
  //   } catch (error) {
  //     console.log("Failed to call API send message" + error);
  //   }
  // };
  useEffect(() => {
    socket.initializeSocket();
  }, []);
  useEffect(() => {
    socket.on('getMessage'),
      msg => {
        console.log('message recives in reactApp', msg);
      };
  }, []);
  const handleSendMessage = () => {
    socket.emit('send', typeText);
    return;
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
      <FlatList
        // style={{flexDirection: 'column-reverse'}}
        // .reverse()
        inverted
        data={chatHistory}
        renderItem={({item, index}) => (
          <ItemMess
            title={receiver.nick_name}
            chat={item}
            index={index}
            onPress={() => {
              alert(`name is: ${item.content}`);
            }}
            item={item}
            key={`${item.createdAt}`}
          />
        )}
        keyExtractor={eachChat => eachChat.timeSend}
      />

      <View
        style={{
          height: 50,
          position: 'absolute',
          flexDirection: 'row',
          bottom: 0,
          left: 0,
          backgroundColor: '#202124',
          right: 0,
        }}>
        <TextInput
          placeholderTextColor={'white'}
          autoCorrect={false}
          placeholder="Tin nhắn"
          onChangeText={text => {
            setTypeText(text);
          }}
          value={typeText}
          style={{
            height: 60,
            flex: 1,
            marginEnd: 8,
            borderRadius: 5,
            color: 'white',
            paddingStart: 60,
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
export default ChatScreen;
