import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images} from '../../../constants';
import moment from 'moment-feiertage';
function ItemUser(props) {
  const {user_name, _id, friends, avatar} = props.data;
  const [nameGroup, setNameGroup] = useState('');
  const [userId, setUser_id] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  // const BASE_URL = 'http://192.168.1.104:8080/api/conversaion/create-group';
  const BASE_URL = 'http://192.168.1.104:8080/api/conversaion/create-group';
  useEffect(() => {
    //get user_name
    AsyncStorage.getItem('name_group').then(result => {
      setNameGroup(result);
    });
    AsyncStorage.getItem('user_id').then(result => {
      setUser_id(result);
    });
  });
  //add user to group
  const handleAddTask = async () => {
    // taskItems.push({avatar});

    // taskItems.push({avatar, _id});

    // setTaskItems(current => [...current, {avatar}]);

    // const arr = [...taskItems];
    // arr.push({avatar, _id});

    // setTaskItems(arr);
    // console.log('task éc éc: ', taskItems);
    // AsyncStorage.setItem('task', JSON.stringify(taskItems));
    // AsyncStorage.getItem('task').then(result => {
    //   setTaskItems(current => [...current, result]);
    //   console.log('éc éc: ', taskItems);
    // });

    var tmp = [{_id}];
    taskItems.map(user => {
      tmp.push(user._id);
    });
    console.log('éc éc: ', taskItems);
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: tmp,
        group_name: nameGroup,
        admin_id: userId,
      }),
    })
      .then(res => res.json())
      .then(resJson => {
        const currentUser = resJson.conversations;
        console.log(currentUser);
        setChat(currentUser);
      })
      .catch(resJson => {
        console.log(resJson);
      });
    socket.emit('requestLoadConver', {user: tmp});
  };
  const completeTask = index => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  return (
    <TouchableOpacity
      onPress={() => handleAddTask()}
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
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          fontSize: 16,
          color: 'white',
          width: 150,
        }}>
        {user_name}
      </Text>
      <View style={{flex: 1}}></View>
    </TouchableOpacity>
  );
}
export default ItemUser;
