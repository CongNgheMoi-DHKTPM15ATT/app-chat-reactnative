//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const HorizontalLine = ({lineStyle = {}}) => {
  return <View style={{...styles.lineStyle, ...lineStyle}} />;
};

// define your styles
const styles = StyleSheet.create({
  lineStyle: {
    borderBottomWidth: 0.6,
    borderBottomColor: 'grey',
    height: 1,
  },
});

//make this component available to the app
export default HorizontalLine;
