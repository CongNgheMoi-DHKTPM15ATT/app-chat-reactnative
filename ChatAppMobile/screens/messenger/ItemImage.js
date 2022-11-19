import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UIHeaderChat} from '../../components';
import {images} from '../../constants';
import Video from 'react-native-video';
function ItemImage(props) {
  let {item, onLongPress} = props;

  const [videoContent, setVideoContent] = useState([]);
  useEffect(() => {
    // console.log('vcl', item);
    item.avatar.map(t => {
      const last3 = t.slice(-3);
      console.log('vcl', last3);
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      {item.avatar.map(t =>
        t.slice(-3) != 'mp4' ? (
          <TouchableOpacity onLongPress={onLongPress}>
            <Image
              source={{
                uri: `${t}`,
              }}
              style={{
                height: 150,
                width: 300,
                left: 0,
                right: 0,
              }}
              resizeMode="contain"></Image>
          </TouchableOpacity>
        ) : (
          <View>
            <Video
              source={{
                uri: t,
              }}
              style={{width: 300, height: 300}}
              controls={true}
              onBuffer={Video.videoBuffer}
              ref={ref => {
                Video.player = ref;
              }}
            />
          </View>
        ),
      )}
    </View>
  );
}
export default ItemImage;
