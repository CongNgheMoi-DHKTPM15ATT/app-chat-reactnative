import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {images} from '../../constants';
import {screenWidth, screenHeight} from '../../utils/Device';
function ItemMess(props) {
  let {content, sender, url, isSender, messenger, timeSend, showUrl} =
    props.item;
  props.item;
  const {onPress} = props;
  const {index} = props;
  const {title} = props;
  return sender.nick_name == title ? (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
      }}>
      {showUrl == true ? (
        <Image
          source={{uri: url}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            marginRight: 15,
            marginStart: 10,
            resizeMode: 'cover',
          }}></Image>
      ) : (
        <View style={{width: 40, height: 40}}></View>
      )}
      <View style={{width: screenWidth * 0.7, flexDirection: 'row'}}>
        <View>
          <Text
            style={{
              color: 'white',
              paddingVertical: 5,
              paddingHorizontal: 7,
              backgroundColor: '#202124',
              borderRadius: 10,
            }}>
            {content}
          </Text>
        </View>
        <View style={{width: 20}}></View>
      </View>
    </TouchableOpacity>
  ) : (
    //Nay la nguoi nhan sender
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: screenWidth * 0.8,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View>
          <View style={{width: 40}}></View>
          <View>
            <Text
              style={{
                color: 'white',
                paddingVertical: 5,
                paddingHorizontal: 7,
                backgroundColor: '#202124',
                borderRadius: 10,
              }}>
              {content}
            </Text>
          </View>
        </View>
      </View>
      {showUrl == true ? (
        <Image
          source={{uri: url}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            marginRight: 15,
            marginStart: 10,
            resizeMode: 'cover',
          }}></Image>
      ) : (
        <View style={{width: 40, height: 40}}></View>
      )}
    </TouchableOpacity>
  );
}
export default ItemMess;
