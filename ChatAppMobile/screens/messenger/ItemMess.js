import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import ImageView from 'react-native-image-view';
import {images} from '../../constants';
import {screenWidth, screenHeight} from '../../utils/Device';
function ItemMess(props) {
  let {
    content,
    sender,
    url,
    isSender,
    messenger,
    timeSend,
    showUrl,
    content_type,
  } = props.item;
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
          source={{uri: receiver.avatar}}
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
          {content_type != 'image' ? (
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
          ) : (
            <Image
              source={{
                uri: 'https://thu-viddeo-public.s3.amazonaws.com/1666502176242-rn_image_picker_lib_temp_6ff1b873-c54f-46f1-a011-b4c6e5819f4b.jpg',
              }}
              style={{height: 100, width: 100}}></Image>
          )}
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
            {content_type != 'image' ? (
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
            ) : (
              <View style={{backgroundColor: 'white', flex: 1}}>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `${content}`,
                    }}
                    style={{height: 200, left: 0, right: 0}}
                    resizeMode="contain"></Image>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      {showUrl == true ? (
        <Image
          source={{uri: sender.avatar}}
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
