/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import {
  LoadingActivity,
  ChatFlaxlist,
  ItemChat,
  ListFriend,
  ItemFriend,
  ListGroup,
  MyProfile,
} from './screens';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => <MyProfile />);
