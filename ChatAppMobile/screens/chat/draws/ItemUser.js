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
function ItemUser(props) {
  const {user_name, _id, friends, avatar} = props.data;
  const {onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 80,
        backgroundColor: '#252526',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={{uri: avatar}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 100,
          margin: 15,
        }}
      />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontSize: 16,
          color: 'white',
          width: 150,
        }}>
        {user_name}
      </Text>
      <View style={{flex: 1}}></View>
    </TouchableOpacity>
  );
}
export default ItemUser;
