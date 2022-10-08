import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {images} from '../../constants';
import ItemChat from '../chat/draws/ItemChat';
function ChatScreen(props) {
  const [isActive, setIsActive] = useState(false);
  // const {title, image} = props.chat;
  const [chat, setChat] = useState([
    {
      title: 'Cloud của tôi',
      content: '[File] bai tap html.docx',
      image: images.item_chat,
      time: '5 giờ',
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
export default ChatScreen;
