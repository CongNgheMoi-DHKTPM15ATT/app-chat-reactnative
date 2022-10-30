import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
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
  const [remoteStream, setRemoteStream] = useState(null);
  const [username, setUsername] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);
  onDenline = () => {
    alert('decline');
  };
  onAccept = () => {
    alert('ok');
  };
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
    AsyncStorage.getItem('name-send').then(result => {
      setUsername(result);
    });
    // socket.initializeSocket();
    socket.on('all-users', user => {
      console.log('Active users', setActiveUsers(user));
      setActiveUsers(user);
      console.log('user ne may ba: ', setActiveUsers(user));
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.body}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          }}>
          {username}
        </Text>
        {stream && <RTCView streamURL={stream.toURL()} style={styles.stream} />}
        {activeUsers.map((user, index) => (
          <View
            key={index}
            style={{height: 100, width: 200, flexDirection: 'column'}}>
            {remoteStream && (
              <RTCView streamURL={remoteStream.toURL()} style={styles.stream} />
            )}
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
                alignSelf: 'center',
              }}>
              {user.userName}
            </Text>
          </View>
        ))}
        <View style={styles.footer}>
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
                  onPress={stop}
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
                  onPress={start}
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
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    ...StyleSheet.absoluteFill,
    flexDirection: 'column',
    flex: 1,
  },
  stream: {
    height: 200,
    width: 200,
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: 'gray',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default CallScreen;
