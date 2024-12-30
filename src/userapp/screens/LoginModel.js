import {View, Text} from 'react-native';
import React from 'react';

const LoginModel = () => {
  const sendOTP = async () => {
    const isValidMobile = /^\d{10}$/.test(mainContact);

    if (!isValidMobile) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      setotpLoader(true);
      const response = await axios.post(
        'https://api.vijayhomeservicebengaluru.in/api/sendotp/sendByCartBook',
        {
          mainContact: mainContact,
          fcmtoken: fcmtoken,
          service: cdata?.subcategory,
        },
      );

      if (response.status === 200) {
        setotpLoader(false);
        setLoginModal(false);

        setuser(response.data.user);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        Alert.alert('Error', error.response.data.error);
      } else {
        console.error('Error:', error);

        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
    }
  };

  return (
    <View>
      <Modal
  isVisible={LoginModal}
  onBackdropPress={() => setLoginModal(false)} // Close modal when backdrop is pressed
  style={{ justifyContent: 'center', alignItems: 'center' }}
>
  <View
    style={{
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      width: '90%',
    }}
  >
    <TouchableOpacity
      style={{
        alignSelf: 'flex-end',
        padding: 5,
      }}
      onPress={() => setLoginModal(false)}
    >
      <AntDesign name="close" size={20} color="lightgrey" />
    </TouchableOpacity>
    <Text
      style={{
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
      }}
    >
      Enter mobile number to continue
    </Text>
    <TextInput
      style={{
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        height: 45,
        marginBottom: 20,
        paddingHorizontal: 10,
        color: 'black',
      }}
      keyboardType="numeric"
      maxLength={10}
      onChangeText={text => setmainContact(text)}
      value={mainContact}
      placeholder="Enter Mobile Number"
      placeholderTextColor="grey"
    />
    <TouchableOpacity
      onPress={sendOTP}
      style={{
        backgroundColor: '#ff465e',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {otpLoader ? (
          <ActivityIndicator size="small" color={'white'} />
        ) : (
          'Continue'
        )}
      </Text>
    </TouchableOpacity>
    <View
      style={{
        marginTop: 20,
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 14, color: '#999' }}>
        Why to choose{' '}
        <Text style={{ color: 'darkred' }}>Our Services?</Text>
      </Text>
      <View style={{ marginTop: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <FontAwesome name="check-circle" size={14} color="green" style={{ marginRight: 5 }} />
          <Text style={{ fontSize: 14, color: 'black' }}>Lowest Price Guaranteed</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <FontAwesome name="check-circle" size={14} color="green" style={{ marginRight: 5 }} />
          <Text style={{ fontSize: 14, color: 'black' }}>Free Reschedule</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <FontAwesome name="check-circle" size={14} color="green" style={{ marginRight: 5 }} />
          <Text style={{ fontSize: 14, color: 'black' }}>5 Star Rated Team</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
          <FontAwesome name="check-circle" size={14} color="green" style={{ marginRight: 5 }} />
          <Text style={{ fontSize: 14, color: 'black' }}>Dedicated Customer Support</Text>
        </View>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
};

export default LoginModel;
