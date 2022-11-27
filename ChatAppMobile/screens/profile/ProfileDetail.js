import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SectionList,
  ScrollView,
  Animated,
  TouchableHighlight,
  Modal,
  Platform,
  requestCameraPermission,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeader} from '../../components';
import {images} from '../../constants';
import {UIHeaderChat} from '../../components';
import UpdateModel from '../../model/UpdateModel';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};
const optionsCam = {
  title: 'Take Image',
  type: 'capture',
  options: {
    saveToPhotos: true,
    mediaType: 'photo',
    includeBase64: false,
  },
};
function ProfileDetail(props) {
  const BASE_URL = 'http://192.168.1.104:8080/api/user/send-friend-request';
  const USER_URL = 'http://192.168.1.104:8080/api/user/id';
  const {navigate, goBack} = props.navigation;
  const [userId, setUser_id] = useState('');
  // const [conversation, setConversation] = useState('');
  // const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');
  // const [status, setStatus] = useState('');
  const [modalOpen, setModal] = useState(false);
  let {_id, user_name, phone, avatar, conversation, status} =
    props.route.params.user;

  const scrollA = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });

  handleRequestAddFriend = id => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        receiver_id: id,
      }),
    })
      .then(res => res.json())
      .then(resJson => {})
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => navigate('UITag'));
  };
  handlerSetModel = () => {
    setModal(true);
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const images = await launchCamera(optionsCam);
        const formData = new FormData();
        formData.append('img', {
          uri: images.assets[0].uri,
          type: images.assets[0].type,
          name: images.assets[0].fileName,
        });
        await fetch('https://codejava-app-anime.herokuapp.com/upload', {
          method: 'PUT',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => res.json())
          .then(async resJson => {
            await fetch('http://192.168.1.104:8080/api/user/update', {
              method: 'POST',
              body: JSON.stringify({
                _id: _id,
                data: {
                  avatar: resJson.pathVideo,
                },
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }).then(resJson => AsyncStorage.setItem('avatar', resJson.avatar));
          })
          .catch(resJson => {
            console.log(resJson);
          })
          .finally();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const handleChooseFormLir = async () => {
    const images = await launchImageLibrary(options);
    // console.log(images.assets[0]);
    const formData = new FormData();
    formData.append('img', {
      uri: images.assets[0].uri,
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });
    await fetch('https://codejava-app-anime.herokuapp.com/upload', {
      method: 'PUT',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(async resJson => {
        await fetch('http://192.168.1.104:8080/api/user/update', {
          method: 'POST',
          body: JSON.stringify({
            _id: _id,
            data: {
              avatar: resJson.pathVideo,
            },
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      })
      .catch(resJson => {
        // console.log(resJson);
        AsyncStorage.setItem('avatar', resJson.avatar);
      })
      .finally();
  };
  let handleMyProfile = id => {
    const method = 'POST';
    fetch(USER_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        navigate('UpdateProfile', {user: resJson});
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  return (
    <View style={{flex: 100, backgroundColor: 'black'}}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}>
        <UIHeaderChat
          scrollA={scrollA}
          leftIconName={'search'}
          rightIconName={'back'}
          color={'opacity'}
          onPressLeftIcon={() => {
            goBack();
          }}
          onPressRightIcon={() => {
            alert('okkkkkkk');
          }}
          onPressPhoneRightIcon={() => {
            joinRoom();
            navigate('CallScreen');
            // alert('ok');
          }}
          onPressVideoRightIcon={() => {
            alert('ok');
          }}></UIHeaderChat>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{
              borderColor: 'black',
            }}>
            {/* <View style={styles.bannerContainer}> */}
            <Animated.Image
              style={styles.banner(scrollA)}
              source={{uri: avatar}}
            />
            {/* </View> */}
            {status === 'FRIENDED' ? (
              <Image
                source={{uri: avatar}}
                style={{
                  zIndex: 3,
                  position: 'absolute',
                  marginTop: -60,
                  height: 120,
                  width: 120,
                  borderRadius: 100,
                  borderColor: 'black',
                  borderWidth: 2,
                  alignSelf: 'center',
                }}></Image>
            ) : status === null ? (
              <TouchableOpacity>
                <Image
                  source={{uri: avatar}}
                  style={{
                    zIndex: 3,
                    position: 'absolute',
                    marginTop: -60,
                    height: 120,
                    width: 120,
                    borderRadius: 100,
                    borderColor: 'black',
                    borderWidth: 2,
                    alignSelf: 'center',
                  }}></Image>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => handlerSetModel()}
                style={{zIndex: 2}}>
                <Image
                  source={{uri: avatar}}
                  style={{
                    zIndex: 3,
                    position: 'absolute',
                    marginTop: -60,
                    height: 120,
                    width: 120,
                    borderRadius: 100,
                    borderColor: 'black',
                    borderWidth: 2,
                    alignSelf: 'center',
                  }}></Image>
              </TouchableOpacity>
            )}
            <Text
              style={{
                paddingHorizontal: 100,
                paddingTop: 380,
                position: 'absolute',
                alignSelf: 'center',
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                padding: 0,
              }}>
              {user_name}
            </Text>
            {status == 'FRIENDED' ? (
              <Text
                style={{
                  paddingTop: 420,
                  position: 'absolute',
                  alignSelf: 'center',
                  margin: 15,
                  fontSize: 15,
                  color: 'white',
                  padding: 0,
                  textAlign: 'center',
                }}>
                {user_name} chưa có hoạt động nào. Hãy trò chuyện để hiểu nhau
                hơn
              </Text>
            ) : status === null ? (
              <Text
                style={{
                  paddingTop: 420,
                  position: 'absolute',
                  alignSelf: 'center',
                  margin: 15,
                  fontSize: 15,
                  color: 'white',
                  padding: 0,
                  textAlign: 'center',
                }}>
                Kết bạn để tìm hiểu nhau hơn
              </Text>
            ) : (
              <TouchableOpacity onPress={() => handleMyProfile(userId)}>
                <Text
                  style={{
                    paddingTop: 100,
                    alignSelf: 'center',
                    margin: 15,
                    fontSize: 15,
                    color: 'white',
                    padding: 0,
                    zIndex: 3,
                    textAlign: 'center',
                  }}>
                  Cập nhật giới thiệu bản thân
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={{flex: 30}}>
          <View style={{flexDirection: 'row', height: '100%', width: '100%'}}>
            <View
              style={{
                width: '50%',
                zIndex: -1,
              }}>
              {status === null ? (
                <TouchableOpacity
                  onPress={() => {
                    handleRequestAddFriend(_id);
                  }}
                  style={{
                    marginLeft: 230,
                    marginTop: 300,
                    borderColor: 'white',
                    borderWidth: 0.5,
                    height: 35,
                    width: '60%',
                    borderRadius: 100,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={images.adduser}
                    style={{
                      height: 20,
                      width: 20,
                      marginHorizontal: 6,
                      marginTop: 5,
                    }}></Image>
                  <Text
                    style={{
                      color: 'white',
                      marginRight: 10,
                      alignSelf: 'center',
                    }}>
                    Kết bạn
                  </Text>
                </TouchableOpacity>
              ) : status == 'FRIENDED' ? (
                <TouchableOpacity
                  style={{
                    marginLeft: 230,
                    marginTop: 300,
                    borderColor: 'white',
                    borderWidth: 0.5,
                    height: 35,
                    width: '60%',
                    borderRadius: 100,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={images.mess}
                    style={{
                      height: 20,
                      width: 20,
                      marginHorizontal: 6,
                      marginTop: 5,
                    }}></Image>
                  <Text
                    style={{
                      color: 'white',
                      marginRight: 10,
                      alignSelf: 'center',
                    }}>
                    Nhắn tin
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    marginLeft: 230,
                    marginTop: 300,
                    borderColor: 'white',
                    borderWidth: 0.5,
                    height: 35,
                    width: '60%',
                    borderRadius: 100,
                    justifyContent: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={images.mess}
                    style={{
                      height: 20,
                      width: 20,
                      marginHorizontal: 6,
                      marginTop: 5,
                    }}></Image>
                  <Text
                    style={{
                      color: 'white',
                      marginRight: 10,
                      alignSelf: 'center',
                    }}>
                    Đăng lên nhật ký
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Modal
        style={{
          justifyContent: 'center',
        }}
        transparent={true}
        visible={modalOpen}
        animationType="fade">
        <UpdateModel
          data={avatar}
          idUser={_id}
          onPress={() => {
            setModal(false);
          }}
          onPressCamera={() => {
            requestCameraPermission();
          }}
          onPressChoose={() => {
            handleBlockFriend();
          }}
          onPressChooseFormLir={() => {
            handleChooseFormLir();
          }}
          onPressView={() => {
            handleBlockFriend();
          }}></UpdateModel>
      </Modal>
    </View>
  );
}
const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: -1,
  },
  banner: scrollA => ({
    height: 300,
    width: '100%',
    zIndex: -1,
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-300, 0, 300, 300 + 1],
          outputRange: [-300 / 2, 0, 300 * 0.75, 300 * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-300, 0, 300, 300 + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};
export default ProfileDetail;
