import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  Linking,
  Modal,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Shimmer from 'react-native-shimmer';
import axios from 'axios';

function Invite({navigation}) {
  const [user, setUser] = useState('');
  const [referralCode, setreferralCode] = useState('');

  const handlereferral = text => {
    setreferralCode(text);
  };
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleEmail = () => {
    const recipientEmail = 'Support@vijayhomeservices.com';
    const subject = 'Refer and Earn';
    const body = `Hey! Check out this awesome app, Vijay Home Services. Install it now and use my referral code ${user?.referralCode} to get a special discount!`;

    // Constructing the mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Opening the default email client
    Linking.openURL(mailtoLink);
  };

  const handleWhatsApp = () => {
    const referralText = `Hey! Check out this awesome app, Vijay Home Services. Install it now and use my referral code ${user?.referralCode} to get a special discount!`;

    const appLink = 'https://play.google.com/store/apps/details?id=com.vhs1';
    const message = `${referralText}\n${appLink}`;
    const whatsappURL = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappURL)
      .then(() => {
        console.log('WhatsApp opened successfully');
      })
      .catch(error => {
        console.error('Error opening WhatsApp:', error);
      });
  };

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
        AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        setModalVisible(false);
        alert('Redeem successfully');
      }
    } catch (error) {
      alert(error.response.data.error);
      console.log('error', error.response.data.error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#adb4f6cc', padding: 20}}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          Refer and get FREE services
        </Text>
        <Text style={{color: 'black', fontSize: 14, marginTop: 10}}>
          Invite your friends to try Vijay home services and get Attractive
          offers exclusively
        </Text>
        {user?.referralCode ? (
          <Text
            style={{
              color: 'darkred',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 10,
            }}
            onPress={() => {
              const playStoreLink = user?.referralCode; // Replace with your app's actual Play Store link
              Clipboard.setString(playStoreLink);
              alert('Play Store link copied to clipboard!');
            }}>
            Your Code - {user?.referralCode}
          </Text>
        ) : (
          ''
        )}

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.inviteicon}>
            <MaterialCommunityIcons
              name="content-copy"
              color="darkred"
              size={25}
              style={styles.inviteicon1}
              onPress={() => {
                const playStoreLink = `Hey! Check out this awesome app, Vijay Home Services. Install it now and use my referral code ${user?.referralCode} to get a special discount!`; // Replace with your app's actual Play Store link
                Clipboard.setString(playStoreLink);
                alert('Play Store link copied to clipboard!');
              }}
            />
          </View>

          <TouchableOpacity onPress={handleEmail} style={styles.inviteicon}>
            <Entypo
              name="mail"
              color="darkred"
              size={25}
              style={styles.inviteicon1}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleWhatsApp} style={styles.inviteicon}>
            <FontAwesome
              name="whatsapp"
              color="darkred"
              size={27}
              style={styles.inviteicon1}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.textinput, styles.elevation]}>
        <View
          style={{
            borderBottomWidth: 1,
            borderStyle: 'dashed',
            borderColor: '#eee',
          }}>
          <Text
            style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 18,
              paddingBottom: 10,
            }}>
            How it works?
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.1}}>
            <View style={[styles.textinput1, styles.elevation1]}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                1
              </Text>
            </View>
            <Text style={[styles.textinput2, styles.elevation2]}></Text>
            <View style={[styles.textinput3, styles.elevation1]}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                2
              </Text>
            </View>
            <Text style={[styles.textinput2, styles.elevation2]}></Text>
            <View style={[styles.textinput3, styles.elevation1]}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 3,
                }}>
                3
              </Text>
            </View>
          </View>

          <View style={{flex: 0.9}}>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 10,
                marginTop: 15,
              }}>
              Invite your friends & get points
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 10,
                marginTop: 50,
              }}>
              They get attractive offers exclusively from them
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 14,
                marginLeft: 10,
                marginTop: 35,
              }}>
              Redeem the points
            </Text>
          </View>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('privacy')}
          style={{flex: 0.6}}>
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
            }}>
            Terms and conditions{' '}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Claim Referral')}
          style={{flex: 0.4}}>
          <Text style={{color: 'red', textAlign: 'center'}}>FAQs</Text>
        </TouchableOpacity>
      </View>
      {modalVisible ? (
        ''
      ) : (
        <View
          style={{position: 'absolute', bottom: 10, flex: 1, width: '100%'}}>
          <Shimmer duration={500} pauseDuration={1000} tilt={50}>
            <TouchableOpacity
              style={styles.claim}
              onPress={() => setModalVisible(true)}>
              <Text style={{color: 'black', fontWeight: '700', fontSize: 16}}>
                Redeem
              </Text>
            </TouchableOpacity>
          </Shimmer>
        </View>
      )}

      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <TextInput
                  placeholder="Enter referral code"
                  style={[styles.textinput, styles.elevation]}
                  onChangeText={handlereferral}
                  maxLength={10}
                  underlineColorAndroid={
                    Platform.OS === 'android' ? 'white' : null
                  }
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

                  <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.logintext1}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 18,
                        fontWeight: '800',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      CANCEL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  claim: {
    backgroundColor: '#8644A2',
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteicon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  inviteicon1: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
  },
  textinput: {
    borderRadius: 10,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    padding: 20,
  },
  elevation: {
    elevation: 15,
    borderRadius: 20,
  },
  textinput1: {
    // margin: 20,
    backgroundColor: 'white',
    fontSize: 18,
    width: 30,
    height: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  elevation1: {
    elevation: 15,
    borderRadius: 50,
  },
  textinput2: {
    backgroundColor: 'white',
    width: 10,
    height: 40,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
    marginTop: -0,
  },
  elevation2: {
    elevation: 15,
    // borderRadius: 50,
  },
  textinput3: {
    // margin: 20,
    backgroundColor: 'white',
    fontSize: 18,
    width: 30,
    height: 30,
    fontWeight: 'bold',
    // marginTop: 10,
  },
  centeredView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    // height:"auto"
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  logintext: {
    backgroundColor: 'orange',
    padding: 12,

    borderRadius: 5,

    marginTop: 40,
    width: '80%',
  },
  logintext1: {
    backgroundColor: 'skyblue',
    padding: 8,
    borderRadius: 5,
    marginTop: 40,
    width: '80%',
  },
});
export default Invite;
