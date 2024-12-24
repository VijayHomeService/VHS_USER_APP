import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Checkbox} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Signup({navigation}) {
  const apiURL = process.env.REACT_APP_API_URL;

  // const imgURL = process.env.REACT_APP_IMAGE_API_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState('');
  const [number, setnumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Regular expressions for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const numberRegex = /^[0-9]*$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleusername = text => {
    setusername(text);
  };
  const handleEmail = text => {
    setEmail(text);
  };
  const handlenumber = text => {
    setnumber(text);
  };
  const handlepassword = text => {
    setPassword(text);
  };
  const handlecpassword = text => {
    setcpassword(text);
  };
  const validateForm = () => {
    const isEmailValid = emailRegex.test(email);
    const isNumberValid = numberRegex.test(number) && number.length === 10;
    const isPasswordValid = passwordRegex.test(password);
    const isConfirmPasswordValid = password === cpassword;

    setIsValid(
      isEmailValid &&
        isNumberValid &&
        isPasswordValid &&
        isConfirmPasswordValid,
    );
  };

  const submit = async e => {
    e.preventDefault();
    if (!username || !email || !number) {
      Alert.alert('Validation Error', 'All fields must be required.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!numberRegex.test(number) || number.length !== 10) {
      Alert.alert(
        'Validation Error',
        'Please enter a valid 10-digit phone number.',
      );
      return;
    }

    // if (!passwordRegex.test(password)) {
    //   Alert.alert(
    //     "Validation Error",
    //     "Password must contain at least 8 characters, including letters and numbers."
    //   );
    //   return;
    // }

    // if (password !== cpassword) {
    //   Alert.alert("Validation Error", "Passwords do not match.");
    //   return;
    // }

    try {
      const config = {
        url: '/addcustomer',
        method: 'post',
        baseURL: 'https://api.vijayhomeservicebengaluru.in/api', // Replace with your actual API URL
        headers: {'content-type': 'application/json'},
        data: {
          customerName: username,
          email: email,
          mainContact: number,
          password: password,
          cpassword: cpassword,
          type: 'userapp',
          city: '',
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        console.log('Response data:', response.data);
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        alert('Register Successfully');
        navigation.navigate('otp');
      } else {
        // Handle unexpected response status codes
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of the 2xx range
        alert(error.response.data.error);
        console.log('Error response data:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        alert('Network error. Please try again later.');
        console.log('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        alert('An unexpected error occurred. Please try again later.');
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <>
          <View>
            <Image
              source={require('../../../assets/vhs.png')}
              style={styles.logoimg}
            />
          </View>
          <Text style={styles.logintext}>Sign up</Text>

          <View style={{width: '100%'}}>
            <TextInput
              placeholder="Name"
              style={styles.textinput}
              value={username}
              onChangeText={handleusername}
            />
            <FontAwesome
              name="user"
              color="#9b9ea2a8"
              size={25}
              style={styles.textinputicon}
            />
          </View>

          <View style={{width: '100%'}}>
            <TextInput
              placeholder="Email"
              style={styles.textinput}
              value={email}
              onChangeText={handleEmail}
            />
            <Ionicons
              name="mail"
              color="#9b9ea2a8"
              size={25}
              style={styles.textinputicon}
            />
          </View>

          <View style={{width: '100%'}}>
            <TextInput
              placeholder="Phone Number"
              style={styles.textinput}
              value={number}
              onChangeText={handlenumber}
            />
            <FontAwesome
              name="phone"
              color="#9b9ea2a8"
              size={25}
              style={styles.textinputicon}
            />
          </View>

          {/* <View style={{ width: "100%" }}>
            <TextInput
              placeholder="Create Password"
              style={styles.textinput}
              value={password}
              onChangeText={handlepassword}
            />
            <FontAwesome
              name="lock"
              color="#9b9ea2a8"
              size={28}
              style={styles.textinputicon}
            />
            <Ionicons
              name="eye-off"
              color="#000"
              size={25}
              style={styles.textinputeyeicon}
            /> 
          </View> */}

          {/* <View style={{ width: "100%" }}>
            <TextInput
              placeholder="Confirm Password"
              style={styles.textinput}
              value={cpassword}
              onChangeText={handlecpassword}
            />
            <FontAwesome
              name="lock"
              color="#9b9ea2a8"
              size={28}
              style={styles.textinputicon}
            />
             <Ionicons
              name="eye-off"
              color="#000"
              size={25}
              style={styles.textinputeyeicon}
            /> 
          </View> */}

          <View
            style={{
              backgroundColor: '#d63333',
              width: '100%',
              padding: 10,
              borderRadius: 20,
              marginTop: 20,
            }}>
            <TouchableOpacity onPress={submit}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  fontSize: 16,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.contentView}>
            <Text style={{textAlign: 'center', fontSize: 16}}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('otp')}>
              <Text
                style={{
                  color: '#2fc3ff',
                  textAlign: 'center',
                  fontSize: 16,
                  marginLeft: 10,
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoimg: {
    width: 80,
    height: 80,
  },
  logintext: {
    alignItems: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 20,
    fontWeight: 'bold',
  },
  textinput: {
    backgroundColor: '#eee',
    width: '100%',
    fontSize: 14,
    paddingLeft: 50,
    marginTop: 20,
    borderRadius: 5,
  },
  textinputicon: {
    position: 'absolute',
    top: 29,
    paddingLeft: 10,
  },
  textinputeyeicon: {
    position: 'absolute',
    right: 20,
    top: 32,
  },
  contentView: {
    flexDirection: 'row',
    marginTop: 10,
  },
  checkbox: {
    borderColor: '#000',
  },
  label: {
    margin: 8,
    color: '#000',
    fontWeight: 'bold',
  },
  border: {
    borderBottomWidth: 2,
    borderColor: '#eee',
  },
  otp: {
    borderWidth: 1,
    borderColor: 'grey',
    width: '100%',
    padding: 15,
    marginTop: 20,
  },
  otptext: {
    textAlign: 'center',
    fontSize: 16,
    color: 'grey',
  },
  textinputicon1: {
    position: 'absolute',
    right: 30,
    color: 'green',
    top: 12,
  },
  contentView1: {
    marginTop: 30,
    flexDirection: 'row',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Signup;
