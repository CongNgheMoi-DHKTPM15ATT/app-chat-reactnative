import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  BackHandler,
  Dimensions,
  Modal,
} from 'react-native';
function Task(props) {
  const {avatar} = props.text;

  return (
    <View>
      <TouchableOpacity
        style={{
          height: 80,
          backgroundColor: '#252526',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: avatar}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            margin: 15,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default Task;
