import React, {useState, useEffect, useContext} from 'react';
import {images, fontSizes, colors} from '../constants';
import {isValidPhone, isValidPass} from '../utils/Validation';
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
    const url = 'http://192.168.1.104:8080/api/auth/register';
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
        console.log(resJson.data);
        goBack();
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
          Tạo tài khoản
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
          Nhập nốt mật khẩu của bạn để tạo tài khoản mới
        </Text>

        <View style={{flexDirection: 'row'}}>
          <TextInput
            onChangeText={text => {
              setPass(text);
            }}
            value={pass}
            placeholder="Nhập mật khẩu của bạn"
            placeholderTextColor="gray"
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
          Tiếp tục nghĩa là bạn đồng ý với các điều khoản sử dụng Zalo
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
