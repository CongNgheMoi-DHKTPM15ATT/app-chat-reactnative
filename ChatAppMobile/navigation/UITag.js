import * as React from 'react';
import {ChatFlaxlist, ListFriend, ListGroup, MyProfile} from '../screens';
import {fontSizes, colors, images} from '../constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
const Tab = createBottomTabNavigator();
const screenOption = ({route}) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: '#0E0E0E',
  tabBarActiveTintColor: 'blue',
  tabBarIcon: ({focused, color, size}) => {
    let screenName = route.name;

    return screenName == 'Tin nhắn' ? (
      <Image
        source={images.mess}
        style={{height: 20, width: 20, opacity: focused ? 0.5 : 1}}></Image>
    ) : screenName == 'Danh bạ' ? (
      <Image
        source={images.friendlist}
        style={{height: 20, width: 20, opacity: focused ? 0.5 : 1}}></Image>
    ) : screenName == 'Khám phá' ? (
      <Image
        source={images.people}
        style={{height: 20, width: 20, opacity: focused ? 0.5 : 1}}></Image>
    ) : (
      <Image
        source={images.account}
        style={{height: 20, width: 20, opacity: focused ? 0.5 : 1}}></Image>
    );
  },
});
function UITag(props) {
  return (
    <Tab.Navigator screenOptions={screenOption}>
      <Tab.Screen name={'Tin nhắn'} component={ChatFlaxlist} />
      <Tab.Screen name={'Danh bạ'} component={ListFriend} />
      <Tab.Screen name={'Khám phá'} component={ListGroup} />
      <Tab.Screen name={'Cá nhân'} component={MyProfile} />
    </Tab.Navigator>
  );
}
export default UITag;
