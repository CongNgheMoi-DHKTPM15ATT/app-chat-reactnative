import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeader} from '../../components';
import {images} from '../../constants';
import {UIHeaderChat} from '../../components';
function ProfileDetail(props) {
  const {navigate, goBack} = props.navigation;
  const [username, setUsername] = useState('');
  // const [conversation, setConversation] = useState('');
  // const [avatar, setAvatar] = useState('');
  const [background, setBackground] = useState('');
  // const [status, setStatus] = useState('');
  let {_id, user_name, phone, avatar, conversation, status} =
    props.route.params.user;

  // useEffect(() => {
  //   //get user_name
  //   AsyncStorage.getItem('user_name_search').then(result => {
  //     setUsername(result);
  //   });
  //   AsyncStorage.getItem('avatar_search').then(result => {
  //     setAvatar(result);
  //   });
  //   AsyncStorage.getItem('avatar_search').then(result => {
  //     setBackground(result);
  //   });
  //   AsyncStorage.getItem('conversation').then(result => {
  //     setConversation(result);
  //   });
  //   AsyncStorage.getItem('status_search').then(result => {
  //     setStatus(result);
  //     console.log('abcd: ', result);
  //   });
  // });
  return (
    <ScrollView style={{flex: 100, backgroundColor: 'black'}}>
      <UIHeaderChat
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
          <Image
            source={{uri: avatar}}
            style={{
              position: 'absolute',
              height: 300,
              width: '100%',
              alignSelf: 'center',
            }}></Image>
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
              {user_name} chưa có hoạt động nào. Hãy trò chuyện để hiểu nhau hơn
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
                style={{
                  marginLeft: 230,
                  marginTop: 530,
                  height: 35,
                  width: '60%',
                  borderRadius: 100,
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    color: 'white',
                    marginRight: 10,
                    alignSelf: 'center',
                  }}></Text>
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
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default ProfileDetail;
