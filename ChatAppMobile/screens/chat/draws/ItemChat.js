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
  return (
    <View
      style={{
        backgroundColor: '#202124',
      }}>
      <View style={{flexDirection: 'row', padding: 15}}>
        <Image
          source={image}
          style={{height: 60, width: 60, borderRadius: 100}}></Image>
        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                paddingHorizontal: 15,
                paddingVertical: 5,
                fontSize: 15,
                width: 210,
              }}>
              {title}
            </Text>
            <View style={{flex: 1}}></View>
            <Image
              source={images.notification}
              style={{
                height: 20,
                width: 20,
              }}
            />
            <Text style={{color: 'white', paddingHorizontal: 5, opacity: 0.5}}>
              {time}
            </Text>
          </View>
          <Text style={{color: 'white', paddingHorizontal: 15, opacity: 0.5}}>
            {content}
          </Text>
        </View>
      </View>
      <View style={{height: 1, backgroundColor: 'gray', opacity: 0.2}}></View>
    </View>
  );
}
export default ItemChat;
