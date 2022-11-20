import * as React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const configFirebase = {
  apiKey: 'AIzaSyAc9Z2AOisqGVn4EjOhI9MrlsBHHJkYczk',
  authDomain: 'auth-phone-reactnative.firebaseapp.com',
  projectId: 'auth-phone-reactnative',
  storageBucket: 'auth-phone-reactnative.appspot.com',
  messagingSenderId: '941941692182',
  appId: '1:941941692182:web:001b7d7a38b35ff4cda237',
  measurementId: 'G-2953GM6T9L',
};
if (!firebase.apps.length) {
  firebase.initializeApp(configFirebase);
}

export default () => {
  return {firebase, auth};
};
