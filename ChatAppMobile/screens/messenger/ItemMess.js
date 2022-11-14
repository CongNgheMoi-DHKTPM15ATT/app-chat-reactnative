import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';
import ImageView from 'react-native-image-view';
import {images} from '../../constants';
import {screenWidth, screenHeight} from '../../utils/Device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MessengerModel from '../../model/MessengerModel';
import moment from 'moment-feiertage';
function ItemMess(props) {
  let {
    content,
    sender,
    createdAt,
    url,
    isSender,
    messenger,
    timeSend,
    showUrl,
    content_type,
    _id,
  } = props.item;
  const {onPress, onLongPress} = props;
  const {index} = props;
  const {title} = props;
  const [modalOpen, setModal] = useState(false);
  // const BASE_URL = 'http://192.168.43.91:8080/api/messages/recover';
  const BASE_URL = 'http://192.168.1.104:8080/api/messages/recover';
  var formattedDate = moment(createdAt).utc().format('MM/DD/YY h:mm a');
  var formattedDateOfCreateAt = moment(createdAt).utc().format('MM/DD/YY');
  getTimeOnChat = () => {
    if (new Date().toISOString() !== createdAt) {
      console.log(new Date());
      if (formattedDateOfCreateAt == formattedDateOfCreateAt) {
        return (formattedDateOfCreateAt = moment(createdAt)
          .utc()
          .format('h:mm a '));
      } else
        return (formattedDate = moment(createdAt)
          .utc()
          .format('h:mm a MM/DD/YY'));
    } else {
      return (formattedDate = moment(createdAt).utc().format('h:mm a'));
    }
  };
  useEffect(() => {
    //get user_name
    AsyncStorage.setItem('account-send', sender != null ? sender.user_id : '');
    AsyncStorage.setItem('name-send', title);
    // AsyncStorage.setItem('account-receiver', receiver._id);
  });

  //ham xoa tin nhan
  const removeMess = () => {
    const method = 'POST';
    fetch(BASE_URL, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then(res => res.json())
      .then(resJson => {})
      .catch(resJson => {
        console.log(resJson);
      })
      .finally(() => setModal(false));
  };

  return sender == null || sender.nick_name == title ? (
    <TouchableOpacity
      onLongPress={() => {
        setModal(true);
      }}
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
      }}>
      {/* {showUrl == true ? ( */}
      {content_type == 'notification' ? (
        <View
          style={{
            height: 50,
            width: 20,
            borderRadius: 100,
            marginRight: 15,
            marginStart: 10,
            resizeMode: 'cover',
          }}></View>
      ) : (
        <Image
          source={{uri: sender != null ? sender.avatar : ''}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            marginRight: 15,
            marginStart: 10,
            resizeMode: 'cover',
          }}></Image>
      )}

      {/* ) : (
        <View style={{width: 40, height: 40}}></View>
      )} */}
      <Text
        style={{
          color: 'white',
          paddingVertical: 5,
          fontSize: 5,
          width: 60,
          borderRadius: 10,
        }}>
        {getTimeOnChat()}
      </Text>
      <View style={{width: screenWidth * 0.7, flexDirection: 'row'}}>
        <View>
          {content_type != 'image' ? (
            <Text
              style={{
                color: 'white',
                paddingVertical: 5,
                paddingHorizontal: 7,
                backgroundColor: '#202124',
                borderRadius: 10,
              }}>
              {content}
            </Text>
          ) : (
            <View style={{backgroundColor: 'white', flex: 1}}>
              <TouchableOpacity>
                <Image
                  source={{
                    uri: `${content}`,
                  }}
                  style={{height: 200, left: 0, right: 0}}
                  resizeMode="contain"></Image>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={{width: 20}}></View>
      </View>
    </TouchableOpacity>
  ) : (
    //Nay la nguoi nhan sender
    <TouchableOpacity
      onLongPress={() => {
        setModal(true);
      }}
      style={{
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: screenWidth * 0.8,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <View>
          <View style={{width: 80}}>
            <Text
              style={{
                color: 'white',
                paddingVertical: 5,
                paddingHorizontal: 7,
                borderRadius: 10,
                fontSize: 10,
              }}>
              {getTimeOnChat()}
            </Text>
          </View>
          <View>
            {content_type != 'image' ? (
              <Text
                style={{
                  color: 'white',
                  paddingVertical: 5,
                  paddingHorizontal: 7,
                  backgroundColor: '#202124',
                  borderRadius: 10,
                }}>
                {content}
              </Text>
            ) : (
              <View style={{backgroundColor: 'white', flex: 1}}>
                <TouchableOpacity>
                  <Image
                    source={{
                      uri: `${content}`,
                    }}
                    style={{height: 150, width: 350, left: 0, right: 0}}
                    resizeMode="contain"></Image>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      {/* {showUrl == true ? ( */}
      {content_type == 'notification' ? (
        <View
          style={{
            height: 50,
            borderRadius: 100,
            resizeMode: 'cover',
          }}></View>
      ) : (
        <Image
          source={{uri: sender != null ? sender.avatar : ''}}
          style={{
            height: 50,
            width: 50,
            borderRadius: 100,
            marginRight: 15,
            marginStart: 10,
            resizeMode: 'cover',
          }}></Image>
      )}
      {/* ) : (
        <View style={{width: 40, height: 40}}></View>
      )} */}
      <Modal
        style={{
          justifyContent: 'center',
        }}
        transparent={true}
        visible={modalOpen}
        animationType="fade">
        <MessengerModel
          data={_id}
          onPress={() => {
            setModal(false);
          }}
          onPressDelete={() => {
            removeMess();
          }}></MessengerModel>
      </Modal>
    </TouchableOpacity>
  );
}
export default ItemMess;
