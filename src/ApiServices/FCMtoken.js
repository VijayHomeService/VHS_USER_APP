// useFCMToken.js
import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Platform, PermissionsAndroid} from 'react-native';

export const useFCMToken = () => {
  const [fcmtoken, setfcmtoken] = useState();

  useEffect(() => {
    requestUserPermission();
  }, []);

  const requestUserPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getFCMToken();
        } else {
          console.log('Permission denied');
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    } else {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          console.log('Authorization status:', authStatus);
          getFCMToken();
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    }
  };

  const getFCMToken = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      setfcmtoken(token);
    } catch (error) {
      console.log('Error during generating token:', error);
    }
  };

  return fcmtoken;
};
