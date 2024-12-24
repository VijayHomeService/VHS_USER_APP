import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

function Flashpage({navigation}) {
  useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      if (value) {
        navigation.navigate('tab');
      } else {
        navigation.navigate('otp');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../assets/home.jpg')}
        style={styles.backimages}
      /> */}
      <View style={styles.logocontainer}>
        <Image
          source={require('../../../assets/vhs.png')}
          style={styles.logoimages}
        />
      </View>

      <View
        style={{
          position: 'absolute',
          top: '65%',
          width: '100%',
        }}>
        <Text style={styles.hometext}>Welcome to</Text>
        <Text style={styles.hometext1}>Vijay Home Services</Text>

        <View style={{flexDirection: 'row', margin: 20}}>
          <View
            style={{
              flex: 0.5,
              backgroundColor: 'white',
              justifyContent: 'center',
              borderRadius: 20,
              width: '100%',
              padding: 10,
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
              }}>
              Join Us
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              borderWidth: 1,
              justifyContent: 'center',
              borderRadius: 20,
              width: '100%',
              padding: 10,
              alignItems: 'center',
              borderColor: 'black',
              marginLeft: 10,
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('signin')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'black',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backimages: {
    flex: 1,
    justifyContent: 'center',
    opacity: 0.7,
  },
  logocontainer: {
    position: 'absolute',
    bottom: '40%',
    left: '27%',
    right: '27%',
    top: '35%',
  },
  logoimages: {
    width: 200,
    height: 200,
  },
  hometext: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  hometext1: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
});
export default Flashpage;
