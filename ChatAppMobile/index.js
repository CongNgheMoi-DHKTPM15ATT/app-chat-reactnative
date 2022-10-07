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
} from './screens';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => <ListFriend />);
