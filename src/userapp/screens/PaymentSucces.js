import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';

export default function PaymentSucces({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      // Reset the navigation state to ensure the drawer page refreshes
      navigation.reset({
        index: 0,
        routes: [{name: 'tab'}], // Adjust 'mydrawer' to the correct route name
      });
    }, 4000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/success.gif')}
        style={{width: '100%', height: 300}}
      />

      <Text style={styles.text}>Payment Successful</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'green',
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
  },
});
