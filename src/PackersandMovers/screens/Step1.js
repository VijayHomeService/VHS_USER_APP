import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Shimmer from 'react-native-shimmer';
import Modal from 'react-native-modal';
import {Button} from 'react-native';
import {Dimensions} from 'react-native';
import Arrow3 from '../../../assets/Arrows-03.svg';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {getAllCity} from '../../ApiServices/ApiServices';
import {ApiUrl} from '../../ApiServices/ApiUrl';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {Calendar} from 'react-native-calendars';
import TruckLoader from './TruckLoader';
import moment from 'moment';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function Step1({
  navigation,
  data,
  setpickupFloor,
  pickupFloor,
  dropFloor,
  setdropFloor,
  selected,
  setSelected,
  activeCategory,
  setActiveCategory,
}) {
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isEnabled1, setIsEnabled1] = useState(true);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  // const [activeCategory, setActiveCategory] = useState('Within city');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const [showQuote, setShowQuote] = useState(false);
  const closeModal = () => setShowQuote(false);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setemail] = useState('');
  const [city, setcity] = useState('');
  const [pickupLocationenquiry, setpickupLocationenquiry] = useState('');
  const [dropLocationenquiry, setdropLocationenquiry] = useState('');
  const [cityData, setcityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [otpLoader, setotpLoader] = useState(false);
  const [user, setuser] = useState('');
  const [mainContact, setmainContact] = useState();
  const [LoginModal, setLoginModal] = useState(false);
  const [CalendarModal, setCalendarModal] = useState(false);
  const [pickuplat, setpickuplat] = useState();
  const [pickuplong, setpickuplong] = useState();
  const [droplat, setdroplat] = useState();
  const [droplong, setdroplong] = useState();

  //distance calculate
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1); // Convert degrees to radians
    const dLon = deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers
    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const distanceInKm = haversineDistance(
    pickuplat,
    pickuplong,
    droplat,
    droplong,
  );

  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('pickup').then(value => {
      const parsedValue = JSON.parse(value);
      setPickupLocation(parsedValue);
    });
    AsyncStorage.getItem('drop').then(value => {
      const parsedValue = JSON.parse(value);
      setDropLocation(parsedValue);
    });
  }, []);

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    try {
      const response = await getAllCity(ApiUrl.GETALLCITY);

      if (response.status === 200) {
        setcityData(response.data.mastercity);
      }
    } catch (error) {
      console.error('Error getting cities:', error);
    }
  };

  const submit = async e => {
    e.preventDefault();
    if (!name) {
      Alert.alert('Validation Error', 'Please enter a name.');
      return;
    }

    if (!pickupLocationenquiry) {
      Alert.alert('Validation Error', 'Please enter a pickup location');
      return;
    }

    if (!dropLocationenquiry) {
      Alert.alert('Validation Error', 'Please enter a dropLocation. ');
      return;
    }
    if (number.length !== 10) {
      Alert.alert('Validation Error', 'Please enter a valid number. ');
      return;
    }

    try {
      const config = {
        url: '/enquiry/addenquiry',
        method: 'post',
        baseURL: ApiUrl.BASEURL, // Replace with your actual API URL
        headers: {'content-type': 'application/json'},
        data: {
          customer: name,
          email: email,
          contact1: number,
          pickupLocation: pickupLocationenquiry,
          dropLocation: dropLocationenquiry,
          type: 'userapp',
          city: city,
          userId: user?._id,
          service: data?.servicename,
          distance: distanceInKm,
          serviceDate: selected,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        closeModal();
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Thank you for inspection we will contact you soon',
          position: 'top', // You can change the position to 'bottom' or 'center'
          visibilityTime: 4000, // Duration in milliseconds
          autoHide: true,
          topOffset: 10, // Offset from the top
          zIndex: 111,
        });
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

  useEffect(() => {
    if (!user) {
      setLoginModal(true);
    } else {
      setLoginModal(false); // Ensure LoginModal is false if user data exists
    }
  }, [user]); // Depend on user to update LoginModal
  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');

        if (userData) {
          setuser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData();
  }, []);

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

  // useEffect(() => {
  //   if (activeCategory === 'Society') {
  //     AsyncStorage.setItem('drop', JSON.stringify(pickupLocation));
  //     AsyncStorage.setItem('droplat', JSON.stringify(pickuplat));
  //     AsyncStorage.setItem('droplong', JSON.stringify(pickuplong));
  //   }
  // }, [activeCategory]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{flex: 1}}>
          <TruckLoader />
        </View>
      ) : (
        <>
          <Toast style={{zIndex: 111}} />

          <ScrollView style={{padding: 5}}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollViewContent}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  activeCategory === 'Within city' &&
                    styles.activeCategoryButton,
                ]}
                onPress={() => setActiveCategory('Within city')}>
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === 'Within city' &&
                      styles.activeCategoryText,
                  ]}>
                  Within City
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  activeCategory === 'Between cities' &&
                    styles.activeCategoryButton,
                ]}
                onPress={() => setActiveCategory('Between cities')}>
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === 'Between cities' &&
                      styles.activeCategoryText,
                  ]}>
                  Between Cities (Coming Soon)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  activeCategory === 'Society' && styles.activeCategoryButton,
                ]}
                onPress={() => setActiveCategory('Society')}>
                <Text
                  style={[
                    styles.categoryText,
                    activeCategory === 'Society' && styles.activeCategoryText,
                  ]}>
                  Society
                </Text>
              </TouchableOpacity>
            </ScrollView>

            {activeCategory == 'Society' ? (
              <>
                <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign
                      name="arrowup"
                      size={13}
                      color={'white'}
                      style={styles.icon}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() =>
                      navigation.navigate('Picklocationsearch', {data: data})
                    }>
                    <Text style={styles.labelText}>Pickup Location</Text>
                    <Text
                      style={{height: 35, fontSize: 11, color: 'black'}}
                      numberOfLines={1}>
                      {pickupLocation}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.flr}>
                  <View>
                    <Text style={styles.flrhead}>Service lift available</Text>
                    <Text style={styles.flrdesc}>
                      A working service lift will reduce the overall quote
                    </Text>
                  </View>
                  <Switch
                    trackColor={{false: '#767577', true: 'green'}}
                    thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                {!isEnabled && (
                  <View style={styles.frlinput}>
                    <TextInput
                      style={styles.it1}
                      placeholder="from Floor "
                      placeholderTextColor="#999"
                      value={pickupFloor}
                      onChangeText={setpickupFloor}
                    />
                  </View>
                )}

                {!isEnabled && (
                  <View style={styles.frlinput}>
                    <TextInput
                      style={styles.it1}
                      placeholder="To Floor "
                      placeholderTextColor="#999"
                      value={dropFloor}
                      onChangeText={setdropFloor}
                    />
                  </View>
                )}
              </>
            ) : (
              <View>
                <View style={styles.locationContainer}>
                  <View style={styles.iconContainer}>
                    <AntDesign
                      name="arrowup"
                      size={13}
                      color={'white'}
                      style={styles.icon}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.inputContainer}
                    onPress={() =>
                      navigation.navigate('Picklocationsearch', {data: data})
                    }>
                    <Text style={styles.labelText}>Pickup Location</Text>
                    <Text
                      style={{height: 35, fontSize: 11, color: 'black'}}
                      numberOfLines={1}>
                      {pickupLocation}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.flr}>
                  <View>
                    <Text style={styles.flrhead}>
                      Service lift available at pickup
                    </Text>
                    <Text style={styles.flrdesc}>
                      A working service lift will reduce the overall quote
                    </Text>
                  </View>
                  <Switch
                    trackColor={{false: '#767577', true: 'green'}}
                    thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                {!isEnabled && (
                  <View style={styles.frlinput}>
                    <TextInput
                      style={styles.it1}
                      placeholder="Floor number"
                      placeholderTextColor="#999"
                      value={pickupFloor}
                      onChangeText={setpickupFloor}
                    />
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.locationContainer, {marginTop: 40}]}
                  onPress={() =>
                    navigation.navigate('Droplocationsearch', {data: data})
                  }>
                  <View style={styles.iconContainer}>
                    <View style={styles.dicon}>
                      <AntDesign name="arrowdown" size={13} color={'white'} />
                    </View>
                  </View>
                  <View style={styles.inputContainer}>
                    <Text style={styles.labelText}>Drop Location</Text>
                    <Text
                      style={{height: 35, fontSize: 11, color: 'black'}}
                      numberOfLines={1}>
                      {dropLocation}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.flr}>
                  <View>
                    <Text style={styles.flrhead}>
                      Service lift available at drop
                    </Text>
                    <Text style={styles.flrdesc}>
                      A working service lift will reduce the overall quote
                    </Text>
                  </View>
                  <Switch
                    trackColor={{false: '#767577', true: 'green'}}
                    thumbColor={isEnabled1 ? 'white' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch1}
                    value={isEnabled1}
                  />
                </View>
                {!isEnabled1 && (
                  <View style={styles.frlinput}>
                    <TextInput
                      style={styles.it1}
                      placeholder="Floor number"
                      placeholderTextColor="#999"
                      value={dropFloor}
                      onChangeText={setdropFloor}
                    />
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity
              style={styles.frlinput}
              onPress={() => setCalendarModal(true)}>
              <AntDesign name="calendar" size={22} color={'#132c57'} />
              <View>
                <Text
                  style={{
                    marginLeft: 10,
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    color: 'black',
                  }}>
                  Shifting date
                </Text>
                <Text style={{marginLeft: 10, color: 'black'}}>
                  {/* {moment(selected).format('MM-DD-YYYY')} */}
                  {selected}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowQuote(true)}>
              <Shimmer
                style={{marginTop: 40}}
                animationOpacity={0.2}
                opacity={1}>
                <Text style={styles.free}>
                  Get a house inspection for{' '}
                  <Text style={{color: 'red'}}>FREE </Text>
                </Text>
              </Shimmer>
            </TouchableOpacity>
          </ScrollView>
          <Modal isVisible={LoginModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setLoginModal(false)}>
                  <AntDesign name="close" size={20} color="lightgrey" />
                </TouchableOpacity>
                <Text style={styles.title}>LOGIN </Text>
                <Text style={styles.subtitle}>
                  Please enter your mobile number
                </Text>
                <TextInput
                  style={styles.input}
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

          <Modal isVisible={CalendarModal}>
            <View style={styles.modalContainer1}>
              <Calendar
                // Disable all previous dates by setting minDate to today's date
                minDate={getTodayDate()}
                onDayPress={day => {
                  setSelected(day.dateString);
                  setCalendarModal(false); // Assuming this closes the modal
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedDotColor: 'orange',
                    selectedColor: 'blue', // Optional: Customize the background color of the selected date
                  },
                }}
              />
            </View>
          </Modal>
        </>
      )}
      <KeyboardAvoidingView behavior={'height'} style={styles.container}>
        <Modal
          animationIn="slideInUp"
          isVisible={showQuote}
          style={{
            position: 'absolute',
            width: deviceWidth - 35,
            backgroundColor: 'white',
            shadowColor: '#000',
            marginTop: '15%',
            borderRadius: 20,
          }}
          transparent={true}>
          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              padding: 5,
            }}
            onPress={closeModal}>
            <AntDesign
              name="closecircleo"
              color={'grey'}
              size={25}
              onPress={closeModal}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
              // padding: 10,
              fontFamily: 'Poppins-Medium',
              // marginTop: 5,
            }}>
            Get quotes on your shipment
          </Text>

          <View style={{paddingLeft: 20, alignItems: 'left'}}>
            <Text
              style={{
                fontSize: 13,
                color: 'black',
                fontFamily: 'Poppins-Medium',
              }}>
              Fill up the Form
            </Text>

            {/* Form Fields */}

            {/* City Picker */}
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={city}
                style={styles.picker}
                onValueChange={itemValue => setcity(itemValue)}
                itemStyle={styles.pickerItem}>
                <Picker.Item
                  label="Select city"
                  value=""
                  style={{color: 'black'}}
                />
                {cityData?.map((i, index) => (
                  <Picker.Item
                    key={index}
                    label={i.city}
                    value={i.city}
                    style={styles.pk}
                  />
                ))}
              </Picker>
            </View>

            {/* Google Places Autocomplete for Pickup Location */}
            <GooglePlacesAutocomplete
              placeholder="Search your pickup location"
              onPress={(data, details = null) => {
                if (details) {
                  const {lat, lng} = details.geometry.location;
                  setpickuplat(lat);
                  setpickuplong(lng);
                  setpickupLocationenquiry(data.description);
                }
              }}
              query={{
                key: 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk',
                language: 'en',
              }}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  width: '90%',
                  marginTop: 20,
                },
                textInput: {
                  height: 40,
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  backgroundColor: 'grey',
                },
                listView: {
                  backgroundColor: 'darkgrey',
                },
                description: {color: 'black', fontFamily: 'Poppins-Light'},
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
            />
            {/* Google Places Autocomplete for Drop Location */}
            <GooglePlacesAutocomplete
              placeholder="Search your drop location"
              onPress={(data, details = null) => {
                if (details) {
                  const {lat, lng} = details.geometry.location;
                  setdroplat(lat);
                  setdroplong(lng);
                  setdropLocationenquiry(data.description);
                }
              }}
              query={{
                key: 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk',
                language: 'en',
              }}
              fetchDetails={true}
              styles={{
                textInputContainer: {
                  width: '90%',
                  marginTop: 20,
                },
                textInput: {
                  height: 40,
                  color: 'black',
                  fontSize: 14,
                  fontFamily: 'Poppins-Light',
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  backgroundColor: 'grey',
                },
                listView: {
                  backgroundColor: 'darkgrey',
                },
                description: {color: 'black', fontFamily: 'Poppins-Light'},
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
            />

            <TextInput
              placeholder="Name"
              placeholderTextColor="#a3a3a3"
              style={styles.txt}
              onChangeText={text => setName(text)}
              value={name}
            />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#a3a3a3"
              keyboardType="numeric"
              maxLength={10}
              style={styles.txt}
              onChangeText={text => setNumber(text)}
              value={number}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#a3a3a3"
              keyboardType="email"
              style={styles.txt}
              onChangeText={text => setemail(text)}
              value={email}
            />

            {/* Submit Button */}
            <View style={{marginHorizontal: 40, marginVertical: 10}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'orange',
                  padding: 10,
                  borderRadius: 7,
                  width: '90%',
                  marginVertical: 15,
                }}
                onPress={submit}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontFamily: 'Poppins-SemiBold',
                    textAlign: 'center',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>

      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // padding: 10,
    backgroundColor: '#f5f5f5',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    height: 70,
  },
  iconContainer: {
    marginRight: 10,
  },
  free: {
    color: 'green',
    backgroundColor: 'lightgrey',
    padding: 10,
    fontFamily: 'Poppins-Medium',
    borderRadius: 5,
  },
  icon: {
    backgroundColor: 'green',
    borderRadius: 25,
    padding: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  dicon: {
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 10,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginHorizontal: 0,
    paddingHorizontal: 0,
  },
  textInput: {
    height: 35,
    fontSize: 12,
    color: '#000',
    fontFamily: 'Poppins-Light',
    borderColor: '#ddd',
    borderRadius: 10,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  description: {
    color: '#333',
    fontFamily: 'Poppins-Light',
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  flr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  flrhead: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  flrdesc: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: 'black',
  },
  frlinput: {
    width: '100%',
    marginTop: 30,
    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  it1: {
    flex: 1,
    height: 40,
  },
  scrollViewContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d7d7d7',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Spacing between buttons
    minWidth: 10, // Ensure buttons are not too small
  },
  activeCategoryButton: {
    backgroundColor: '#FF8343',
    borderColor: '#FF8343',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  activeCategoryText: {
    color: 'white',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    width: '90%',
    marginTop: 20,
  },
  picker: {
    height: 40, // Adjust as needed
    width: '100%',
    marginTop: -7,
    marginBottom: 4,
    color: 'black',
  },
  pickerItem: {
    color: 'black', // iOS only: change color of items in the dropdown
    fontSize: 12,
  },
  pk: {
    fontSize: 13,
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  modalContainer1: {
    width: '100%',
  },
  modalContent1: {
    backgroundColor: 'white',
    // padding: 20,
    borderRadius: 5,
    width: '100%',
  },
  label: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
    paddingBottom: 5,
  },
  input: {
    width: '100%',
    // height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Poppins-Light',
    color: 'black',
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  separator: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black',
  },
  submitButton: {
    backgroundColor: 'darkred',
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    // fontWeight: "bold",
    fontFamily: 'Poppins-Bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
  },
});
