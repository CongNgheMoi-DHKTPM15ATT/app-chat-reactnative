import React, {useState, useEffect, useContext} from 'react';
import {images, fontSizes, colors} from '../constants';
import {isValidPhone, isValidPass} from '../utils/Validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import setupFirebase from '../setup';
function RegisterPassword(props) {
  const [erroPhone, setErrorPhone] = useState('');
  const [erroPass, setErrorPass] = useState('');
  //state to store email/pass
  const [pass, setPass] = useState('');
  const [user_name, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [sercuPass, setSercuPass] = useState(true);
  const {auth} = setupFirebase();
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [userId, setUser_id] = useState('');
  const isValidationOk = () =>
    phone.length > 0 &&
    pass.length > 0 &&
    isValidPhone(phone) == true &&
    isValidPass(pass) == true;
  useEffect(() => {
    AsyncStorage.getItem('name_register').then(result => {
      setUserName(result);
    });
    AsyncStorage.getItem('phone_register').then(result => {
      setPhone(result);
    });
  });
  const handleRegister = () => {
    const url = 'http://192.168.43.91:8080/api/auth/register';
    const method = 'POST';
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: user_name,
        password: pass,
        phone: phone,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        handleLogin();
      });
    // alert(phone + ' ' + pass);
  };
  let handleLogin = () => {
    // const url = 'https://halo-chat.herokuapp.com/api/auth/login';
    // http://localhost:8080/api/auth/login
    // const url = 'http://192.168.43.91:8080/api/auth/login';
    const url = 'http://192.168.43.91:8080/api/auth/login';
    const method = 'POST';
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //mot sua l???i dang nhap bang sdt
        phone: phone,
        password: pass,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.data;
        alert(resJson.message);
        AsyncStorage.setItem('avatar', currentUser.avatar);
        AsyncStorage.setItem('phone', currentUser.phone);
        AsyncStorage.setItem('user_name', currentUser.user_name);
        AsyncStorage.setItem('user_id', currentUser._id);
        setUser_id(currentUser._id);
        // setAccount(resJson.data);
        navigate('UITag');
      })
      .catch(resJson => {
        alert(resJson.message);
      });
    // alert(phone + ' ' + pass);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {/* <Text>{val}</Text> */}
      <View
        style={{
          height: 50,
          backgroundColor: 'gray',
          flexDirection: 'row',
          alignContent: 'center',
        }}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            source={images.back}
            style={{height: 25, width: 25, margin: 10}}></Image>
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            marginTop: 10,
            fontSize: fontSizes.h1,
            paddingLeft: 15,
          }}>
          T???o t??i kho???n
        </Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            color: 'white',
            marginTop: 10,
            fontSize: fontSizes.h1,
            paddingLeft: 15,
          }}>
          Nh???p n???t m???t kh???u c???a b???n ????? t???o t??i kho???n m???i
        </Text>

        <View style={{flexDirection: 'row'}}>
          <TextInput
            onChangeText={text => {
              setPass(text);
            }}
            value={pass}
            placeholder="Nh???p m???t kh???u c???a b???n"
            placeholderTextColor="gray"
            secureTextEntry={sercuPass}
            style={{paddingLeft: 15, color: 'white'}}></TextInput>
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: 340,
          marginHorizontal: 10,
          backgroundColor: 'blue',
        }}></View>
      <View style={{flexDirection: 'row', top: 380, padding: 10}}>
        <Text
          style={{
            color: 'white',
            marginTop: 10,
            fontSize: fontSizes.h0,
            paddingLeft: 15,
            width: 250,
          }}>
          Ti???p t???c ngh??a l?? b???n ?????ng ?? v???i c??c ??i???u kho???n s??? d???ng Zalo
        </Text>
        <View style={{flex: 1}}></View>
        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
          style={{
            height: 60,
            width: 60,
            backgroundColor: 'gray',
            borderRadius: 100,
            alignContent: 'center',
          }}>
          <Image
            source={images.next}
            style={{
              height: 30,
              width: 30,
              alignSelf: 'center',
              margin: 15,
            }}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default RegisterPassword;
