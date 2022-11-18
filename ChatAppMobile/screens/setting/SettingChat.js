import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import ItemImage from './ItemImage';
function SettingChat(props) {
  const [isActive, setIsActive] = useState(false);
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [imagesMess, setImagesMess] = useState([]);
  let _id = props.route.params.id;
  const BASE_URL = 'http://192.168.1.104:8080/api/messages/content-type-top-4';
  useEffect(() => {
    getImage();
  }, []);
  const getImage = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_id: _id,
        content_type: 'image',
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson;
        setImagesMess(currentUser);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally();
  };
  handleImageAll = () => {
    alert('okkk');
  };
  return (
    <View style={{flex: 1}}>
      <UIHeaderChat
        title={'Tùy chọn'}
        leftIconName={'search'}
        onPressLeftIcon={() => {
          goBack();
        }}
        onPressRightIcon={() => {
          navigate('SettingChat');
        }}
        onPressPhoneRightIcon={() => {
          joinRoom();
          navigate('CallScreen');
          // alert('ok');
        }}
        onPressVideoRightIcon={() => {
          alert('ok');
        }}></UIHeaderChat>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#252526',
            height: 250,
            alignItems: 'center',
          }}>
          <Image
            source={images.avatar}
            style={{
              height: 90,
              width: 90,
              borderRadius: 100,
              marginTop: 10,
            }}></Image>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'space-between',
              marginTop: 15,
            }}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  height: 50,
                  width: 50,
                  backgroundColor: 'gray',
                  marginHorizontal: 15,
                  borderRadius: 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.icon_search}
                  style={{height: 24, width: 24}}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: 55,
                }}>
                Tìm tin nhắn
              </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  height: 50,
                  width: 50,
                  backgroundColor: 'gray',
                  marginHorizontal: 15,
                  borderRadius: 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.account}
                  style={{height: 24, width: 24}}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: 55,
                }}>
                Trang cá nhân
              </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  height: 50,
                  width: 50,
                  backgroundColor: 'gray',
                  marginHorizontal: 15,
                  borderRadius: 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.camera}
                  style={{height: 24, width: 24}}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: 55,
                }}>
                Đổi hình nền
              </Text>
            </View>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  height: 50,
                  width: 50,
                  backgroundColor: 'gray',
                  marginHorizontal: 15,
                  borderRadius: 100,
                  alignItems: 'center',
                }}>
                <Image
                  source={images.notification}
                  style={{height: 24, width: 24}}></Image>
              </TouchableOpacity>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  width: 60,
                }}>
                Tắt thông báo
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: '#252526',
            height: 130,
            marginTop: 10,
            alignContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              padding: 10,
              marginHorizontal: 15,
              borderRadius: 100,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <Image
              source={images.cloud2}
              style={{height: 30, width: 30}}></Image>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  padding: 5,
                  fontSize: 18,
                  paddingHorizontal: 20,
                }}>
                Ảnh, link, file đã gửi
              </Text>
              <View style={{flexDirection: 'row'}}>
                <FlatList
                  horizontal={true}
                  data={imagesMess}
                  renderItem={({item, index}) => (
                    <ItemImage
                      data={item}

                      // onPress={() => {
                      //   // alert(`name is: ${item._id}`);
                      //   getMessById(item._id);
                      //   navigate('Messenger', {users: chat});
                      // }}
                    />
                  )}
                  keyExtractor={eachChat => eachChat._id}
                  key={eachChat => eachChat._id}
                />
                <TouchableOpacity
                  onPress={() => handleImageAll()}
                  style={{
                    padding: 10,
                    height: 50,
                    width: 50,
                    backgroundColor: 'gray',
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={images.camera}
                    style={{height: 24, width: 24}}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
export default SettingChat;
