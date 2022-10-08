import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {UIHeader} from '../../components';
import {images} from '../../constants';
import ItemChat from '../chat/draws/ItemChat';
function ChatScreen(props) {
  const [isActive, setIsActive] = useState(false);
  // const {title, image} = props.chat;
  // const [mess, setMess] = useState([]);
  let {title, content, image, time, numberOfChat} = props.route.params.users;
  const {navigate, goBack} = props.navigation;
  return (
    <View>
      <UIHeader
        leftIconName={'search'}
        rightIconName={'back'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          goBack();
        }}></UIHeader>
      {/* <FlatList
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
      /> */}
    </View>
  );
}
export default ChatScreen;
