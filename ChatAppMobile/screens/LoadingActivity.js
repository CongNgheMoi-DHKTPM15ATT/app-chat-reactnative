import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {colors, fontSizes} from '../constants';
function LoadingActivity(props) {
  return (
    <View
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
    </View>
  );
}
export default LoadingActivity;
