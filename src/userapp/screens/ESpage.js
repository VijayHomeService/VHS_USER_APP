import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import _debounce from 'lodash/debounce';

import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute} from '@react-navigation/native';
import MapView, {Marker} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Loader from './Loader';
import Geolocation from '@react-native-community/geolocation';

function ESpage({navigation}) {
  const [ModalVisible, setModalVisible] = useState(false);
  const [ModalVisible1, setModalVisible1] = useState(false);
  const [customerName, setcustomerName] = useState('');
  const [email, setemail] = useState('');
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [whatsappdata, setwhatsappdata] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isaddModalVisible, setaddIsModalVisible] = useState(false);

  const [selectedSlotText, setSelectedSlotText] = useState('');
  const [slotId, setslotId] = useState('');
  const openDatePickerSingle = () => setShowDatePickerSingle(true);
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [address, setaddress] = useState('');

  const [citydata, setcitydata] = useState([]);
  const [savecity, setsavecity] = useState('');
  const [user, setuser] = useState({});
  const [surveydata, setsurveydata] = useState([]);
  const [cusdata, setcusdata] = useState('');
  const route = useRoute();
  const {sdata} = route.params;
  const [checked, setChecked] = useState('first');
  const [Savedaddress, setSavedaddress] = useState();
  const [Fulladd, setFulladd] = useState('');

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calenderModel, setcalenderModel] = useState(false);
  const [mainContact, setmainContact] = useState();
  // Calculate the max date as the 10th day of the current month
  const toda = new Date();
  const minDate = new Date(toda.getFullYear(), toda.getMonth(), 11);
  const minDateString = minDate.toISOString().split('T')[0];
  const [mLag, setmLag] = useState();
  const [mLong, setmLong] = useState();

  const [LoginModal, setLoginModal] = useState(false);

  // useEffect(() => {
  //   if (!user) {
  //     setLoginModal(true);
  //     getaddress();
  //   } else {
  //     setLoginModal(false); // Ensure LoginModal is false if user data exists
  //   }
  // }, [user]); // Depend on user to update LoginModal

  const sendOTP = async () => {
    const isValidMobile = /^\d{10}$/.test(mainContact);

    if (!isValidMobile) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    try {
      const response = await axios.post(
        'https://api.vijayhomeservicebengaluru.in/api/sendotp/sendByCartBook',
        {
          mainContact: mainContact,
        },
      );

      if (response.status === 200) {
        getaddress(response.data.user);

        // alert("succesfull login");
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

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    closeCalendar(); // Close the calendar when a date is selected
  };

  const openCalendar = () => {
    setIsCalendarOpen(true);
    setcalenderModel(true);
    setDate(true);
  };

  const closeCalendar = () => {
    setIsCalendarOpen(false);
    setcalenderModel(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('address').then(value => {
      setaddress(value);
    });
    AsyncStorage.getItem('savecity').then(value => {
      setsavecity(value);
    });
    AsyncStorage.getItem('locationData').then(value => {
      if (value !== null) {
        try {
          const saveAddressData = JSON.parse(value);
          const addressValue = saveAddressData.address;
          setaddress(addressValue);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
      setSavedaddress(value);
    });
    AsyncStorage.getItem('user').then(value => {
      setuser(value);
      setcusdata(value);
    });
  }, []);

  const handleSlotClick1 = (index, startTime, endTime, id) => {
    setSelectedSlotIndex(index);
    setSelectedSlotText(`${startTime}-${endTime}`);
    setslotId(id);
  };

  const filteredData = sdata?.store_slots.filter(
    item => item.slotCity === savecity,
  );

  const today = moment();
  const tomorrow = moment().add(1, 'days');
  const nextTwoDays = moment().add(2, 'days');
  const nextthreeDays = moment().add(3, 'days');
  const [date, setDate] = useState('');
  const handleTabClick = date => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };

  const isTabActive = tab => {
    return selectedDate === tab;
  };

  useEffect(() => {
    getcity();
    getenquiryfollowup();
  }, []);

  const getcity = async () => {
    let res = await axios.get(
      'https://api.vijayhomeservicebengaluru.in/api/master/getcity',
    );
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };
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

  const addenquiry = async e => {
    e.preventDefault();
    if (!Fulladd) {
      alert('Please select the address..');
    } else {
      setModalVisible1(true);

      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);

          if (user.customerName) {
            const config = {
              url: '/addnewenquiry',
              method: 'post',
              baseURL: 'https://api.vijayhomeservicebengaluru.in/api',

              headers: {'content-type': 'application/json'},
              data: {
                date: moment().format('DD-MM-YYYY'),
                name: user?.customerName ? user?.customerName : customerName,
                Time: moment().format('h:mm:ss a'),
                mobile: user?.mainContact,
                email: user?.email ? user?.email : email,
                address: Fulladd?.address,
                deliveryAddress: Fulladd,
                category: sdata?.category,
                reference1: 'userapp',
                city: savecity,
                comment: sdata?.pName,
                intrestedfor: sdata?.serviceName,
                userId: user._id,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                addenquiryfollowup1(response.data.data);
              }
            });
          } else if (customerName) {
            const config = {
              url: '/addnewenquiry',
              method: 'post',
              baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
              // data: formdata,
              headers: {'content-type': 'application/json'},
              data: {
                date: moment().format('DD-MM-YYYY'),
                name: user?.customerName ? user?.customerName : customerName,
                Time: moment().format('h:mm:ss a'),
                mobile: user?.mainContact,
                email: user?.email ? user?.email : email,
                address: Fulladd?.address,
                deliveryAddress: Fulladd,
                category: sdata?.category,
                reference1: 'userapp',
                city: savecity,
                comment: sdata?.pName,
                intrestedfor: sdata?.serviceName,
                userId: user._id,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                console.log('response.data.data', response.data.data);
                addenquiryfollowup1(response.data.data);
              }
            });
          } else {
            alert('Please provide customer name and email');
          }
        } else {
          alert('User data not found. Please log in or create a user account.');
        }
      } catch (error) {
        console.error(error);
        alert(' Not Added');
      }
    }
  };

  const addsurvey = async e => {
    e.preventDefault();
    if (!selectedDate || !Fulladd) {
      alert('Please select the address..');
    } else {
      setModalVisible1(true);

      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);

          if (user.customerName) {
            const config = {
              url: '/addnewenquiry',
              method: 'post',
              baseURL: 'https://api.vijayhomeservicebengaluru.in/api',

              headers: {'content-type': 'application/json'},
              data: {
                date: moment().format('DD-MM-YYYY'),
                name: user?.customerName ? user?.customerName : customerName,
                Time: moment().format('h:mm:ss a'),
                mobile: user?.mainContact,
                email: user?.email ? user?.email : email,
                address: Fulladd?.address,
                deliveryAddress: Fulladd,
                category: sdata?.category,
                reference1: 'userapp',
                city: savecity,
                comment: sdata?.pName,
                intrestedfor: sdata?.serviceName,
                userId: user._id,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                console.log('response.data.data', response.data.data);
                addenquiryfollowup1(response.data.data);
              }
            });
          } else if (customerName) {
            const config = {
              url: '/addnewenquiry',
              method: 'post',
              baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
              // data: formdata,
              headers: {'content-type': 'application/json'},
              data: {
                date: moment().format('DD-MM-YYYY'),
                name: user?.customerName ? user?.customerName : customerName,
                Time: moment().format('h:mm:ss a'),
                mobile: user?.mainContact,
                email: user?.email ? user?.email : email,
                address: Fulladd?.address,
                deliveryAddress: Fulladd,
                category: sdata?.category,
                reference1: 'userapp',
                city: savecity,
                comment: sdata?.pName,
                intrestedfor: sdata?.serviceName,
                userId: user._id,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                console.log('response.data.data', response.data.data);

                addenquiryfollowup1(response.data.data);
              }
            });
          } else {
            alert('Please provide customer name and email');
          }
        } else {
          alert('User data not found. Please log in or create a user account.');
        }
      } catch (error) {
        console.error(error);
        alert(' Not Added');
      }
    }
  };
  const addenquiryfollowup1 = async edata => {
    try {
      const config = {
        url: `/addenquiryfollowup`,
        method: 'post',
        baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
        // data: formdata,
        headers: {'content-type': 'application/json'},
        data: {
          EnquiryId: edata?.EnquiryId,
          category: sdata?.category,
          folldate: moment().format('llll'),
          response: sdata?.serviceDirection === 'Survey' ? 'Survey' : 'New',
          desc: sdata?.serviceName,
          nxtfoll: selectedDate,
          appoTime: selectedSlotText,
          appoDate: selectedDate,
          slotid: slotId,
          type: 'userapp',
          userId: user._id,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          const selectedResponse = whatsappdata[0];
          makeApiCall(selectedResponse, user?.mainContact);
          setModalVisible1(false);

          navigation.navigate('ESuccess', {
            data: sdata,
            appoTime: selectedSlotText,
            appoDate: selectedDate,
          });
          // alert(
          //   'Thank for enquiry our executive will visit place as per scheduled ...',
          // );
        }
      });
    } catch (error) {
      console.error(error);
      setModalVisible1(false);
      alert('Failed to booking.Please try again later...');
    }
  };

  const getenquiryfollowup = async () => {
    let res = await axios.get(
      'https://api.vijayhomeservicebengaluru.in/api/getenquiryfollowup',
    );
    if ((res.status = 200)) {
      setsurveydata(
        res.data?.enquiryfollowup.filter(i => i.response === 'Survey'),
      );
    }
  };

  const debouncedRegionChange = _debounce(region => {
    setMarkerCoordinate({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    handleMarkerMove(region.latitude, region.longitude);
  }, 500);

  const getSlotArrayLength = (surveyData, converService) => {
    const slotIdArray = surveyData.map(surveyItem => surveyItem.slotid);
    const filteredIdCount = {};

    for (const slotId of slotIdArray) {
      if (converService.some(slotItem => slotItem.id === slotId)) {
        if (filteredIdCount[slotId]) {
          filteredIdCount[slotId]++;
        } else {
          filteredIdCount[slotId] = 1;
        }
      }
    }

    return filteredIdCount;
  };

  const slotIdCounts = getSlotArrayLength(surveydata, filteredData);
  const filteredSlotsdata = filteredData.filter(item => {
    const itemId = item.id.toString();
    if (
      slotIdCounts[itemId] !== undefined &&
      slotIdCounts[itemId] == item.Servicesno
    ) {
      // Exclude the item if both conditions are met
      return false;
    }
    return true;
  });

  const now = new Date();
  const filteredData1 = filteredSlotsdata.filter(item => {
    try {
      // Get the current date in ISO format (e.g., "2023-09-28")
      const currentDateISO = now.toISOString().split('T')[0];

      // Combine the current date with the time from item.startTime
      const dateTimeString = `${currentDateISO}T${item.startTime
        .split('-')[0]
        .trim()}`;

      // Parse the dateTimeString using moment
      const startTime = moment(dateTimeString, 'YYYY-MM-DDThh:mmA');

      if (!startTime.isValid()) {
        console.log('Invalid time format:', item.startTime);
        return false;
      }

      const startTimeDate = startTime.toDate();

      // Calculate the time difference in hours
      const timeDifferenceInHours = (startTimeDate - now) / (1000 * 60 * 60);

      // Check if the start time is at least 3 hours ahead of the current time
      return timeDifferenceInHours >= 3;
    } catch (error) {
      console.error('Error parsing date:', error);
      return false;
    }
  });

  const renderSlots = () => {
    const currentDate = new Date();
    const dateToCompare = new Date(selectedDate);

    let slots; // Declare the variable outside of the conditionals

    if (currentDate == dateToCompare) {
      slots = filteredData || [];
    } else if (currentDate > dateToCompare) {
      console.log(`The current date is after ${selectedDate}.`);
      slots = filteredData1 || [];
    } else {
      console.log('The current date is the same as 2023-09-29.');
      slots = filteredData || [];
    }
    // Sort the slots based on their start times
    slots.sort((a, b) => {
      const startTimeA = moment(a.startTime, 'hA');
      const startTimeB = moment(b.startTime, 'hA');
      return startTimeA.diff(startTimeB);
    });

    const groupedSlots = [];

    // Group slots into arrays of three
    for (let i = 0; i < slots.length; i += 3) {
      groupedSlots.push(slots.slice(i, i + 3));
    }

    return groupedSlots.map((slotGroup, groupIndex) => {
      return (
        <View key={groupIndex} style={{flexDirection: 'row', marginBottom: 10}}>
          {slotGroup.map((slot, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                handleSlotClick1(
                  groupIndex * 3 + index,
                  slot.startTime,
                  slot.endTime,
                  slot.id,
                )
              }
              style={[
                styles.slotBox,
                {
                  backgroundColor:
                    selectedSlotIndex === groupIndex * 3 + index
                      ? 'darkred'
                      : 'white',
                  color:
                    selectedSlotIndex === groupIndex * 3 + index
                      ? 'white'
                      : 'black',
                },
              ]}>
              <Text
                style={[
                  styles.boxText,
                  {
                    color:
                      selectedSlotIndex === groupIndex * 3 + index
                        ? 'white'
                        : 'black',
                  },
                ]}>
                {slot.startTime}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    });
  };

  const [mapModalVisible, setmapModalVisible] = useState(false);

  const mapModal = () => {
    setmapModalVisible(true);
    setModalVisible(false);
  };

  const [storagedata, setStoragedata] = useState([]);
  const [platNo, setPlatNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [otherData, setotherData] = useState('');

  const [saveAs, setsaveAs] = useState('');
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
  });

  useEffect(() => {
    if (mapRef.current) {
      // Update the initialRegion when selectedLocation changes
      mapRef.current.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.015, // Adjust this value for your desired zoom level
        longitudeDelta: 0.0121, // Adjust this value for your desired zoom level
      });
    }
  }, [selectedLocation]);
  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isOthersClicked, setIsOthersClicked] = useState(false);

  const handleHomePress = () => {
    setIsHomeClicked(true);
    setIsOthersClicked(false); // Reset other button's state
    setsaveAs('Home');
  };

  const handleOthersPress = () => {
    setIsHomeClicked(false); // Reset home button's state
    setIsOthersClicked(true);
    setsaveAs('other');
  };

  const homeButtonStyle = {
    borderColor: isHomeClicked ? 'orange' : 'black',
    borderWidth: 1,
    padding: 6,
    marginRight: 10,
    borderRadius: 5,
    width: 70,
    textAlign: 'center',
  };

  const othersButtonStyle = {
    borderColor: isOthersClicked ? 'orange' : 'black',
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    width: 70,
  };

  useEffect(() => {
    AsyncStorage.getItem('locationData').then(value => {
      setStoragedata(value);
    });
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the LOCATION');
      } else {
        console.log('LOCATION permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const searchLocation = async query => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk`,
      );

      if (response.data && response.data.results.length > 0) {
        const result = response.data.results[0];
        const {geometry, formatted_address} = result;

        const lat = geometry.location.lat;
        const lng = geometry.location.lng;

        setSelectedLocation({latitude: lat, longitude: lng});
        setMarkerCoordinate({latitude: lat, longitude: lng});

        setaddress(formatted_address);

        // Open the modal after searching for a location
        setIsModalVisible(true);
      } else {
        setaddress('Location not found.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const closeModal = () => {
    setaddIsModalVisible(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('savecity').then(value => {
      setsavecity(value);
    });

    AsyncStorage.getItem('locationData').then(value => {
      if (value !== null) {
        try {
          const saveAddressData = JSON.parse(value);
          setFulladd(saveAddressData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    });
  }, [mapModalVisible]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getLocation = () => {
    setModalVisible1(true);
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        setSelectedLocation({latitude: lat, longitude: long});
        setMarkerCoordinate({latitude: lat, longitude: long});

        getGeocodeFromCoordinates(lat, long);
        setModalVisible1(false);
      },
      error => {
        console.error('Error getting location:', error.message);
        setModalVisible1(false);
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  };

  const getGeocodeFromCoordinates = async (lat, long) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk`,
      );

      if (response.data && response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;

        const formattedAddress = response.data.results[0].formatted_address;
        setaddress(formattedAddress);
        setModalVisible1(false);
      } else {
        setModalVisible1(false);
        setaddress('No address found for the given coordinates.');
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
      setModalVisible1(false);
      throw error;
    }
  };
  const handleMarkerMove = async (latitude, longitude) => {
    // Reverse geocode the new coordinates to get the address
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk`,
      );

      if (response.data && response.data.results.length > 0) {
        const formattedAddress = response.data.results[0].formatted_address;
        setaddress(formattedAddress);
      } else {
        setaddress('Location not found.');
      }
    } catch (error) {
      console.error('Error reverse geocoding location:', error);
    }
  };

  const addcustomeraddresss = async e => {
    e.preventDefault();

    try {
      const config = {
        url: '/addcustomeraddress',
        method: 'post',
        baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
        headers: {'content-type': 'application/json'},
        data: {
          userId: user?._id,
          address: address,
          saveAs: saveAs,
          landmark: landmark,
          otherData: otherData,
          platNo: platNo,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          setFulladd(response.data.data);
          closeModal();
          setmapModalVisible(false);
          setModalVisible(false);
        }
      });
    } catch (error) {
      console.error(error);
      alert(
        'Address not added, Please delete one address to update another address ',
      );
    }
  };

  const handleemail = text => {
    setemail(text);
  };
  const handlecustomer = text => {
    setcustomerName(text);
  };
  const [customeraddress, setcustomerAddressdata] = useState([]);

  useEffect(() => {
    getaddress();
  }, [ModalVisible]);

  const getaddress = async () => {
    let res = await axios.get(
      `https://api.vijayhomeservicebengaluru.in/api/getcustomeraddresswithuserid/${user?._id}`,
    );
    if ((res.status = 200)) {
      setcustomerAddressdata(res.data?.customerAddress);
    }
  };
  const handleSelectedAddress = i => {
    setFulladd(i);
  };

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const getwhatsapptemplate = async () => {
    try {
      let res = await axios.get(
        'https://api.vijayhomeservicebengaluru.in/api/getresponse',
      );
      if (res.status === 200) {
        // console.log("whatsapp template", res.data);
        let getTemplateDatails = res.data?.response?.filter(
          item => item.response === sdata?.serviceDirection,
        );
        setwhatsappdata(getTemplateDatails);
      }
    } catch (error) {
      console.error('err', error);
    }
  };

  const makeApiCall = async (selectedResponse, contactNumber) => {
    const apiURL =
      'https://wa.chatmybot.in/gateway/waunofficial/v1/api/v2/message';
    const accessToken = 'c7475f11-97cb-4d52-9500-f458c1a377f4';

    const contentTemplate = selectedResponse?.template || '';

    if (!contentTemplate) {
      console.error('Content template is empty. Cannot proceed.');
      return;
    }

    const content = contentTemplate.replace(
      /\{Customer_name\}/g,
      customerName ? customerName : user.customerName,
    );
    // const contentWithNames = content.replace(
    //   /\{Executive_name\}/g,

    // );
    // const contentWithMobile = contentWithNames.replace(
    //   /\{Executive_contact\}/g,
    //   admin?.contactno
    // );

    // Replace <p> with line breaks and remove HTML tags
    const convertedText = content
      .replace(/<p>/g, '\n')
      .replace(/<\/p>/g, '')
      .replace(/<br>/g, '\n')
      .replace(/&nbsp;/g, '')
      .replace(/<strong>(.*?)<\/strong>/g, '<b>$1</b>')
      .replace(/<[^>]*>/g, '');

    const requestData = [
      {
        dst: '91' + contactNumber,
        messageType: '0',
        textMessage: {
          content: convertedText,
        },
      },
    ];
    try {
      const response = await axios.post(apiURL, requestData, {
        headers: {
          'access-token': accessToken,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // setWhatsappTemplate(response.data);
      } else {
        console.error('API call unsuccessful. Status code:', response.status);
      }
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <ScrollView>
              <View style={{margin: 10}}>
                {/* <Text
                  style={{
                    color: "black",

                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Service Details
                </Text> */}
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.3, marginTop: 10}}>
                    <Image
                      source={{
                        uri: `https://api.vijayhomesuperadmin.in/service/${sdata?.serviceImg}`,
                      }}
                      style={{width: 100, height: 100, resizeMode: 'contain'}}
                    />

                    <View style={styles.hrtag} />
                  </View>
                  <View
                    style={{
                      flex: 0.7,
                      margin: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'black',
                        fontWeight: 'bold',
                        marginTop: 5,
                      }}>
                      {sdata.serviceName}
                    </Text>

                    <Text numberOfLines={4} style={{color: 'black'}}>
                      {sdata.serviceDesc[0]?.text}
                    </Text>

                    <Text style={{marginLeft: 10, color: 'black'}}>
                      {sdata.serviceHours}
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                {sdata?.serviceDirection === 'Enquiry' ? (
                  <></>
                ) : (
                  <View style={{margin: 10, marginTop: -30}}>
                    <Text
                      style={{
                        color: 'black',

                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Select the Date
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                      <TouchableOpacity
                        style={[
                          styles.box,
                          isTabActive(today.format('YYYY-MM-DD')) && {
                            backgroundColor: 'darkred',
                          },
                        ]}
                        onPress={() => handleTabClick(today)}>
                        <Text
                          style={[
                            styles.box3,
                            isTabActive(today.format('YYYY-MM-DD')) && {
                              color: 'white',
                              fontWeight: 'bold',
                            },
                          ]}>
                          {today.format('ddd, D')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.box,
                          isTabActive(tomorrow.format('YYYY-MM-DD')) && {
                            backgroundColor: 'darkred',
                          },
                        ]}
                        onPress={() => handleTabClick(tomorrow)}>
                        <Text
                          style={[
                            styles.box3,
                            isTabActive(tomorrow.format('YYYY-MM-DD')) && {
                              color: 'white',
                              fontWeight: 'bold',
                            },
                          ]}>
                          {tomorrow.format('ddd, D')}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.box,
                          isTabActive(nextTwoDays.format('YYYY-MM-DD')) && {
                            backgroundColor: 'darkred',
                          },
                        ]}
                        onPress={() => handleTabClick(nextTwoDays)}>
                        <Text
                          style={[
                            styles.box3,
                            isTabActive(nextTwoDays.format('YYYY-MM-DD')) && {
                              color: 'white',
                              fontWeight: 'bold',
                            },
                          ]}>
                          {nextTwoDays.format('ddd, D')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                <View>
                  {sdata?.serviceDirection === 'Enquiry' ? (
                    <></>
                  ) : (
                    <View style={{margin: 10, flexDirection: 'row'}}>
                      <TouchableOpacity
                        style={[
                          styles.box,
                          isTabActive(nextthreeDays.format('YYYY-MM-DD')) && {
                            backgroundColor: 'darkred',
                          },
                        ]}
                        onPress={() => handleTabClick(nextthreeDays)}>
                        <Text
                          style={[
                            styles.box3,
                            isTabActive(nextthreeDays.format('YYYY-MM-DD')) && {
                              color: 'white',
                              fontWeight: 'bold',
                            },
                          ]}>
                          {nextthreeDays.format('ddd, D')}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{flex: 0.7, padding: 0}}
                        onPress={openCalendar}>
                        <View>
                          {!date ? (
                            <View style={styles.date}>
                              <Feather
                                name="calendar"
                                size={20}
                                color="black"
                                style={{paddingRight: 10}}
                              />
                              <Text style={{color: 'black'}}>
                                {' '}
                                Select a date
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.date}>
                              <Text
                                style={{fontWeight: 'bold', color: 'black'}}>
                                {selectedDate}
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {selectedDate ? (
                  <View style={{margin: 15}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Select the time
                    </Text>
                    <View>{renderSlots()}</View>
                  </View>
                ) : (
                  <></>
                )}
              </View>

              <TouchableOpacity
                style={styles.address}
                onPress={() => setModalVisible(true)}>
                <View style={{flex: 0.9}}>
                  <Text numberOfLines={1} style={{color: 'black'}}>
                    {Fulladd.address || Fulladd.platNo || Fulladd.landmark
                      ? `${Fulladd.platNo}, ${Fulladd.landmark},${Fulladd.address}, `
                      : 'Select the address'}
                  </Text>
                </View>
                <View style={{flex: 0.1}}>
                  <Entypo name="location-pin" size={20} />
                </View>
              </TouchableOpacity>

              {user?.customerName || user?.email ? (
                <></>
              ) : (
                <View>
                  <View style={{paddingLeft: 15}}>
                    <Text
                      style={{
                        color: 'black',
                        // backgroundColor: '#41f4ee',
                        // width: 180,
                        // borderTopRightRadius: 80,
                        // padding: 3,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      {' '}
                      Customer details
                    </Text>
                  </View>

                  <View style={{margin: 15}}>
                    <TextInput
                      placeholder="Customer Name "
                      placeholderTextColor={'grey'}
                      style={{
                        elevation: 15,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        paddingLeft: 10,
                        color: 'black',
                        height: 40,
                      }}
                      value={customerName}
                      underlineColorAndroid={
                        Platform.OS === 'android' ? 'white' : null
                      }
                      onChangeText={handlecustomer}
                    />
                    <TextInput
                      placeholder="Email "
                      placeholderTextColor={'grey'}
                      style={{
                        elevation: 15,
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderColor: 'white',
                        paddingLeft: 10,
                        marginTop: 15,
                        color: 'black',
                        height: 40,
                      }}
                      value={email}
                      onChangeText={handleemail}
                      underlineColorAndroid={
                        Platform.OS === 'android' ? 'white' : null
                      }
                    />
                  </View>
                </View>
              )}
            </ScrollView>

            <Modal isVisible={LoginModal}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setLoginModal(false)}>
                    <AntDesign name="close" size={20} color="lightgrey" />
                  </TouchableOpacity>
                  <Text style={styles.title}>MOBILE NUMBER</Text>
                  <Text style={styles.subtitle}>
                    Please enter your mobile number
                  </Text>
                  <TextInput
                    style={[styles.input, {color: 'black'}]}
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={text => setmainContact(text)}
                    value={mainContact}
                    placeholder="00000 00000"
                    underlineColorAndroid={
                      Platform.OS === 'android' ? 'white' : null
                    }
                  />
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={sendOTP}>
                    <Text style={styles.submitButtonText}>SUBMIT</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

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
            <Modal isVisible={calenderModel}>
              <View
                style={{
                  padding: 15,
                }}>
                <TouchableOpacity
                  onPress={() => setcalenderModel(false)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    backgroundColor: 'white',
                    zIndex: 1,
                    borderRadius: 50,
                  }}>
                  <AntDesign name="closecircle" color="" size={35} />
                </TouchableOpacity>
                <Calendar
                  minDate={today.toISOString().split('T')[0]}
                  onDayPress={handleDayPress} // Use the handleDayPress function
                  current={
                    selectedDate || new Date().toISOString().split('T')[0]
                  } // Use selectedDate or today's date if it's not set
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: 'orange',
                    },
                  }}
                />
              </View>
            </Modal>

            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisible}
                onRequestClose={() => {
                  // Alert.alert('Modal has been closed.');
                  setModalVisible(false);
                }}>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    backgroundColor: 'white',
                    width: '100%',
                    elevation: 15,
                    borderRadius: 10,
                    height: 'auto',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                    }}
                    style={{
                      alignSelf: 'flex-end',
                      backgroundColor: '',
                      borderWidth: 1,
                      borderRadius: 50,
                      borderColor: 'gray',
                      padding: 5,
                    }}>
                    <Feather name="x" color="black" size={29} />
                  </TouchableOpacity>
                  <View style={{margin: 15}}>
                    <View>
                      <Text style={styles.bd}>Select your address</Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: 'lightgray',
                        marginTop: 15,
                      }}
                    />
                    {customeraddress.map(i => (
                      <TouchableOpacity
                        style={{flexDirection: 'row', marginTop: 15}}
                        onPress={() => {
                          setChecked(i);

                          handleSelectedAddress(i);
                        }}>
                        <View style={{flex: 0.15}}>
                          <RadioButton
                            value={i}
                            status={checked === i ? 'checked' : 'unchecked'}
                            onPress={() => {
                              setChecked(i);

                              handleSelectedAddress(i);
                            }}
                          />
                        </View>

                        <View style={{flex: 0.85}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text
                              style={{
                                color: 'black',
                                fontWeight: 'bold',
                                fontSize: 17,
                              }}>
                              {i.saveAs === 'other' ? i.otherData : i.saveAs}
                            </Text>
                          </View>
                          <Text style={{fontSize: 13, color: 'black'}}>
                            {i.platNo},{i.landmark},{i.address}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                    <View
                      style={{
                        height: 1,
                        backgroundColor: 'lightgray',
                        marginTop: 15,
                      }}
                    />
                    <TouchableOpacity
                      onPress={mapModal}
                      style={{
                        flexDirection: 'row',
                        marginRight: 10,
                        marginTop: 15,
                      }}>
                      <AntDesign
                        name="plus"
                        size={16}
                        style={{color: 'darkred', marginTop: 2}}
                      />

                      <Text
                        style={{
                          marginLeft: 10,
                          color: 'darkred',
                          fontWeight: '600',
                          fontSize: 15,
                        }}>
                        Add new address
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      if (checked && Fulladd) {
                        setModalVisible(false);
                      } else {
                        alert('Please select an address');
                      }
                    }}
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{
                        color: 'white',
                        padding: 10,
                        textAlign: 'center',
                        backgroundColor: 'darkred',
                        marginTop: 30,
                        width: '90%',
                        borderRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 10,
                      }}>
                      Proceed
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>

            {sdata.serviceDirection === 'Survey' ? (
              <TouchableOpacity
                onPress={addsurvey}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'darkred',
                  bottom: 20,
                  padding: 10,
                  borderRadius: 5,
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Book Now
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={addenquiry}
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'darkred',
                  bottom: 20,
                  padding: 10,
                  borderRadius: 5,
                  width: '90%',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignContent: 'center',
                }}>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    Book Now
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            <Modal isVisible={mapModalVisible}>
              <TouchableOpacity
                onPress={() => setmapModalVisible(false)}
                style={{
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  backgroundColor: 'white',
                  zIndex: 1,
                  borderRadius: 50,
                }}>
                <AntDesign name="closecircle" color="darkred" size={35} />
              </TouchableOpacity>
              <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{flex: 1}}>
                  <View
                    style={{
                      position: 'absolute',
                      zIndex: 1111,
                      marginTop: 20,

                      right: 20,
                    }}>
                    <EvilIcons
                      name="search"
                      color="black"
                      size={30}
                      style={{fontWeight: 'bold'}}
                    />
                  </View>

                  <GooglePlacesAutocomplete
                    placeholder="Search location..."
                    placeholderTextColor={'grey'}
                    onPress={(data, details = null) => {
                      // 'details' is provided when fetchDetails = true
                      if (details) {
                        console.log('Latitude:', JSON.stringify(data));
                        console.log(
                          'Longitude:',
                          JSON.stringify(details?.geometry?.location),
                        );
                      }
                      searchLocation(data.description); // Update the selected location
                    }}
                    query={{
                      key: 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk', // Replace with your API key
                      language: 'en',
                    }}
                    onFail={error => console.log(error)}
                    fetchDetails={true} // Important: Enables fetching details including coordinates
                    styles={{
                      container: {
                        // backgroundColor: "darkred",
                        elevation: 15,
                        borderColor: 'orange',
                        position: 'absolute',
                        width: '100%',
                        height: 'auto',
                        zIndex: 11,
                        padding: 10,
                        color: 'black',
                      },
                      textInput: {
                        color: 'black', // Text color for input text
                      },
                      listView: {
                        backgroundColor: 'darkgrey', // Background color for the dropdown list
                      },
                      description: {color: 'black'},
                    }}
                  />

                  <View style={{flex: 1, zIndex: 1}}>
                    <MapView
                      ref={mapRef}
                      style={{width: '100%', height: 400}}
                      followsUserLocation={true}
                      onRegionChange={region => debouncedRegionChange(region)}>
                      {/* <Marker
                        coordinate={markerCoordinate}
                        pinColor="green"
                        style={{width: 50, height: 50}}>
                        <View>
                          <Image
                            source={require('../../../assets/location.png')}
                            style={{width: 45, height: '100%'}}
                          />
                        </View>
                      </Marker> */}
                    </MapView>
                    <View style={styles.markerContent}>
                      <FontAwesome name="map-pin" color={'green'} size={25} />
                    </View>

                    <View
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        zIndex: 1111,
                        backgroundColor: 'white',
                        padding: 8,
                        width: '100%',
                      }}>
                      <View>
                        <View>
                          <TouchableOpacity
                            onPress={() => getLocation()}
                            style={{
                              position: 'absolute',
                              bottom: 5,
                              zIndex: 1111,
                              // right: 0,
                              backgroundColor: 'orange',
                              padding: 10,
                              borderRadius: 5,
                            }}>
                            <Text style={{color: 'white', fontWeight: 'bold'}}>
                              Use my current location
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'black',
                            fontWeight: 'bold',
                            marginTop: 10,
                          }}>
                          Address:
                        </Text>
                        <Text style={{color: 'black', fontSize: 14}}>
                          {address}
                        </Text>

                        <View style={{marginTop: 10}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>
                              House /Flat/ Block No
                            </Text>
                            <Text style={{color: 'red'}}> *</Text>
                          </View>

                          <TextInput
                            style={[styles.input, {color: 'black'}]}
                            value={platNo}
                            onChangeText={text => setPlatNo(text)}
                            underlineColorAndroid={
                              Platform.OS === 'android' ? 'white' : null
                            }
                          />
                        </View>

                        <View style={{marginTop: 10}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.label}>
                              Landmark / Society name
                            </Text>
                            <Text style={{color: 'red'}}> *</Text>
                          </View>

                          <TextInput
                            style={[styles.input, {color: 'black'}]}
                            value={landmark}
                            onChangeText={text => setLandmark(text)}
                            underlineColorAndroid={
                              Platform.OS === 'android' ? 'white' : null
                            }
                          />
                        </View>

                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          <Text style={styles.label}>Save as</Text>
                          <Text style={{color: 'red'}}> *</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              onPress={handleHomePress}
                              style={homeButtonStyle}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 14,
                                  marginLeft: 0,
                                  backgroundColor: 'white',
                                }}>
                                Home
                              </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={handleOthersPress}
                              style={othersButtonStyle}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontSize: 14,
                                  marginLeft: 0,
                                }}>
                                Others
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        {isOthersClicked ? (
                          <View style={{marginTop: 10}}>
                            <TextInput
                              style={[styles.input, {color: 'black'}]}
                              value={otherData}
                              onChangeText={text => setotherData(text)}
                              underlineColorAndroid={
                                Platform.OS === 'android' ? 'white' : null
                              }
                            />
                          </View>
                        ) : (
                          <></>
                        )}

                        <TouchableOpacity
                          onPress={addcustomeraddresss}
                          style={{
                            backgroundColor: 'darkred',
                            padding: 8,
                            borderRadius: 5,
                            marginTop: 20,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              color: 'white',
                              fontSize: 14,
                              fontWeight: '600',
                            }}>
                            Save
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
  bd: {
    fontSize: 16,
    color: 'black',
  },
  summarytext: {
    color: 'black',
    fontSize: 14,
    // marginLeft: 5,
    fontWeight: '500',
  },
  textinput: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
    flex: 0.3,
  },
  elevation: {
    elevation: 15,
    marginTop: 20,
  },
  textinput1: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    flex: 0.4,
    marginLeft: 10,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  elevation1: {
    elevation: 15,
    flex: 0.5,
  },
  footer: {
    backgroundColor: 'red',
  },
  textinput2: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    marginTop: 5,
    width: '100%',
    padding: 20,
  },
  elevation2: {
    elevation: 15,
  },
  button1: {
    backgroundColor: 'blue',
    borderRadius: 5,
    // margin: 10,
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
  button: {
    // borderRadius: 20,
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

  button: {
    height: 50,
    width: 150,
    backgroundColor: '#140078',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#8559da',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },

  mastercardimg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  mastercardtext: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },

  button1: {
    backgroundColor: 'darkred',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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

  textinput: {
    backgroundColor: '#eee',
    width: '100%',
    fontSize: 14,
    paddingLeft: 50,
    marginTop: 20,
    borderRadius: 5,
  },
  bd: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },

  box: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
    marginRight: 5,
    padding: 7,
    borderColor: 'lightgrey',
    borderRadius: 7,
    textAlign: 'center',
    height: 'auto',
    fontSize: 10,
    elevation: 15,
    color: 'black',
    backgroundColor: 'white',
  },
  box3: {
    fontWeight: 'bold',
    color: 'black',
  },

  date: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,

    padding: 6,
    borderColor: 'lightgrey',
    borderRadius: 7,
    textAlign: 'center',
    height: 'auto',
    elevation: 15,
    backgroundColor: 'white',
  },
  textinputicon: {
    position: 'absolute',
    top: 20,
    left: 16,
  },
  bd: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  address: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 1,
    margin: 15,
    borderRadius: 10,
    flexDirection: 'row',
    elevation: 15,
    // marginTop:-15,
    borderColor: 'lightgrey',
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  slotBox: {
    flex: 1,
    // flexBasis: "33%",
    borderWidth: 1,
    padding: 6,
    fontSize: 12,
    borderColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: 'skyblue',
    elevation: 15,
    borderRadius: 5,
  },
  boxText: {
    fontSize: 11,
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
  label: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
    paddingBottom: 5,
  },
  input: {
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    borderColor: 'grey',
    paddingLeft: 15,
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
  input: {
    width: '100%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    marginTop: 20,
    fontFamily: 'Poppins-Light',
  },
  markerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 150, // Adjust as needed
    left: '50%',
    marginLeft: -25, // Half the size of the FontAwesome icon (25px)
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ESpage;
