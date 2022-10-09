import React, {useState, useEffect} from 'react';
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
// const axios = require('axios').default;
function LoginActivity(props) {
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
  const [account, setAccount] = useState([]);
  handleLogin = () => {
    const url = 'https://halo-chat.herokuapp.com/api/auth/login';
    const method = 'POST';
    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //mot sua lại dang nhap bang sdt
        user_name: phone,
        password: pass,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.data;
        console.log(resJson.data);
        alert(resJson);
        AsyncStorage.setItem('user_id', currentUser._id);
        AsyncStorage.setItem('phone', currentUser.phone);
        AsyncStorage.setItem('user_name', currentUser.user_name);
        // setAccount(resJson.data);
        navigate('UITag');
      });
    // alert(phone + ' ' + pass);
  };
  return (
    <ImageBackground source={images.background_login} style={{flex: 1}}>
      <View
        style={{
          height: 100,
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: 'black',
            marginTop: 10,
            fontSize: fontSizes.h2,
            fontWeight: 'bold',
            paddingLeft: 15,
          }}>
          Phone
        </Text>
        <TextInput
          onChangeText={text => {
            // if(isValidEmail(text)==false){
            //   setEmail('Email not is correct format')
            // }else{
            //   setEmail('')
            // }
            setErrorPhone(
              isValidPhone(text) == true ? '' : 'Phone not is correct format',
            );
            setPhone(text);
          }}
          placeholder="Your Phone"
          placeholderTextColor={colors.placeholder}
          value={phone}
          style={{paddingLeft: 15}}></TextInput>
        <View
          style={{
            backgroundColor: 'black',
            height: 1,
            marginHorizontal: 10,
          }}></View>
        <Text
          style={{
            color: 'red',
            fontSize: 13,
            marginHorizontal: 10,
          }}>
          {erroPhone}
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: 10,
            fontSize: fontSizes.h2,
            fontWeight: 'bold',
            paddingLeft: 15,
          }}>
          Password
        </Text>

        <View style={{flexDirection: 'row'}}>
          <TextInput
            onChangeText={text => {
              setErrorPass(
                isValidPass(text) == true ? '' : 'Pass not is correct format',
              );
              setPass(text);
            }}
            value={pass}
            placeholder="Enter your pass"
            placeholderTextColor={colors.placeholder}
            secureTextEntry={sercuPass}
            style={{paddingLeft: 15}}></TextInput>
          <View style={{flex: 1}}></View>
          {sercuPass == true ? (
            <TouchableOpacity
              style={{alignItems: 'flex-end', marginTop: 15, marginEnd: 15}}
              onPress={() => {
                setSercuPass(false);
              }}>
              <Text>Hiện</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{alignItems: 'flex-end', marginTop: 15, marginEnd: 15}}
              onPress={() => {
                setSercuPass(true);
              }}>
              <Text>Ẩn</Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            backgroundColor: 'black',
            height: 1,
            marginHorizontal: 10,
          }}></View>
        <Text
          style={{
            color: 'red',
            fontSize: 13,
            marginHorizontal: 10,
          }}>
          {erroPass}
        </Text>
        <Text
          style={{
            color: 'black',
            marginTop: 2,
            fontSize: fontSizes.h0,
            alignSelf: 'flex-end',
            marginRight: 15,
          }}>
          Forget password?
        </Text>
        <TouchableOpacity
          disabled={isValidationOk() == false}
          onPress={() => {
            // navigate('UITag');
            this.handleLogin();
          }}
          style={{
            backgroundColor:
              isValidationOk() == true ? '#283238' : colors.disable,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 25,
            margin: 15,
            height: 50,
          }}>
          <Text style={{fontSize: fontSizes.h2, color: colors.second}}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate('RegisterActivity');
          }}>
          <Text
            style={{
              fontSize: fontSizes.h0,
              color: 'black',
              alignSelf: 'center',
            }}>
            Don't have an account? Sign-up
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
export default LoginActivity;
