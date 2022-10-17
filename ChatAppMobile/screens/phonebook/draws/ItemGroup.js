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
function ItemGroup(props) {
  let {title, content, image, time, numberOfChat} = props.chat;
  const {onPress} = props;
  const {index} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#202124',
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
          <View style={{width: 250, flexDirection: 'row'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: 'white',
                paddingHorizontal: 15,
                opacity: numberOfChat > 0 ? 1 : 0.5,
                width: 250,
              }}>
              {content}
            </Text>
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
  );
}
export default ItemGroup;
