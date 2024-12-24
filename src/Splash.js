import React, {useEffect, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet, Image, Text, Animated} from 'react-native';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('tab');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/P&M.gif')} style={styles.animation} />
      <Text style={styles.head}>
        From packing to unpacking, we handle it all
      </Text>
      {/* <Text style={styles.desc}>
        Relax while we manage every step of your move with precision and care.
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  animation: {
    width: 300,
    height: 300,
  },
  head: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    margin: 15,
  },
  desc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});
