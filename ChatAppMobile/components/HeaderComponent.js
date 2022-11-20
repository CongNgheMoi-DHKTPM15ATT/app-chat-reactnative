//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
// create a component
const HeaderComponent = ({
  centerText = '',
  rightText = 'DONE',
  leftCustomView = () => {},
  isLeftView = false,
  containerStyle = {},
  rightTextStyle = {},
  onPressRight = () => {},
  isRight = true,
  rightPressActive = true,
  rightImg = '',
}) => {
  return (
    <View>
      {isLeftView ? leftCustomView() : <View />}
      <Text style={styles.centerTextStyle}>{centerText}</Text>
      {isRight ? (
        <TouchableOpacity disabled={rightPressActive} onPress={onPressRight}>
          {rightImg ? (
            <Image source={rightImg} />
          ) : (
            <Text style={{...styles.rightTextStyle, ...rightTextStyle}}>
              {rightText}
            </Text>
          )}
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderColor: 'grey',
    paddingBottom: 12,
    paddingHorizontal: 12,
  },
  centerTextStyle: {
    color: 'black',
    fontFamily: 'bold',
    fontSize: 24,
  },
  rightTextStyle: {
    color: 'grey',
    fontFamily: 'regular',
    fontSize: 18,
  },
});

//make this component available to the app
export default HeaderComponent;
