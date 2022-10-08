import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {images} from '../../../constants';
import ItemChat from './ItemChat';
function ChatActivity(props) {
  const [isActive, setIsActive] = useState(false);
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
      title: 'DHDTMT17ATT-Hệ thống máy tính',
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
  return (
    <FlatList
      data={chat}
      renderItem={({item, index}) => (
        <ItemChat
          chat={item}
          index={index}
          onPress={() => {
            alert(`name is: ${item.title}`);
          }}
        />
      )}
      keyExtractor={eachChat => eachChat.title}
    />
  );
}
export default ChatActivity;
