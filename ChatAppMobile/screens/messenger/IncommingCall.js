import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  Button,
  StyleSheet,
  BackHandler,
  Keyboard,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EmojiPicker from 'rn-emoji-keyboard';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import ItemMess from './ItemMess';
import socket from '../../utils/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
function IncommingCall(props) {
  onDenline = () => {
    alert('decline');
  };
  onAccept = () => {
    alert('ok');
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={images.bg_call}
        resizeMode="cover"
        style={{flex: 1, justifyContent: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            flex: 90,
          }}>
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  backgroundColor: 'white',
                }}
                source={{
                  uri: 'https://zpsocial-f48-org.zadn.vn/ccdf550265c28a9cd3d3.jpg',
                }}></Image>
            </TouchableOpacity>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              ANH THU
            </Text>
          </View>
        </View>
        <View style={{flex: 20, alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: 35,
              }}>
              <TouchableOpacity
                onPress={onDenline}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 50,
                    alignItems: 'center',
                  }}
                  source={images.phone_call}></Image>
              </TouchableOpacity>
              <Text style={{color: 'white', marginHorizontal: 15}}>
                Kết thúc
              </Text>
            </View>
            <View style={{flex: 1}}></View>
            <View style={{flexDirection: 'column', justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={onAccept}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 55,
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 50,
                    alignItems: 'center',
                  }}
                  source={images.phone_start}></Image>
              </TouchableOpacity>
              <Text style={{color: 'white'}}>Nghe đi</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
export default IncommingCall;
