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
function RegisterPhoneActivity(props) {
  const [erroPhone, setErrorPhone] = useState('');
  const [erroPass, setErrorPass] = useState('');
  //state to store email/pass
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
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

  const [data, setData] = useState({
    name: 'Vietnam',
    dialCode: '+84',
    isoCode: 'VN',
    flag: 'https://cdn.kcak11.com/CountryFlags/countries/vn.svg',
  });
  let check = () => {
    let demo = null;
    if (props.route.params.code === undefined) {
      return data.dialCode;
    } else {
      demo = props.route.params.code;

      return demo.dialCode;
    }
  };
  const signInWithPhoneNumber = async phone => {
    const confirm = await auth().signInWithPhoneNumber(phone);
    setConfirm(confirm);
  };
  const confirmOTP = async () => {
    try {
      await confirm.confirm(code);
      alert('Xác thực thành công!');
      AsyncStorage.setItem('phone_register', pass);
      navigate('RegisterPassword');
    } catch (error) {
      alert('Mã OTP không thành công!');
    }
  };

  if (!confirm) {
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
            Nhập số điện thoại của bạn để tạo tài khoản mới
          </Text>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                navigate('CountryPicker');
              }}
              style={{height: 60, width: 80, paddingTop: 20, paddingLeft: 25}}>
              <Text style={{color: 'white'}}>{check()}</Text>
            </TouchableOpacity>
            <TextInput
              onChangeText={text => {
                setPass(text);
              }}
              value={pass}
              placeholder="Nhập số điện thoại của bạn"
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
              // alert(check() + pass);
              // Alert.alert(
              //   'Xác nhận số điện thoại ' + pass,
              //   'Mã kích hoạt sẽ được gửi tới số điện thoại này',
              // );
              // navigate('OTPActivity');
              signInWithPhoneNumber(check() + pass);
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
          Nhập mã otp của bạn để tiếp tục
        </Text>

        <View style={{flexDirection: 'row'}}>
          <TextInput
            onChangeText={text => {
              setCode(text);
            }}
            value={code}
            placeholder="Nhập mã otp của bạn"
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
          onPress={() => confirmOTP()}
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
export default RegisterPhoneActivity;
