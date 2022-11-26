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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
function RegisterActivity(props) {
  //state for validating
  const [erroPhone, setErrorPhone] = useState('');
  const [erroPass, setErrorPass] = useState('');
  //state to store email/pass
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [sercuPass, setSercuPass] = useState(true);
  const isValidationOk = () =>
    phone.length > 0 &&
    pass.length > 0 &&
    isValidPhone(phone) == true &&
    isValidPass(pass) == true;
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  // handleRegister = () => {
  //   const url = 'http://192.168.1.104:8080/api/auth/register';
  //   const method = 'POST';
  //   fetch(url, {
  //     method,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       phone: phone,
  //       password: pass,
  //     }),
  //   })
  //     .then(res => res.json())
  //     .then(resJson => {
  //       console.log(resJson.data);
  //       goBack();
  //     });
  //   // alert(phone + ' ' + pass);
  // };
  const handleSaveName = () => {
    AsyncStorage.setItem('name_register', pass);
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
          Tên zalo
        </Text>
        <View style={{flexDirection: 'column'}}>
          <TextInput
            onChangeText={text => {
              setPass(text);
            }}
            value={pass}
            placeholder="Gồm 2-40 kí tự"
            placeholderTextColor="gray"
            style={{paddingLeft: 15, color: 'white'}}></TextInput>
          <View
            style={{
              height: 1,
              width: 340,
              marginHorizontal: 10,
              backgroundColor: 'blue',
            }}></View>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              fontSize: fontSizes.h0,
              paddingLeft: 15,
            }}>
            Lưu ý khi đặt tên:
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              fontSize: fontSizes.h0,
              paddingLeft: 15,
            }}>
            * Không vi phạm Quy định đặt tên trên Zalo
          </Text>
          <Text
            style={{
              color: 'white',
              marginTop: 10,
              fontSize: fontSizes.h0,
              paddingLeft: 15,
            }}>
            * Nên sử dụng tên thật để giúp bạn bè dễ nhận ra bạn
          </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', top: 300, padding: 10}}>
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
            handleSaveName();
            navigate('RegisterPhoneActivity', {code: undefined});
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
export default RegisterActivity;
