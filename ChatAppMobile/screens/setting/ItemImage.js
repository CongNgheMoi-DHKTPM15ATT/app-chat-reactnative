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
function ItemImage(props) {
  let {_id, content} = props.data;

  const [imageContent, setImageContent] = useState([]);
  useEffect(() => {
    handleImage = () => {
      let image = [];
      let replaceString = content.replaceAll('&%&', ' ');
      let myArray = replaceString.split(' ');
      image.push(myArray[0]);
      console.log('aray', image);
      setImageContent(image, ...imageContent);
    };
    handleImage();
  }, []);
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <TouchableOpacity
        style={{
          padding: 10,
          height: 50,
          width: 50,
          backgroundColor: 'gray',
          marginHorizontal: 5,
          alignItems: 'center',
        }}>
        <Image
          source={{uri: `${imageContent}`}}
          style={{height: 24, width: 24}}></Image>
      </TouchableOpacity>
    </View>
  );
}
export default ItemImage;
