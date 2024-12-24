import React from 'react';
import { Image, Linking,View,Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const Call = () => {
  // Function to handle the phone call
  const handlePhoneCall = () => {
    Linking.openURL('tel:918453748478');
  };

  // Listen for tab focus and initiate the phone call
  useFocusEffect(
    React.useCallback(() => {
      handlePhoneCall();
    }, [])
  );

  return (
    // Your component's content here
    <View>
      <Text></Text>
    </View>
  );
};

export default Call;
