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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import EmojiPicker from 'rn-emoji-keyboard';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import ItemMess from './ItemMess';
import socket from '../../utils/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
const options = {
  title: `Select Image or Video\n(mixed)`,
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'mixed',
  },
};
export default function ChatScreen(props) {
  // const BASE_URL = 'http://192.168.43.91:8080/api/messages';
  const BASE_URL = 'http://192.168.0.3:8080/api/messages';

  // https://codejava-app-anime.herokuapp.com/upload
  const SERVER_URL = 'https://codejava-app-anime.herokuapp.com/upload';
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [typeText, setTypeText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [emoji, setEmoji] = useState([]);
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [contentType, setContentType] = useState('');
  let {
    receiver,
    _id,
    is_group,
    content,
    image,
    time,
    numberOfChat,
    content_type,
  } = props.route.params.users;
  const {navigate, goBack} = props.navigation;
  const [photo, setPhoto] = React.useState(null);
  const [activeUser, setActiveUser] = useState([]);
  const handlePick = (emojiObject: EmojiType) => {
    setTypeText(emojiObject.emoji);
    console.log(emojiObject);
    /* example emojiObject = { 
        "emoji": "❤️",
        "name": "red heart",
        "slug": "red_heart",
      }
    */
  };

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
  const getMessagesByUserId = () => {
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
    // socket.on('all-users', user => {
    //   console.log('Active');
    //   console.log(user);
    // });
  }, []);
  // ham nhan tin nhan tu socket
  useEffect(() => {
    socket.on('getMessage'),
      msg => {
        console.log('message recives in reactApp', msg);
      };
  });
  //gửi tin nhắn nè mấy bà
  handleSendMessage = async () => {
    const response = await sendMessage();
    socket.emit('send', {
      senderId: userId,
      receiverId: receiver._id,
      nick_name: receiver.nick_name,
      content_type: contentType,
      text: typeText,
    });
    // setChatHistory(_listMessage => [response, ..._listMessage]);
    setTypeText('');
    return;
  };
  sendMessage = () => {
    // const url = 'http://192.168.43.91:8080/api/messages/send';
    const url = 'http://192.168.0.3:8080/api/messages/send';

    const method = 'POST';
    if (contentType != null) {
      setContentType('text');
    }
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender_id: userId,
        conversation_id: _id,
        content_type: contentType,
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

  //get image form library
  handleChoosePhoto = async () => {
    const images = await launchImageLibrary(options);
    // console.log(images.assets[0]);
    const formData = new FormData();
    formData.append('img', {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });
    let res = await fetch('https://codejava-app-anime.herokuapp.com/upload', {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    let resJson = await res.json();
    // console.log(
    //   '-------------------------------------------------------------------------------------------------',
    // );
    // console.log(resJson.pathVideo);
    setTypeText(resJson.pathVideo);
    setContentType('image');
    handleSendMessage();
  };
  const joinRoom = () => {
    socket.emit('join-room', {roomId: _id, userName: receiver.nick_name});
  };

  return (
    <View style={{flex: 1}}>
      <UIHeaderChat
        title={receiver.nick_name}
        numOfMember={receiver.members}
        leftIconName={'search'}
        rightIconName={'back'}
        phoneRightIconName={'phone'}
        videoRightIconName={'video'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          navigate('SettingChat', {id: {_id, receiver, is_group}});
          ////////////////// xu ly
        }}
        onPressPhoneRightIcon={() => {
          joinRoom();
          navigate('CallScreen');
          // alert('ok');
        }}
        onPressVideoRightIcon={() => {
          alert('ok');
        }}></UIHeaderChat>

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
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
          <Image
            source={require('../../assets/emoji.png')}
            style={{
              height: 30,
              width: 30,
              marginLeft: 10,
              marginBottom: 10,
              marginVertical: 10,
            }}></Image>
        </TouchableOpacity>
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
        <View
          style={{
            height: 250,
            alignItems: 'center',
            justifyContent: 'center',
          }}></View>
        {photo && (
          <>
            <Image
              source={{uri: photo.uri}}
              style={{width: 1000, height: 1000}}
            />
            <TouchableOpacity onPress={handleUploadPhoto}>
              <Image
                source={require('../../assets/lirbary.png')}
                style={{height: 35, width: 35, margin: 3}}></Image>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Image
            source={require('../../assets/lirbary.png')}
            style={{height: 35, width: 35, margin: 3}}></Image>
        </TouchableOpacity>
        {/* <EmojiModal onEmojiSelected={emoji => {}} /> */}
      </View>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        value={typeText}
        onChange={setTypeText}
        onClose={() => setIsOpen(false)}
      />
    </View>
  );
}
