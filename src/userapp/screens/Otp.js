import React, {useRef, useState, useEffect} from 'react';
import {Checkbox} from 'react-native-paper';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from 'react-native-modal';
import axios from 'axios';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
// import OTPVerify from "react-native-otp-verify";

const CELL_COUNT = 4;
const HASH_CODE = 'YOUR_HASH_CODE';

function Signup({navigation}) {
  const [otp, setOtp] = useState('');
  const [otp1, setOtp1] = useState('');
  const [timer, setTimer] = useState(60);
  const [ModalVisible1, setModalVisible1] = useState(false);
  const [status, setStatus] = React.useState(false);
  const extractOTPFromMessage = message => {};

  const [mainContact, setPhoneNumber] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlenumber = text => {
    setPhoneNumber(text);
  };

  const sendOTP = async () => {
    setTimer(60);
    const isValidMobile = /^\d{10}$/.test(mainContact);

    if (!isValidMobile) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setModalVisible1(true);
      const response = await axios.post(
        'https://api.vijayhomeservicebengaluru.in/api/sendotp',
        {
          mainContact: mainContact,
        },
      );

      setStatus(true);
      setModalVisible1(false);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
        setModalVisible1(false);
        setStartTimer(true);
        navigation.navigate('signup');
      } else {
        console.error('Error:', error);
        setModalVisible1(false);
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  const OTPVerification = async () => {
    setModalVisible1(true);
    try {
      const response = await axios.post(
        'https://api.vijayhomeservicebengaluru.in/api/verifyotp',
        {
          otp: otp1,
          mainContact: mainContact,
        },
      );
      if (response.data.success) {
        setPhoneNumber('');
        setModalVisible1(false);
        setStatus(false);

        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        navigation.navigate('tab');
      } else {
        Alert.alert('Error', response.data.error || 'Unknown error occurred');
        setPhoneNumber('');
      }
    } catch (error) {
      setModalVisible1(false);
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {!status ? (
          <>
            <View style={{marginBottom: 20}}>
              <Image
                source={require('../../../assets/vhs.png')}
                style={styles.logoimg}
              />
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'black',
                  marginTop: 25,
                }}>
                Login With Mobile Number
              </Text>
            </View>
            <View style={{width: '100%'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  position: 'absolute',
                  top: 45,
                  left: 40,
                  zIndex: 1,

                  // fontWeight: "600",
                }}>
                +91
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  position: 'absolute',
                  top: 43,
                  left: 85,
                  zIndex: 1,

                  fontWeight: '600',
                }}>
                |
              </Text>

              <TextInput
                placeholder="Mobile Number"
                style={[styles.textinput, styles.elevation]}
                onChangeText={handlenumber}
                keyboardType="numeric"
                maxLength={10}
                value={mainContact}
                placeholderTextColor={'grey'}
                underlineColorAndroid={
                  Platform.OS === 'android' ? 'white' : null
                }
              />
            </View>

            <TouchableOpacity onPress={sendOTP} style={styles.logintext}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 18,
                  fontWeight: '800',
                }}>
                SIGN IN WITH OTP
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <View>
              <View style={{marginBottom: 20, alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/vhs.png')}
                  style={styles.logoimg}
                />
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.title}>
                Please enter the OTP that has been sent to your registered
                mobile number
              </Text>
              <CodeField
                value={otp1}
                onChangeText={e => setOtp1(e)}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                underlineColorAndroid={
                  Platform.OS === 'android' ? 'white' : null
                }
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </View>
            {timer > 0 ? (
              <Text style={{textAlign: 'center', color: 'black'}}>
                Resend in {timer}
              </Text>
            ) : (
              <TouchableOpacity onPress={sendOTP}>
                <Text style={{textAlign: 'center', color: 'darkred'}}>
                  Resend OTP
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={OTPVerification}
              style={{
                backgroundColor: 'darkred',
                padding: 15,
                borderRadius: 5,
                marginTop: 25,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                Verify OTP
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal isVisible={ModalVisible1}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 15,
          }}>
          <ActivityIndicator size="large" />
          <Text style={{color: 'black', fontSize: 23, marginLeft: 10}}>
            Please wait.....
          </Text>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  row: {
    width: '100%',
    height: 'auto',
    borderRadius: 25,
    alignItems: 'center',
  },
  headicon: {
    backgroundColor: '#3A75F6',
    width: 80,
    textAlign: 'center',
    borderRadius: 50,
    padding: 18,
    position: 'absolute',
    top: -45,
  },
  headicon1: {
    backgroundColor: '#a33535',
    width: 35,
    textAlign: 'center',
    borderRadius: 50,
    padding: 8,
    position: 'absolute',
    top: 38,
    left: 30,
  },
  headicon2: {
    backgroundColor: '#3A75F6',
    width: 40,
    textAlign: 'center',
    borderRadius: 50,
    padding: 10,
    position: 'absolute',
    top: 40,
    left: 30,
  },
  elevation: {
    elevation: 15,
    borderRadius: 5,
    // borderWidth:1,
    // b
  },
  textinput: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 18,
    marginTop: 33,
    marginLeft: 20,
    marginRight: 20,
    height: 50,

    color: 'black',
    paddingLeft: 85,
  },
  elevation1: {
    // elevation: 15,
    borderRadius: 20,
  },
  textinput1: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    height: 60,
    paddingLeft: 60,
    color: 'black',
  },
  logintext: {
    backgroundColor: 'darkred',
    padding: 15,
    width: 130,
    borderRadius: 10,

    marginTop: 40,
    width: '90%',
  },
  socialimg: {
    width: 40,
    height: 40,
  },
  socialicon: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: 'black',
  },

  underlineStyleBase: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    borderColor: 'lightgray',
  },

  underlineStyleHighLighted: {
    borderColor: 'brown',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoimg: {
    width: 150,
    height: 150,
  },
  contentView1: {
    marginTop: 30,
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  codeFieldRoot: {
    borderColor: 'gray',

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginBottom: 20,
  },
  cell: {
    width: 45,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
    borderColor: '#b7b7b7',
    borderBottomWidth: 1,
    borderWidth: 1,
    color: 'black',
  },
  focusCell: {
    borderColor: 'darkred',
  },
  enteredOTP: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});
export default Signup;
