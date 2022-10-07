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
} from './screens';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => <ListGroup />);
