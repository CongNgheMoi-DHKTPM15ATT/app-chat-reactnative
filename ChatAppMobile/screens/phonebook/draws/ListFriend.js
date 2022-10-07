import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SectionList,
  ScrollView,
} from 'react-native';
import {images} from '../../../constants';
import ItemFriend from './ItemFriend';
function ListFriend(props) {
  const [friends, setFriend] = useState([
    {
      title: 'A',
      data: [
        {
          name: 'A iuuu',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'B',
      data: [
        {
          name: 'Bu',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'C',
      data: [
        {
          name: 'Cc',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'D',
      data: [
        {
          name: 'D',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'E',
      data: [
        {
          name: 'Cloud của tôi',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'F',
      data: [
        {
          name: 'Cloud của tôi',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'G',
      data: [
        {
          name: 'Cloud của tôi',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'J',
      data: [
        {
          name: 'Cloud của tôi',
          image: images.item_chat,
        },
      ],
    },
    {
      title: 'F',
      data: [
        {
          name: 'Cloud của tôi',
          image: images.item_chat,
        },
        {
          name: 'Cloud của tôi',
          image: images.item_chat,
        },
      ],
    },
  ]);

  return (
    <ScrollView>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 30,
            backgroundColor: '#252526',
            flexDirection: 'column',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.addfriend}
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'blue',
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 13,
              }}
            />
            <Text style={{color: 'white', fontSize: 16, margin: 15}}>
              Lời mời kết bạn
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 15}}>
            <Image
              source={images.listfriend}
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'blue',
                borderRadius: 5,
                marginTop: 10,
                marginLeft: 13,
              }}
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  marginStart: 15,
                  marginTop: 10,
                }}>
                Danh bạ máy
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  opacity: 0.5,
                  marginStart: 15,
                }}>
                Các liên hệ có dùng zalo
              </Text>
            </View>
          </View>
        </View>
        <View style={{flex: 20, backgroundColor: '#252526'}}>
          <View style={{height: 10, backgroundColor: 'black'}}></View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                height: 30,
                width: 90,
                backgroundColor: 'gray',
                borderRadius: 25,
                justifyContent: 'center',
                margin: 15,
              }}>
              <Text style={{alignSelf: 'center', color: 'white'}}>
                Tất cả 63
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 30,
                width: 100,
                borderWidth: 0.5,
                borderRadius: 25,
                justifyContent: 'center',
                marginTop: 15,
                borderColor: 'white',
              }}>
              <Text style={{alignSelf: 'center', color: 'white'}}>
                Mới truy cập
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{height: 1, backgroundColor: 'gray', opacity: 0.2}}></View>
        </View>
        <View style={{flex: 60}}>
          <SectionList
            sections={friends}
            renderItem={({item}) => <ItemFriend data={item} />}
            renderSectionHeader={({section}) => (
              <Text
                style={{
                  backgroundColor: '#252526',
                  fontSize: 13,
                  color: 'white',
                  paddingHorizontal: 15,
                }}>
                {section.title}
              </Text>
            )}
            keyExtractor={(item, index) => `basicListEntry-${item.title}`}
          />
        </View>
      </View>
    </ScrollView>
  );
}
export default ListFriend;
