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
      <Modal isVisible={LoginModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setLoginModal(false)}>
              <AntDesign name="close" size={20} color="lightgrey" />
            </TouchableOpacity>
            <Text style={styles.title}>MOBILE NUMBER</Text>
            <Text style={styles.subtitle}>Please enter your mobile number</Text>
            <TextInput
              style={[styles.input, {color: 'black'}]}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={text => setmainContact(text)}
              value={mainContact}
              placeholder="00000 00000"
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity style={styles.submitButton} onPress={sendOTP}>
              <Text style={styles.submitButtonText}>
                {otpLoader ? (
                  <ActivityIndicator size="large" color={'white'} />
                ) : (
                  'SUBMIT'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginModel;
