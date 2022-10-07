import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {images} from '../../../constants';
function ItemChat(props) {
  let {title, content, image, time} = props.chat;
  const {onPress} = props;
  const {index} = props;
  return (
    <View
      style={{
        backgroundColor: index == 0 ? 'black' : '#202124',
      }}>
      <View style={{flexDirection: 'row', padding: 15}}>
        <Image
          source={image}
          style={{height: 50, width: 50, borderRadius: 100}}></Image>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
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
              {title}
            </Text>
            <View style={{flex: 1}}></View>
            <Image
              source={images.notification}
              style={{
                height: 15,
                width: 15,
              }}
            />
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 5,
                opacity: 0.5,
                fontSize: 12,
              }}>
              {time}
            </Text>
          </View>
          <View style={{width: '90%'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{color: 'white', paddingHorizontal: 15, opacity: 0.5}}>
              {content}
            </Text>
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
    </View>
  );
}
export default ItemChat;
