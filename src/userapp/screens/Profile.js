import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Switch,
  Alert,
  Modal,
  Pressable,
  TextInput,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

function Profile({navigation}) {
  const [switchValue, setSwitchValue] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState('');

  const [value, setValue] = useState('');

  const toggleSwitch = value => {
    setSwitchValue(value);
  };

  const loadUserData = async () => {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      setValue(JSON.parse(userData));
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const signout = () => {
    AsyncStorage.removeItem('user');

    navigation.navigate('tab');
  };

  const deleteUserAccount = async () => {
    try {
      const response = await axios.post(
        `https://api.vijayhomeservicebengaluru.in/api/deletetercustomer/${user._id}`,
      );
      if (response.status === 200) {
        signout();
      } else {
        // Handle errors if necessary
        Alert.alert(
          'Error',
          'Account deletion failed. Please try again later.',
        );
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
      Alert.alert(
        'Error',
        'An error occurred. Please check your internet connection.',
      );
    }
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

  const useDoubleBackExit = () => {
    const lastBackPressed = useRef(0);

    const onBackPress = () => {
      const currentTime = new Date().getTime();
      const DOUBLE_PRESS_DELAY = 2000;

      if (currentTime - lastBackPressed.current < DOUBLE_PRESS_DELAY) {
        BackHandler.exitApp();
        return true;
      }
      navigation.goBack();
      lastBackPressed.current = currentTime;
      ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
      return true;
    };

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []);
  };

  useDoubleBackExit();

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: 'row', backgroundColor: '#E5E1DA'}}>
          <View>
            <TouchableOpacity>
              <Image
                source={require('../../../assets/Profile.png')}
                style={styles.profileimg}
              />
            </TouchableOpacity>
          </View>

          <View>
            {user && (
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    marginTop: 25,
                    marginLeft: 20,
                    textAlign: 'center',
                  }}>
                  {user?.customerName}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginBottom: 5,
                    textAlign: 'center',
                    marginLeft: 20,
                  }}>
                  {user?.mainContact}
                </Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('edit')}>
          <View style={styles.container1}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <FontAwesome5 name="user-alt" color="black" size={18} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Edit Profile
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('booking')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <Fontisto name="date" color="black" size={20} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  My Booking
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('wallet')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <AntDesign name="wallet" color="black" size={20} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Wallet
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.container2}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.1}}>
              <Ionicons name="notifications-outline" color="black" size={20} />
            </View>
            <View style={{flex: 0.8}}>
              <Text style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                Notification
              </Text>
            </View>
            <View style={{flex: 0.1, alignItems: 'flex-end'}}>
              <Switch
                // style={{ marginTop: 0 }}
                onValueChange={toggleSwitch}
                value={switchValue}
                // style={{color:"black"}}
                trackColor={{false: 'darkred', true: 'darkred'}}
                thumbColor={switchValue ? 'white' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('language')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <Entypo name="language" color="black" size={20} />
              </View>
              <View style={{flex: 0.7}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Language
                </Text>
              </View>
              <View
                style={{
                  flex: 0.3,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Text style={{color: 'black', fontSize: 10, marginLeft: 35}}>
                  English (US)
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'flex-end',
                }}>
                <AntDesign
                  name="right"
                  color="black"
                  size={20}
                  style={{alignItems: 'flex-end'}}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('privacy')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <MaterialIcons name="privacy-tip" color="black" size={20} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Privacy Policy
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('terms')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <EvilIcons name="lock" color="black" size={20} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Terms and Condition
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('refund')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <MaterialCommunityIcons
                  name="credit-card-refund-outline"
                  color="black"
                  size={20}
                />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Refund and Cancellation Policy
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* pop up */}
        <TouchableOpacity onPress={() => navigation.navigate('help')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <AntDesign name="infocirlceo" color="black" size={20} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Help & Support
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('invite')}>
          <View style={styles.container2}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.1}}>
                <FontAwesome5 name="user-friends" color="black" size={20} />
              </View>
              <View style={{flex: 0.8}}>
                <Text
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Invite Friends
                </Text>
              </View>
              <View style={{flex: 0.1, alignItems: 'flex-end'}}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            Alert.alert("Delete Account", "Are you sure you want to Delete", [
              {
                text: "No",
                style: "no",
              },
              {
                text: "Yes",
                onPress: () => deleteUserAccount(),
              },
            ]);
          }}
        >
          <View style={styles.container2}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 0.1 }}>
                <MaterialCommunityIcons
                  name="delete-outline"
                  color="black"
                  size={20}
                />
              </View>
              <View style={{ flex: 0.8 }}>
                <Text
                  style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
                >
                  Delete Account
                </Text>
              </View>
              <View style={{ flex: 0.1, alignItems: "flex-end" }}>
                <AntDesign name="right" color="black" size={20} />
              </View>
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={signout} style={styles.container2}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.1}}>
              <MaterialIcons name="logout" color="red" size={20} />
            </View>
            <View style={{flex: 0.8}}>
              <Text style={{color: 'red', fontSize: 14, fontWeight: 'bold'}}>
                Logout
              </Text>
            </View>
            <View style={{flex: 0.1, alignItems: 'flex-end'}}></View>
          </View>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalView}>
            <TextInput
              style={{
                borderWidth: 1,
                width: '100%',
                borderColor: '#eee',
                borderRadius: 5,
              }}
              underlineColorAndroid={Platform.OS === 'android' ? 'white' : null}
            />
            <TextInput
              style={styles.textinput}
              multiline={true}
              numberOfLines={4}
              placeholder="Tell us your query..."
              underlineColorAndroid={Platform.OS === 'android' ? 'white' : null}
            />
            <View style={{flexDirection: 'row', margin: 20}}>
              <View
                style={{
                  flex: 0.5,
                  backgroundColor: '#eee',
                  borderRadius: 20,
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <FontAwesome name="whatsapp" color="black" size={18} />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    Whatsapp
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flex: 0.5,
                  backgroundColor: '#eee',
                  borderRadius: 20,
                  padding: 10,
                  marginLeft: 20,
                }}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <FontAwesome name="phone" color="black" size={18} />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 13,
                      fontWeight: 'bold',
                      marginLeft: 10,
                    }}>
                    Call Now
                  </Text>
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
  row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileimg: {
    width: 70,
    height: 90,
    borderRadius: 50,
  },
  profileimg1: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: 0,
  },
  editicon: {
    marginTop: -30,
    marginLeft: 70,
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '100%',
    marginVertical: 20,
    marginTop: 0,
  },
  shadowProp: {
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 10,
  },
  container1: {
    backgroundColor: 'white',
    elevation: 0,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  textinput: {
    // backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
    fontSize: 16,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  container2: {
    backgroundColor: 'white',
    elevation: 0,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 15,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default Profile;
