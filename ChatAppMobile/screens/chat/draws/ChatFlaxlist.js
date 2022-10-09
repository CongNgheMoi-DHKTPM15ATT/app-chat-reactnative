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
  const [username, setUsername] = useState('');
  const [chat, setChat] = useState([
    {
      title: 'Cloud của tôi',
      content: '[File] bai tap html.docx',
      image: images.item_chat,
      time: '5 giờ',
      numberOfChat: 5,
    },
    {
      title: 'DevOps Vietnam Community',
      content: '[File] bai tap html.docx',
      image: images.item_chat1,
      time: '7 giờ',
      numberOfChat: 5,
    },
    {
      title: '[ĐTN 21] BCS Các lớp K.CNTT',
      content: '[File] bai tap html.docx',
      image: images.item_chat2,
      time: '11 giờ',
      numberOfChat: 5,
    },
    {
      title: 'T5_4_6_LTTBDDNC_22_23_N2',
      content: '[File] bai tap html.docx',
      image: images.item_chat3,
      time: '1 giờ',
      numberOfChat: 5,
    },
    {
      title: 'DHDTMT17ATT-Hệ thống máy tính DHDTMT17ATT-Hệ thống máy tính',
      content:
        '[File] bai tap html.docx [File] bai tap html.docx [File] bai tap html.docx [File] bai tap html.docx [File] bai tap html.docx',
      image: images.item_chat3,
      time: '23 giờ',
      numberOfChat: 5,
    },
    {
      title: 'T3_7_9_LT_KTTKPM_22_23_NEW',
      content: '[File] bai tap html.docx',
      image: images.item_chat3,
      time: '5 giờ',
      numberOfChat: 5,
    },
    {
      title: 'Mẹeee',
      content: '[File] bai tap html.docx',
      image: images.item_chat4,
      time: '5 giờ',
      numberOfChat: 5,
    },
    {
      title: 'Mẹeee',
      content: '[File] bai tap html.docx',
      image: images.item_chat4,
      time: '5 giờ',
      numberOfChat: 0,
    },
    {
      title: 'Mẹeee',
      content: '[File] bai tap html.docx',
      image: images.item_chat4,
      time: '5 giờ',
      numberOfChat: 100,
    },
  ]);
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_name').then(result => {
      setUsername(result);
    });
  });
  return (
    <View style={{flex: 1}}>
      <Text style={{color: 'white'}}>{username}</Text>
      <UIHeader
        leftIconName={'search'}
        rightIconName={'QR'}
        onPressLeftIcon={() => {
          alert('Left icon');
        }}
        onPressRightIcon={() => {
          alert('Right icon');
        }}></UIHeader>
      <FlatList
        data={chat}
        renderItem={({item, index}) => (
          <ItemChat
            chat={item}
            key={item.title}
            index={index}
            onPress={() => {
              //alert(`name is: ${item.title}`);
              navigate('Messenger', {users: item});
            }}
          />
        )}
        keyExtractor={eachChat => eachChat.title}
      />
    </View>
  );
}
export default ChatActivity;
