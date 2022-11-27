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
  Platform,
  requestCameraPermission,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeader} from '../../components';
import {images} from '../../constants';
import {UIHeaderChat} from '../../components';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
function ProfileDetail(props) {
  const BASE_URL = 'http://192.168.43.91:8080/api/user/update';
  const {navigate, goBack} = props.navigation;
  const [userId, setUser_id] = useState('');
  const [background, setBackground] = useState('');
  const [modalOpen, setModal] = useState(false);
  let {_id, user_name, phone, avatar, conversation, status, birth_day} =
    props.route.params.user;
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState(birth_day);
  const [textName, setTextName] = useState(user_name);
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  let handleUpdate = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: userId,
        data: {
          user_name: textName,
          birth_day: textDate,
        },
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        // console.log('demo day nha: ', currentUser.members);
        //  currentUserRequests.map(req=>{
        //   if (req==) {

        //   }
        //  })
        alert('Cập nhật thông tin thành công!');
        AsyncStorage.setItem('user_name', resJson.user_name);
      })
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(setModalVisible(false));
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();
    setTextDate(fDate);
    setShow(false);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  return (
    <View style={{flex: 50, backgroundColor: 'black'}}>
      <ScrollView>
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
            height: 250,
            backgroundColor: 'red',
            width: '100%',
          }}>
          <View
            style={{
              borderColor: 'black',
            }}>
            {/* <View style={styles.bannerContainer}> */}
            <Image
              source={{uri: avatar}}
              style={{height: 250, width: '100%'}}
            />
          </View>
          <TouchableOpacity>
            <Image
              source={{uri: avatar}}
              style={{
                height: 100,
                width: 100,
                borderRadius: 100,
                marginTop: -110,
                borderColor: 'black',
                borderWidth: 2,
                paddingRight: 100,
              }}></Image>
          </TouchableOpacity>

          <Text
            style={{
              paddingHorizontal: 100,
              paddingTop: 200,
              position: 'absolute',
              alignSelf: 'center',
              fontSize: 20,
              color: 'white',
              fontWeight: 'bold',
              padding: 0,
            }}>
            {user_name}
          </Text>
        </View>
        <View style={{height: 350}}>
          <Text style={{color: 'white', padding: 10}}>Thông tin cá nhân</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', padding: 10}}>Ngày sinh</Text>
            <Text style={{color: 'white', padding: 10}}>{birth_day}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', padding: 10}}>Điện thoại</Text>
            <Text style={{color: 'white', padding: 10}}>{phone}</Text>
          </View>
          <TouchableOpacity
            onPress={() => setModalVisible(!isModalVisible)}
            style={{
              height: 40,
              width: 300,
              backgroundColor: 'gray',
              borderRadius: 30,
              alignItems: 'center',
              marginLeft: 30,
            }}>
            <Text style={{color: 'white', alignSelf: 'center', paddingTop: 10}}>
              Chỉnh sửa
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        style={{
          height: 10,
          marginTop: 20,
          marginLeft: 0,
          marginBottom: 50,
          width: '100%',
        }}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{}}>
          <Text style={{color: 'white', alignSelf: 'center'}}>
            Chỉnh sửa thông tin
          </Text>
          <TextInput
            onChangeText={text => setTextName(text)}
            value={textName}
            style={{
              color: 'white',
              marginHorizontal: 15,
              marginVertical: 5,
              height: 70,
              width: 300,
              borderRadius: 50,
              padding: 25,
              backgroundColor: 'gray',
            }}></TextInput>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => showMode('date')}
              style={{
                height: 60,
                width: 300,
                marginHorizontal: 15,
                marginVertical: 5,
                borderRadius: 50,
                padding: 10,
                backgroundColor: 'gray',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'white',
                  marginHorizontal: 15,
                  marginVertical: 5,
                }}>
                {textDate}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={images.celendar}
                style={{
                  height: 30,
                  width: 30,
                  marginLeft: -60,
                  marginTop: 20,
                  zIndex: 2,
                  position: 'absolute',
                }}></Image>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleUpdate()}
            style={{
              flexDirection: 'row',
              marginHorizontal: 15,
              marginVertical: 5,
              padding: 10,
              height: 60,
              width: 300,
              borderRadius: 50,
              padding: 10,
              backgroundColor: '#309CE4',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                marginHorizontal: 15,
                marginVertical: 5,
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'center',
                alignItems: 'center',
              }}>
              Lưu
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}></DateTimePicker>
      )}
    </View>
  );
}

export default ProfileDetail;
