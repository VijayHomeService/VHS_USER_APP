import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function ReferralClaim() {
  const [user, setUser] = useState('');
  const [referralCode, setreferralCode] = useState('');

  const handlereferral = text => {
    setreferralCode(text);
  };

  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData();
  }, []);

  const submit = async () => {
    if (user?.referralCode === referralCode) {
      alert('Invalid code');
      return;
    }
    try {
      let config = {
        url: '/userapp/addvoucher',
        method: 'post',
        baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          referralCode: referralCode,
          userId: user?._id,
        },
      };
      let response = await axios(config);
      if (response.status === 201) {
        alert('added successfully');
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log('error', error.response.data.error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter referral code"
        style={[styles.textinput, styles.elevation]}
        onChangeText={handlereferral}
        maxLength={10}
        underlineColorAndroid={Platform.OS === 'android' ? 'white' : null}
        placeholderTextColor={'grey'}
      />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={submit} style={styles.logintext}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: '800',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 18,
    marginTop: 33,
    marginLeft: 20,
    marginRight: 20,
    height: 40,

    color: 'black',
    width: '80%',
  },
  elevation: {
    elevation: 15,
    borderRadius: 5,
  },
  logintext: {
    backgroundColor: 'orange',
    padding: 12,

    borderRadius: 5,

    marginTop: 40,
    width: '80%',
  },
});

export default ReferralClaim;
