import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {images} from '../../../constants';
import moment from 'moment-feiertage';
function ItemChat(props) {
  let {
    receiver,
    content,
    image,
    time,
    numberOfChat,
    last_message,
    seen_last_messages,
    is_blocked,
    is_group,
    _id,
  } = props.chat;
  var formattedDate = moment(last_message.createdAt)
    .utc()
    .format('MM/DD/YY h:mm a');
  getTimeOnChat = () => {
    if (new Date().toISOString() !== last_message.createdAt) {
      console.log(new Date());
      return (formattedDate = moment(last_message.createdAt)
        .utc()
        .format('MM/DD/YY'));
    } else {
      return (formattedDate = moment(last_message.createdAt)
        .utc()
        .format('h:mm a'));
    }
  };
  const {onPress} = props;
  const {index} = props;
  return is_blocked == false || is_blocked == undefined ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#202124',
      }}>
      <View style={{flexDirection: 'row', padding: 15}}>
        <Image
          source={{uri: receiver.avatar}}
          style={{height: 50, width: 50, borderRadius: 100}}></Image>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            {receiver.members == null ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: 'white',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  fontSize: 13,
                  width: 230,
                }}>
                {receiver.nick_name}
              </Text>
            ) : (
              <View>
                {/* {receiver.members.map(members => ( */}
                <Text
                  style={{
                    color: 'white',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    fontSize: 13,
                    width: 230,
                  }}>
                  {receiver.nick_name}
                </Text>
                {/* ))} */}
              </View>
            )}
            <View style={{flex: 1}}></View>
            <Image
              source={images.notification}
              style={{
                height: 15,
                width: 15,
              }}
            />
            {last_message != null ? (
              <Text
                style={{
                  color: 'white',
                  paddingHorizontal: 2,
                  opacity: 0.5,
                  fontSize: 10,
                }}>
                {getTimeOnChat()}
              </Text>
            ) : (
              <View></View>
            )}
          </View>
          <View style={{width: 250, flexDirection: 'row'}}>
            {last_message.content_type != 'image' ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: 'white',
                  paddingHorizontal: 15,
                  opacity: {seen_last_messages} ? 1 : 0.5,
                  width: 250,
                }}>
                {last_message.content}
              </Text>
            ) : (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: 'white',
                  paddingHorizontal: 15,
                  opacity: {seen_last_messages} ? 1 : 0.5,
                  width: 250,
                }}>
                Hình ảnh
              </Text>
            )}
            {numberOfChat > 0 && (
              <View
                style={{
                  height: 15,
                  width: 20,
                  borderRadius: 10,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View style={{flex: 1}}></View>
                {index == 0 ? (
                  <Text
                    style={{
                      fontSize: 10,
                      color: 'white',
                      alignSelf: 'center',
                    }}>
                    N
                  </Text>
                ) : (
                  <Text
                    style={{fontSize: 10, color: 'white', alignSelf: 'center'}}>
                    {numberOfChat}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: 'gray',
          opacity: 0.2,
          marginStart: 80,
        }}></View>
    </TouchableOpacity>
  ) : (
    <View></View>
  );
}
export default ItemChat;
