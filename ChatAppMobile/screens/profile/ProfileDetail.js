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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeader} from '../../components';
import {images} from '../../constants';
import {UIHeaderChat} from '../../components';
function ProfileDetail(props) {
  const BASE_URL = 'http://192.168.1.104:8080/api/user/send-friend-request';
  const {navigate, goBack} = props.navigation;
  const [userId, setUser_id] = useState('');
  // const [conversation, setConversation] = useState('');
  // const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');
  // const [status, setStatus] = useState('');

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
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderColor: 'black',
            }}>
            {/* <View style={styles.bannerContainer}> */}
            <Animated.Image
              style={styles.banner(scrollA)}
              source={{uri: avatar}}
            />
            {/* </View> */}
            <Image
              source={{uri: avatar}}
              style={{
                zIndex: 3,
                position: 'absolute',
                marginTop: 230,
                height: 120,
                width: 120,
                borderRadius: 100,
                borderColor: 'black',
                borderWidth: 2,
                alignSelf: 'center',
              }}></Image>
            <Text
              style={{
                paddingHorizontal: 100,
                paddingTop: 350,
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
                  paddingTop: 400,
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
            ) : status == null ? (
              <Text
                style={{
                  paddingTop: 400,
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
              <Text
                style={{
                  paddingTop: 400,
                  position: 'absolute',
                  alignSelf: 'center',
                  margin: 15,
                  fontSize: 15,
                  color: 'white',
                  padding: 0,
                  textAlign: 'center',
                }}>
                Cập nhật giới thiệu bản thân
              </Text>
            )}
          </View>
        </View>
        <View style={{flex: 30}}>
          <View style={{flexDirection: 'row', height: '100%', width: '100%'}}>
            <View
              style={{
                height: '100%',
                width: '50%',
              }}>
              {status == null ? (
                <TouchableOpacity
                  onPress={() => {
                    handleRequestAddFriend(_id);
                  }}
                  style={{
                    marginLeft: 230,
                    marginTop: 530,
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
                    marginTop: 530,
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
                    marginTop: 530,
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
                    Kết bạn
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: 300,
    width: '200%',
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
