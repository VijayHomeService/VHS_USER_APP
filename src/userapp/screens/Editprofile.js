import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import axios from 'axios';

function Edit({navigation}) {
  const [customerName, setfirstname] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(value?.mainContact || '');

  const handlePhoneNumberChange = text => {
    setPhoneNumber(text);
    // Add any other logic you need when the phone number changes
  };

  const loadUserData = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setValue(JSON.parse(userData));
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // This will be executed when the component comes into focus
      // Refresh the component or perform any necessary actions here
      // For example, you can check if the user is logged out and reset the state

      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(value => {
      setValue(JSON.parse(value));
    });
  }, []);

  // Fetch user data from AsyncStorage on component mount
  useEffect(() => {
    AsyncStorage.getItem('user').then(userData => {
      if (userData) {
        const user = JSON.parse(userData);
        setfirstname(user.customerName);
        setEmail(user.email);
        setPhoneNumber(user.mainContact);
        setId(user._id);
      }
    });
  }, []);

  const update = async () => {
    setLoading(true);
    try {
      const updatedUser = {
        customerName,
        email,
        mainContact: phoneNumber,
      };

      const config = {
        url: `/userupdate/${value._id}`,
        method: 'post',
        baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
        headers: {
          'Content-Type': 'application/json',
        },
        data: updatedUser,
      };

      const response = await axios(config);

      if (response.status === 200) {
        const updatedUserData = response.data.user;
        await AsyncStorage.setItem('user', JSON.stringify(updatedUserData));
        navigation.navigate('profile');
        alert('Profile updated successfully');
      } else {
        alert('Profile update failed');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred during the update');
    } finally {
      setLoading(false); // Set loading to false when the update process is complete
    }
  };
  return (
    <View style={styles.container}>
      <View style={{margin: 10}}>
        <View>
          <Text styles={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={setfirstname}
            underlineColorAndroid={Platform.OS === 'android' ? 'white' : null}
          />
        </View>

        <View style={{marginTop: 10}}>
          <Text styles={styles.label}>Phone number</Text>
          {/* <TextInput
      style={styles.input}
      devalue={phoneNumber}
      onChangeText={handlePhoneNumberChange}
      underlineColorAndroid={Platform.OS === 'android' ? '' : null}
    /> */}
        </View>
        <View style={{marginTop: 10, marginLeft: 10}}>
          <Text style={{color: 'black'}}>{phoneNumber}</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text styles={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            underlineColorAndroid={Platform.OS === 'android' ? 'white' : null}
          />
        </View>

        <TouchableOpacity onPress={update} style={{alignItems: 'center'}}>
          <View style={styles.submitButton}>
            {loading ? (
              <ActivityIndicator color="white" /> // Show loading indicator while updating
            ) : (
              <Text style={styles.submitButtonText}>Update Account</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  label: {
    color: 'black',
    fontSize: 14,
  },
  input: {
    // borderWidth: 1,
    height: 45,
    // marginTop: 5,
    borderRadius: 5,
    borderColor: 'grey',
    paddingLeft: 15,
  },
  submitButton: {
    backgroundColor: 'darkred',
    padding: 10,
    width: '90%',
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 40,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
export default Edit;
