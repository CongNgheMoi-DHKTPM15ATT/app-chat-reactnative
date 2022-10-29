// import React, {useState, useEffect, useLayoutEffect} from 'react';
// import {
//   Text,
//   View,
//   Image,
//   ImageBackground,
//   TouchableOpacity,
//   FlatList,
//   TextInput,
//   ScrollView,
//   Button,
//   StyleSheet,
//   BackHandler,
//   Keyboard,
// } from 'react-native';
// import {mediaDevices, RTCView} from 'react-native-webrtc';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import EmojiPicker from 'rn-emoji-keyboard';
// import {UIHeaderChat} from '../../components';
// import {images} from '../../constants';
// import ItemMess from './ItemMess';
// import socket from '../../utils/Socket';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// function CallScreen(props) {
//   const [senderId, setSenderId] = useState('');
//   const [senderName, setSenderName] = useState('');
//   const [onMic, setOnMic] = useState(true);
//   const [onVol, setOnVol] = useState(true);
//   const [onCam, setOnCam] = useState(true);
//   const [stream, setStream] = useState(null);
//   //stream
//   const start = async () => {
//     console.log('start');
//     if (!stream) {
//       let s;
//       try {
//         s = await mediaDevices.getUserMedia({video: true});
//         setStream(s);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   };
//   const stop = () => {
//     console.log('stop');
//     if (stream) {
//       stream.release();
//       setStream(null);
//     }
//   };
//   // ket nois socket
//   useEffect(() => {
//     socket.initializeSocket();
//   });
//   useEffect(() => {
//     //get user_name
//     AsyncStorage.getItem('account-send').then(result => {
//       setSenderId(result);
//     });
//     AsyncStorage.getItem('name-send').then(result => {
//       setSenderName(result);
//     });
//   });
//   useEffect(() => {
//     socket.emit('addUser', {senderId: senderId});
//     // console.log(videoCallAccount);
//     // navigator.mediaDevices
//     //   .getUserMedia({video: true, audio: true})
//     //   .then(stream => {
//     //     setStream(stream);
//     //   });
//     // if (videoCallAccount.type === 'receiver') {
//     //   socket.emit('accept_video_call', videoCallAccount.receiverId);
//     // }
//   }, []);

//   onHangup = () => {
//     alert('hang up');
//   };
//   return (
//     <View style={{flex: 1}}>
//       {/* <ImageBackground
//         source={images.bg_call}
//         resizeMode="cover"
//         style={{flex: 1, justifyContent: 'center'}}>
//         <View
//           style={{
//             alignItems: 'center',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             flex: 90,
//           }}>
//           <View style={{flexDirection: 'column', alignItems: 'center'}}>
//             <View
//               style={{
//                 height: 200,
//                 width: 150,
//                 backgroundColor: 'red',
//                 position: 'absolute',
//                 bottom: 50,
//                 marginTop: 5,
//                 left: 20,
//               }}></View>
//           </View>
//         </View>
//         <View style={{flex: 20}}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'space-between',
//             }}>
//             <View style={{flexDirection: 'column'}}>
//               <TouchableOpacity
//                 style={{
//                   height: 50,
//                   width: 50,
//                   borderRadius: 50,
//                   backgroundColor: 'gray',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   paddingHorizontal: 10,
//                 }}>
//                 <Image
//                   style={{
//                     height: 25,
//                     width: 25,
//                     borderRadius: 50,
//                     alignItems: 'center',
//                   }}
//                   source={images.volume_call}></Image>
//               </TouchableOpacity>
//               <Text style={{color: 'white', marginHorizontal: 15}}>Loa</Text>
//             </View>
//             <View
//               style={{
//                 flexDirection: 'column',
//                 marginHorizontal: 30,
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity
//                 onPress={onHangup}
//                 style={{
//                   height: 50,
//                   width: 50,
//                   borderRadius: 50,
//                   backgroundColor: 'red',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   paddingHorizontal: 10,
//                 }}>
//                 <Image
//                   style={{
//                     height: 25,
//                     width: 25,
//                     borderRadius: 50,
//                     alignItems: 'center',
//                   }}
//                   source={images.phone_call}></Image>
//               </TouchableOpacity>
//               <Text style={{color: 'white', marginHorizontal: 15}}>
//                 Kết thúc
//               </Text>
//             </View>
//             <View style={{flexDirection: 'column'}}>
//               <TouchableOpacity
//                 style={{
//                   height: 50,
//                   width: 50,
//                   borderRadius: 50,
//                   backgroundColor: 'gray',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}>
//                 <Image
//                   style={{
//                     height: 25,
//                     width: 25,
//                     borderRadius: 50,
//                     alignItems: 'center',
//                   }}
//                   source={images.mic_call}></Image>
//               </TouchableOpacity>
//               <Text style={{color: 'white', marginHorizontal: 15}}>Mic</Text>
//             </View>
//           </View>
//         </View>
//       </ImageBackground> */}
//       {stream && <RTCView streamURL={stream.toURL()} style={{flex: 1}} />}
//       <View
//         style={{
//           backgroundColor: 'white',
//           position: 'absolute',
//           bottom: 0,
//           left: 0,
//           right: 0,
//         }}>
//         <Button title="Start" onPress={start} />
//         <Button title="Stop" onPress={stop} />
//       </View>
//     </View>
//   );
// }
// export default CallScreen;

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
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

import io from 'socket.io-client';

const dimensions = Dimensions.get('window');

class CallScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localStream: null,
      remoteStream: null,
    };

    this.sdp;
    this.socket = null;
    this.candidates = [];
  }

  componentDidMount = () => {
    this.socket = io.connect('http://192.168.1.104:8080', {
      query: {},
    });

    this.socket.on('connection-success', success => {
      console.log(
        'ok connecttttttttttttttt     ------------------------------------',
        success,
      );
    });

    this.socket.on('request_video_call', sdp => {
      this.sdp = JSON.stringify(sdp);

      // set sdp as remote description
      this.pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    // this.socket.on('candidate', candidate => {
    //   // console.log('From Peer... ', JSON.stringify(candidate))
    //   // this.candidates = [...this.candidates, candidate]
    //   this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    // });

    const pc_config = {
      iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };

    this.pc = new RTCPeerConnection(pc_config);

    this.pc.onicecandidate = e => {
      // send the candidates to the remote peer
      // see addCandidate below to be triggered on the remote peer
      if (e.candidate) {
        // console.log(JSON.stringify(e.candidate))
        this.sendToPeer('candidate', e.candidate);
      }
    };

    // triggered when there is a change in connection state
    this.pc.oniceconnectionstatechange = e => {
      console.log(e);
    };

    this.pc.onaddstream = e => {
      debugger;
      // this.remoteVideoref.current.srcObject = e.streams[0]
      this.setState({
        remoteStream: e.stream,
      });
    };

    const success = stream => {
      console.log(stream.toURL());
      this.setState({
        localStream: stream,
      });
      this.pc.addStream(stream);
    };

    const failure = e => {
      console.log('getUserMedia Error: ', e);
    };

    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      console.log(sourceInfos);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }

      const constraints = {
        audio: true,
        video: {
          mandatory: {
            minWidth: 500, // Provide your own width, height and frame rate here
            minHeight: 300,
            minFrameRate: 30,
          },
          facingMode: isFront ? 'user' : 'environment',
          optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
        },
      };

      mediaDevices.getUserMedia(constraints).then(success).catch(failure);
    });
  };
  sendToPeer = (messageType, payload) => {
    this.socket.emit(messageType, {
      socketID: this.socket.id,
      payload,
    });
  };

  createOffer = () => {
    console.log('Offer');

    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
    // initiates the creation of SDP
    this.pc.createOffer({offerToReceiveVideo: 1}).then(sdp => {
      // console.log(JSON.stringify(sdp))

      // set offer sdp as local description
      this.pc.setLocalDescription(sdp);

      this.sendToPeer('answerCall', sdp);
    });
  };

  createAnswer = () => {
    console.log('Answer');
    this.pc.createAnswer({offerToReceiveVideo: 1}).then(sdp => {
      // console.log(JSON.stringify(sdp))

      // set answer sdp as local description
      this.pc.setLocalDescription(sdp);

      this.sendToPeer('offerOrAnswer', sdp);
    });
  };

  setRemoteDescription = () => {
    // retrieve and parse the SDP copied from the remote peer
    const desc = JSON.parse(this.sdp);

    // set sdp as remote description
    this.pc.setRemoteDescription(new RTCSessionDescription(desc));
  };

  addCandidate = () => {
    // retrieve and parse the Candidate copied from the remote peer
    // const candidate = JSON.parse(this.textref.value)
    // console.log('Adding candidate:', candidate)

    // add the candidate to the peer connection
    // this.pc.addIceCandidate(new RTCIceCandidate(candidate))

    this.candidates.forEach(candidate => {
      console.log(JSON.stringify(candidate));
      this.pc.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  render() {
    const {localStream, remoteStream} = this.state;

    const remoteVideo = remoteStream ? (
      <RTCView
        key={2}
        mirror={true}
        style={{...styles.rtcViewRemote}}
        objectFit="contain"
        streamURL={remoteStream && remoteStream.toURL()}
      />
    ) : (
      <View style={{padding: 15}}>
        <Text style={{fontSize: 22, textAlign: 'center', color: 'white'}}>
          Waiting for Peer connection ...
        </Text>
      </View>
    );

    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor="blue" barStyle={'dark-content'} />
        <View style={{...styles.buttonsContainer}}>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.createOffer}>
              <View style={styles.button}>
                <Text style={{...styles.textContent}}>Call</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={this.createAnswer}>
              <View style={styles.button}>
                <Text style={{...styles.textContent}}>Answer</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{...styles.videosContainer}}>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              bottom: 10,
              right: 10,
              width: 100,
              height: 200,
              backgroundColor: 'black', //width: '100%', height: '100%'
            }}>
            <View style={{flex: 1}}>
              <TouchableOpacity
                onPress={() => localStream._tracks[1]._switchCamera()}>
                <View>
                  <RTCView
                    key={1}
                    zOrder={0}
                    objectFit="cover"
                    style={{...styles.rtcView}}
                    streamURL={localStream && localStream.toURL()}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{...styles.scrollView}}>
            <View
              style={{
                flex: 1,
                width: '100%',
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {remoteVideo}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 5,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  textContent: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  videosContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rtcView: {
    width: 100, //dimensions.width,
    height: 200, //dimensions.height / 2,
    backgroundColor: 'black',
  },
  scrollView: {
    flex: 1,
    // flexDirection: 'row',
    backgroundColor: 'teal',
    padding: 15,
  },
  rtcViewRemote: {
    width: dimensions.width - 30,
    height: 200, //dimensions.height / 2,
    backgroundColor: 'black',
  },
});

export default CallScreen;
