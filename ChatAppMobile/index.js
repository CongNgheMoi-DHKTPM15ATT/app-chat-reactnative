/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';

// import {
//   LoadingActivity,
//   ChatFlaxlist,
//   ListFriend,
//   ListGroup,
//   MyProfile,
//   ChatScreen,
// } from './screens';
import App from './navigation/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => <App />);
