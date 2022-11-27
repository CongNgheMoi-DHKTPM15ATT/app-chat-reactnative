import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors, fontSizes} from '../constants';
function LoadingActivity(props) {
  const [myUser, setMyUser] = useState('');
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  useEffect(() => {
    AsyncStorage.getItem('jwt_token').then(result => {
      setMyUser(result);
    });
    // alert(myUser);
    if (myUser != null) {
      setTimeout(() => {
        navigate('UITag');
      }, 5000);
      return;
    } else {
      setTimeout(() => {
        navigate('LoginActivity');
      }, 5000);
      return;
    }
  });
  return (
    <TouchableOpacity
      onPress={() => {
        navigate('LoginActivity');
      }}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: fontSizes.h8,
          alignSelf: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>
        NULO
      </Text>
    </TouchableOpacity>
  );
}
export default LoadingActivity;
