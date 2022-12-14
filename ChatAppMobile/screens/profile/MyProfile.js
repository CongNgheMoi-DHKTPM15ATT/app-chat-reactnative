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
function MyProfile(props) {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userId, setUser_id] = useState('');
  const BASE_URL = 'http://192.168.43.91:8080/api/user/id';
  const USER_URL = 'http://192.168.43.91:8080/api/user/id';
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_name').then(result => {
      setUsername(result);
    });
    AsyncStorage.getItem('avatar').then(result => {
      setAvatar(result);
    });
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  let handleMyProfile = id => {
    const method = 'POST';
    fetch(BASE_URL, {
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
        navigate('ProfileDetail', {user: resJson});
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  const handleLogout = () => {
    AsyncStorage.clear();

    navigate('LoginActivity');
  };
  return (
    <ScrollView style={{flex: 1}}>
      <UIHeader
        leftIconName={'search'}
        rightIconName={'QR'}
        onPressLeftIcon={() => {
          alert('Left icon');
        }}
        onPressRightIcon={() => {
          alert('Right icon');
        }}></UIHeader>
      <View style={{flex: 13, backgroundColor: '#202124'}}>
        <TouchableOpacity
          onPress={() => handleMyProfile(userId)}
          style={{flexDirection: 'row', margin: 15}}>
          <Image
            source={{
              uri: avatar,
            }}
            style={{
              height: 60,
              width: 60,
              borderRadius: 100,
              marginLeft: 10,
            }}></Image>
          <View style={{flexDirection: 'column', margin: 5}}>
            <Text style={{fontSize: 18, color: 'white', marginLeft: 15}}>
              {username}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'white',
                marginLeft: 15,
                opacity: 0.5,
              }}>
              Xem trang c?? nh??n
            </Text>
          </View>
          <View style={{flex: 1}}></View>
          <Image
            source={images.update}
            style={{height: 25, width: 25, margin: 10}}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: 10, backgroundColor: 'black'}}></View>
      <View
        style={{flex: 20, backgroundColor: '#202124', flexDirection: 'column'}}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            paddingLeft: 25,
            paddingTop: 10,
            marginBottom: 15,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.qr}
              style={{height: 40, width: 40, marginLeft: 5}}
            />
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16}}>Cloud c???a t??i</Text>
              <Text style={{color: 'white', fontSize: 13, opacity: 0.5}}>
                L??u tr??? v?? xu???t tr??nh c??c m?? QR quan tr???ng
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            marginLeft: 80,
          }}></View>
        <TouchableOpacity
          style={{justifyContent: 'center', paddingLeft: 25, paddingTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.cloud2}
              style={{height: 40, width: 40, marginLeft: 5}}
            />
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16}}>Cloud c???a t??i</Text>
              <Text style={{color: 'white', fontSize: 13, opacity: 0.5}}>
                L??u tr??? c??c tin nh???n quan tr???ng
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: 10, backgroundColor: 'black'}}></View>
      <View
        style={{
          flex: 20,
          backgroundColor: '#202124',
          flexDirection: 'column',
        }}>
        <TouchableOpacity style={{padding: 15, marginLeft: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={images.shield} style={{height: 40, width: 40}} />
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16, marginVertical: 10}}>
                T??i kho???n v?? b???o m???t
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            marginLeft: 80,
          }}></View>
        <TouchableOpacity style={{padding: 15, marginLeft: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={images.padlock} style={{height: 40, width: 40}} />
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16, marginVertical: 5}}>
                Quy???n ri??ng t??
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            marginLeft: 80,
          }}></View>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{padding: 15, marginLeft: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={images.logout} style={{height: 35, width: 35}} />
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16, marginVertical: 5}}>
                ????ng xu???t
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 25, backgroundColor: 'black'}}></View>
    </ScrollView>
  );
}
export default MyProfile;
