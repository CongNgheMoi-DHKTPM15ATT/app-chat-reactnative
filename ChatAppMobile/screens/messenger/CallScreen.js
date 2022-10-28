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
import {mediaDevices, RTCView} from 'react-native-webrtc';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import EmojiPicker from 'rn-emoji-keyboard';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import ItemMess from './ItemMess';
import socket from '../../utils/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
function CallScreen(props) {
  const [senderId, setSenderId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [onMic, setOnMic] = useState(true);
  const [onVol, setOnVol] = useState(true);
  const [onCam, setOnCam] = useState(true);
  const [stream, setStream] = useState(null);
  //stream
  const start = async () => {
    console.log('start');
    if (!stream) {
      let s;
      try {
        s = await mediaDevices.getUserMedia({video: true});
        setStream(s);
      } catch (e) {
        console.error(e);
      }
    }
  };
  const stop = () => {
    console.log('stop');
    if (stream) {
      stream.release();
      setStream(null);
    }
  };
  // ket nois socket
  useEffect(() => {
    socket.initializeSocket();
  });
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('account-send').then(result => {
      setSenderId(result);
    });
    AsyncStorage.getItem('name-send').then(result => {
      setSenderName(result);
    });
  });
  useEffect(() => {
    socket.emit('addUser', {senderId: senderId});
    // console.log(videoCallAccount);
    // navigator.mediaDevices
    //   .getUserMedia({video: true, audio: true})
    //   .then(stream => {
    //     setStream(stream);
    //   });
    // if (videoCallAccount.type === 'receiver') {
    //   socket.emit('accept_video_call', videoCallAccount.receiverId);
    // }
  }, []);

  onHangup = () => {
    alert('hang up');
  };
  return (
    <View style={{flex: 1}}>
      {/* <ImageBackground
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
            <View
              style={{
                height: 200,
                width: 150,
                backgroundColor: 'red',
                position: 'absolute',
                bottom: 50,
                marginTop: 5,
                left: 20,
              }}></View>
          </View>
        </View>
        <View style={{flex: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'space-between',
            }}>
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: 'gray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                }}>
                <Image
                  style={{
                    height: 25,
                    width: 25,
                    borderRadius: 50,
                    alignItems: 'center',
                  }}
                  source={images.volume_call}></Image>
              </TouchableOpacity>
              <Text style={{color: 'white', marginHorizontal: 15}}>Loa</Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginHorizontal: 30,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={onHangup}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 10,
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
            <View style={{flexDirection: 'column'}}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  backgroundColor: 'gray',
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
                  source={images.mic_call}></Image>
              </TouchableOpacity>
              <Text style={{color: 'white', marginHorizontal: 15}}>Mic</Text>
            </View>
          </View>
        </View>
      </ImageBackground> */}
      {stream && <RTCView streamURL={stream.toURL()} style={{flex: 1}} />}
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        <Button title="Start" onPress={start} />
        <Button title="Stop" onPress={stop} />
      </View>
    </View>
  );
}
export default CallScreen;
