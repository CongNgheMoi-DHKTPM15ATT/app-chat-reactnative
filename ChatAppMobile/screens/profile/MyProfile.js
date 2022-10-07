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
import {images} from '../../constants';
function MyProfile(props) {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 13, backgroundColor: '#202124'}}>
        <View style={{flexDirection: 'row', margin: 15}}>
          <Image
            source={images.avatar}
            style={{
              height: 60,
              width: 60,
              borderRadius: 100,
              marginLeft: 10,
            }}></Image>
          <View style={{flexDirection: 'column', margin: 5}}>
            <Text style={{fontSize: 18, color: 'white', marginLeft: 15}}>
              A N H T H Ư
            </Text>
            <Text style={{fontSize: 13, color: 'white', marginLeft: 15}}>
              Xem trang cá nhân
            </Text>
          </View>
          <View style={{flex: 1}}></View>
          <Image
            source={images.update}
            style={{height: 25, width: 25, margin: 10}}></Image>
        </View>
      </View>
      <View style={{height: 10, backgroundColor: 'black'}}></View>
      <View
        style={{flex: 20, backgroundColor: '#202124', flexDirection: 'column'}}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center', padding: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Image source={images.qr} style={{height: 40, width: 40}}></Image>
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16}}>Ví QR</Text>
              <Text style={{color: 'white', fontSize: 13, opacity: 0.5}}>
                Lưu trữ và xuất trình các mã QR quan trọng
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            marginLeft: 80,
          }}></View>
        <TouchableOpacity
          style={{justifyContent: 'center', paddingLeft: 25, paddingTop: 10}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.cloud2}
              style={{height: 40, width: 40, marginLeft: 5}}></Image>
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16}}>Cloud của tôi</Text>
              <Text style={{color: 'white', fontSize: 13, opacity: 0.5}}>
                Lưu trữ các tin nhắn quan trọng
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{height: 10, backgroundColor: 'black'}}></View>
      <View
        style={{
          flex: 20,
          backgroundColor: '#202124',
          flexDirection: 'column',
        }}>
        <TouchableOpacity style={{padding: 15, marginLeft: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.shield}
              style={{height: 40, width: 40}}></Image>
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16, marginVertical: 10}}>
                Tài khoản và bảo mật
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: 'gray',
            marginLeft: 80,
          }}></View>
        <TouchableOpacity style={{padding: 15, marginLeft: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={images.padlock}
              style={{height: 40, width: 40}}></Image>
            <View style={{marginLeft: 15}}>
              <Text style={{color: 'white', fontSize: 16, marginVertical: 5}}>
                Quyền riêng tư
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 30, backgroundColor: 'black'}}></View>
    </View>
  );
}
export default MyProfile;
