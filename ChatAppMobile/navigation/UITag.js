import * as React from 'react';
import {ChatFlaxlist, ListFriend, ListGroup, MyProfile} from '../screens';
import {fontSizes, colors, images} from '../constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
const Tab = createBottomTabNavigator();
const screenOption = ({route}) => ({
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: 'red',
  tabBarIcon: ({focused, color, size}) => {
    let screenName = route.name;

    return screenName == 'ChatFlaxlist' ? (
      <Image
        source={images.mess}
        style={{height: 20, width: 20, opacity: focused ? 0.5 : 1}}></Image>
    ) : screenName == 'ListFriend' ? (
      <Image
        source={images.friendlist}
        style={{height: 20, width: 20, opacity: focused ? 0.5 : 1}}></Image>
    ) : screenName == 'ListGroup' ? (
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
      <Tab.Screen name={'ChatFlaxlist'} component={ChatFlaxlist} />
      <Tab.Screen name={'ListFriend'} component={ListFriend} />
      <Tab.Screen name={'ListGroup'} component={ListGroup} />
      <Tab.Screen name={'MyProfile'} component={MyProfile} />
    </Tab.Navigator>
  );
}
export default UITag;
