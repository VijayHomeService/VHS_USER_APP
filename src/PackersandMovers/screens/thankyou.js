import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video'; // Ensure you have this package installed

const ThankYou = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Redirect to the home screen after 2 seconds
    const timeout = setTimeout(() => {
      navigation.navigate('Bottomtab');
      //   navigation.navigate('Home'); // Replace 'Home' with your actual home screen name
    }, 3000);

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Video
        source={require('../../../assets/a.mp4')}
        style={{
          width: 200,
          height: 200,
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
        }}
        muted={false}
        repeat={true}
        resizeMode="contain"
        paused={false}
      />

      <Text
        style={{
          color: 'black',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '800',
          marginTop: 20,
        }}>
        Thank for your booking is confirmed
      </Text>
    </View>
  );
};

export default ThankYou;
