import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  useWindowDimensions,
  FlatList,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {UIHeaderChat} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemFriend from '../phonebook/draws/ItemFriend';
import ListMemOnGroup from './ListMemOnGroup';
import ListMemOnGroupWaitingAccept from './ListMemOnGroupWaitingAccept';
const FirstRoute = () => <ListMemOnGroup></ListMemOnGroup>;

const SecondRoute = () => (
  <ListMemOnGroupWaitingAccept></ListMemOnGroupWaitingAccept>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

export default function MemberScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Tất cả'},
    {key: 'second', title: 'Đã mời'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
