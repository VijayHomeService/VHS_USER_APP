import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Checkbox} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

function App({navigation}) {
  const [checked, setChecked] = React.useState(false);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      if (value) {
        navigation.navigate('tab');
      } else {
        navigation.navigate('signin');
      }
    });
  }, []);

  const handleemailorphone = text => {
    setemail(text);
  };
  const handlepassword = text => {
    setpassword(text);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const refreshLoginPage = () => {
    setemail('');
    setpassword('');
    setEmailError('');
    setPasswordError('');
  };
  useFocusEffect(
    React.useCallback(() => {
      refreshLoginPage();
    }, []),
  );

  const Login = async e => {
    e.preventDefault();

    try {
      const config = {
        url: '/usersign',
        method: 'post',
        baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
        headers: {'content-type': 'application/json'},
        data: {email: email, password: password},
      };
      const response = await axios(config);
      if (response.status === 200) {
        // Handle successful login
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        console.log('suceess');
        alert('Login successfuly');
        navigation.navigate('tab');
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside of the 2xx range
        alert(error.response.data.error);
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
      <View>
        <Image
          source={require('../../../assets/vhs.png')}
          style={styles.logoimg}
        />
      </View>
      <Text style={styles.logintext}>Sign in to your account</Text>

      <View style={{width: '100%'}}>
        <TextInput
          placeholder="Email "
          style={styles.textinput}
          value={email}
          onChangeText={handleemailorphone}
        />
        <Ionicons
          name="mail"
          color="#9b9ea2a8"
          size={25}
          style={styles.textinputicon}
        />
        {emailError ? (
          <Text style={styles.errorMessage}>{emailError}</Text>
        ) : null}
      </View>
      <View style={{width: '100%'}}>
        <TextInput
          placeholder="Password"
          style={styles.textinput}
          value={password}
          onChangeText={handlepassword}
          secureTextEntry={!showPassword}
        />
        {passwordError ? (
          <Text style={styles.errorMessage}>{passwordError}</Text>
        ) : null}
        <FontAwesome
          name="lock"
          color="#9b9ea2a8"
          size={25}
          style={styles.textinputicon}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility} // Toggle password visibility
          style={styles.textinputeyeicon}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            color="#000"
            size={25}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentView}>
        <View style={{flex: 0.5, flexDirection: 'row'}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(checked);
            }}
            color={'green'}
            uncheckColor={'red'}
          />
          <Text style={styles.label}>Remember me</Text>
        </View>

        <View style={{flex: 0.5}}>
          <Text
            style={{
              textAlign: 'right',
              color: '#000',
              fontWeight: 'bold',
              marginTop: 10,
            }}>
            Forgot Password?
          </Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={Login}
        style={{
          backgroundColor: '#d63333',
          width: '100%',
          padding: 8,
          borderRadius: 20,
          marginTop: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontSize: 16,
          }}>
          Sign in
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{flex: 0.4}}>
          <Text style={styles.border}></Text>
        </View>
        <View style={{flex: 0.1}}>
          <Text
            style={{
              color: 'grey',
              margin: 5,
              textAlign: 'center',
            }}>
            OR
          </Text>
        </View>

        <View style={{flex: 0.4}}>
          <Text style={styles.border}></Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.otp}
        onPress={() => navigation.navigate('otp')}>
        <Text style={styles.otptext}>Continue with OTP</Text>
        <AntDesign
          name="message1"
          color="#9b9ea2a8"
          size={25}
          style={styles.textinputicon1}
        />
      </TouchableOpacity>

      <View style={styles.contentView1}>
        <Text style={{textAlign: 'center', fontSize: 16}}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('signup')}>
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 16,
              marginLeft: 10,
              fontWeight: 'bold',
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
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
    right: 10,
    top: 29,
    backgroundColor: '#eee',
    padding: 3,
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
    color: 'grey',
    top: 12,
  },
  contentView1: {
    marginTop: 30,
    flexDirection: 'row',
  },
});
export default App;
