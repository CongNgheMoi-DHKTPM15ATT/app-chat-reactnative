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
import ItemMess from './ItemMess';
function ChatScreen(props) {
  const [isActive, setIsActive] = useState(false);
  // const {title, image} = props.chat;
  const [chatHistory, setChatHistory] = useState([
    {
      url: 'https://s120-ava-talk.zadn.vn/9/a/9/6/7/120/d091055bc64c43fbd496df5470d078b8.jpg',
      isSender: false,
      messenger: 'Anh chạ iu em, a chả thương e, a chả quan tâm emmm',
      timeSend: 86400,
      showUrl: true,
    },
    {
      url: 'https://scontent.fsgn6-2.fna.fbcdn.net/v/t39.30808-6/289693821_582015943280803_2102006602626651935_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-WOCPlYjLD8AX-waxSm&_nc_ht=scontent.fsgn6-2.fna&oh=00_AT9lpvs02yr7TdIwMA3PDMBu8XC4P56Rcun_oZQgRmVjmw&oe=6345BAA4',
      isSender: true,
      messenger: 'Cút hộ aaaa',
      timeSend: 86400,
      showUrl: true,
    },
    {
      url: 'https://scontent.fsgn6-2.fna.fbcdn.net/v/t39.30808-6/289693821_582015943280803_2102006602626651935_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-WOCPlYjLD8AX-waxSm&_nc_ht=scontent.fsgn6-2.fna&oh=00_AT9lpvs02yr7TdIwMA3PDMBu8XC4P56Rcun_oZQgRmVjmw&oe=6345BAA4',
      isSender: true,
      messenger: 'Hoy a sai :(',
      timeSend: 1665243791,
      showUrl: false,
    },
    {
      url: 'https://scontent.fsgn6-2.fna.fbcdn.net/v/t39.30808-6/289693821_582015943280803_2102006602626651935_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-WOCPlYjLD8AX-waxSm&_nc_ht=scontent.fsgn6-2.fna&oh=00_AT9lpvs02yr7TdIwMA3PDMBu8XC4P56Rcun_oZQgRmVjmw&oe=6345BAA4',
      isSender: true,
      messenger: 'Thế mình quay lại nhé',
      timeSend: 1665243791,
      showUrl: false,
    },
    {
      url: 'https://s120-ava-talk.zadn.vn/9/a/9/6/7/120/d091055bc64c43fbd496df5470d078b8.jpg',
      isSender: false,
      messenger: 'Ỉaaaaa',
      timeSend: 1665243791,
      showUrl: true,
    },
  ]);
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
      <FlatList
        data={chatHistory}
        renderItem={({item, index}) => (
          <ItemMess
            chat={item}
            index={index}
            onPress={() => {
              alert(`name is: ${item.messenger}`);
            }}
            item={item}
            key={`${item.timeSend}`}
          />
        )}
        keyExtractor={eachChat => eachChat.timeSend}
      />
    </View>
  );
}
export default ChatScreen;
