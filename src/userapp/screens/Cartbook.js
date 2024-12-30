import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  BackHandler,
  PermissionsAndroid,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Animated,
  UIManager, findNodeHandle,
  PixelRatio,
  FlatList,
} from 'react-native';

import {useFCMToken} from '../../ApiServices/FCMtoken';

import {Checkbox} from 'react-native-paper';
import _debounce from 'lodash/debounce';
import Modal from 'react-native-modal';
import axios from 'axios';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RadioButton} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {Calendar} from 'react-native-calendars';
import LottieView from 'lottie-react-native';
import {
  addToCart,
  addToCart1,
  removeMyCartItem,
  clearCart,
} from './Redux1/MyCartSlice';
import {deleteMyCartItem} from './Redux1/MyCartSlice';
import {
  addToCartaddon,
  addToCart1addon,
  removeMyCartItemaddon,
  clearCartaddon,
} from './Redux/MyCartSlice';
import {deleteMyCartItemaddon} from './Redux/MyCartSlice';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {Bubbles} from 'react-native-loader';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Geolocation from '@react-native-community/geolocation';
import Loader from './Loader';



function Cartbook({navigation}) {
  const flatListRef = useRef(null); 
 
  const scrollViewRef = useRef(null); 
  const MyCartItmes = useSelector(state => state.cart);
  const MyCartaddonItmes = useSelector(state => state.addon);
  const [locationModalVisible, setlocationModalVisible] = useState(false);
  const fcmtoken = useFCMToken();
  const dispatch = useDispatch();
  const [translateY] = useState(new Animated.Value(0));
  console.log('fcmtoken cartbook', fcmtoken);
  const screenRef = useRef();
  const [Carttotal, setCarttotal] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  useEffect(() => {
    const newCarttotal = MyCartItmes.reduce((accumulator, item) => {
      const offerPrice = parseFloat(item?.offerprice);
      const quantity = parseInt(item?.qty);

      if (!isNaN(offerPrice) && !isNaN(quantity)) {
        const subtotal = offerPrice * quantity;

        return accumulator + subtotal;
      } else {
        return accumulator;
      }
    }, 0);

    setCarttotal(newCarttotal); // Update the state with the new Carttotal
    setCouponDiscount(newCarttotal); // Optionally, update couponDiscount with the new Carttotal
  }, [MyCartItmes]); // Trigger useEffect when MyCartItems changes

  const Carttotal1 = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.planPrice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const CartSavedtotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const planPrice = parseFloat(item?.planPrice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = planPrice * quantity - offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  const total1 = MyCartaddonItmes?.reduce((accumulator, item) => {
    const subtotal = parseFloat(item.oferprice) * item.qty;
    return accumulator + subtotal;
  }, 0);

  const totaladdon1 = MyCartaddonItmes?.reduce((accumulator, item) => {
    const subtotal = parseFloat(item.planPrice) * item.qty;
    return accumulator + subtotal;
  }, 0);

  const FreqensaveAmt1 = MyCartaddonItmes?.reduce((accumulator, item) => {
    const subtotal =
      (parseFloat(item.planPrice) - parseFloat(item.oferprice)) * item.qty;

    return accumulator + subtotal;
  }, 0);

  const [isSelected, setSelection] = useState(false);
  const [useLortti, setUseLortti] = useState(false);

  const handlePress = () => {
    setUseLortti(true);
    setSelection(!isSelected);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setUseLortti(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [isSelected]); // Include isSelected in dependencies to trigger the effect when it changes
  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [time, setTime] = useState(false);
  const [ModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancelationModel, setcancelationModel] = useState(false);
  const [savecity, setsavecity] = useState('');
  const openDatePickerSingle = () => setShowDatePickerSingle(true);
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [checked, setChecked] = useState('');
  const [address, setaddress] = useState('');

  const [voucherdata, setvoucherdata] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSlotModalVisible, setSlotModalVisible] = useState(false);
  const [selectedSlotText, setSelectedSlotText] = useState('');
  const [addondata, setaddondata] = useState([]);
  const bottomSheet = useRef();
  const route = useRoute();
  //   const { plan, sdata } = route.params;
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [user, setuser] = useState('');
  const [value, setuser1] = useState('');
  const [LoginModal, setLoginModal] = useState(false);
 
  // useEffect(() => {
  //   if (!user) {
  //     setLoginModal(true);
  //     getaddress();
  //   } else {
  //     setLoginModal(false); // Ensure LoginModal is false if user data exists
  //   }
  // }, [user]); // Depend on user to update LoginModal

  const [whatsappdata, setwhatsappdata] = useState([]);
  const today = moment();
  const tomorrow = moment().add(1, 'days');
  const nextTwoDays = moment().add(2, 'days');
  const nextthreeDays = moment().add(3, 'days');

  const [date, setDate] = useState(false);
  const [Coupancode, setCoupancode] = useState('');
  const [voucherCode, setVoucherCode] = useState('');
  const [Fulladd, setFulladd] = useState('');

  const [Transaction, setTransaction] = useState('');
  const [Data, setData] = useState([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [calenderModel, setcalenderModel] = useState(false);

  const [customerName, setcustomerName] = useState('');
  const [email, setemail] = useState('');
  const [mainContact, setmainContact] = useState();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [newuser, setnewuser] = useState('');
  const [otpLoader, setotpLoader] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    // Clean up listeners
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // const sendOTP = async () => {
  //   const isValidMobile = /^\d{10}$/.test(mainContact);

  //   if (!isValidMobile) {
  //     Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
  //     return;
  //   }

  //   try {
  //     setotpLoader(true);
  //     const response = await axios.post(
  //       'https://api.vijayhomeservicebengaluru.in/api/sendotp/sendByCartBook',
  //       {
  //         mainContact: mainContact,
  //         fcmtoken: fcmtoken,

  //       },
  //     );

  //     if (response.status === 200) {
  //       getaddress(response.data.user);
  //       setotpLoader(false);
  //       setLoginModal(false);
  //       setnewuser(JSON.stringify(response.data.user));
  //       setuser(response.data.user);
  //       await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.data && error.response.data.error) {
  //       Alert.alert('Error', error.response.data.error);
  //     } else {
  //       console.error('Error:', error);

  //       Alert.alert('Error', 'An error occurred. Please try again later.');
  //     }
  //   }
  // };

  useEffect(() => {
    getwhatsapptemplate();
  }, []);

  const getwhatsapptemplate = async () => {
    try {
      let res = await axios.get(
        'https://api.vijayhomeservicebengaluru.in/api/getwhatsapptemplate',
      );
      if (res.status === 200) {
        let getTemplateDatails = res.data?.whatsapptemplate?.filter(
          item => item.templatename === 'Service Added',
        );
        setwhatsappdata(getTemplateDatails);
      }
    } catch (error) {
      console.error('err', error);
    }
  };

  useEffect(() => {
    getaddon();
  }, []);

  const getaddon = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getServiceAddOns',
    );
    if ((res.status = 200)) {
      setaddondata(
        res.data?.AddOns.filter(
          i => i.addOnsCategory === MyCartItmes[0]?.service?.serviceName,
        ),
      );
    }
  };
  const handleaddon = item => {
    dispatch(addToCartaddon(item));
  };
  const handleaddon1 = item => {
    dispatch(addToCart1addon(item));
  };

  const addcustomeraddresss = async e => {
    e.preventDefault();

    try {
      const config = {
        url: '/addcustomeraddress',
        method: 'post',
        baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
        headers: {'Content-Type': 'application/json'},
        data: {
          userId: user?._id,
          address: address,
          saveAs: saveAs,
          landmark: landmark,
          otherData: otherData,
          platNo: platNo,
          markerCoordinate: markerCoordinate,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        setFulladd(response.data.data);
        bottomSheet.current.show();
        closeModal();
        setmapModalVisible(false);
        setModalVisible(false);
        getaddress();
      }
    } catch (error) {
      console.error(error);
      alert(
        'Address not added, Please delete one address to update another address ',
      );
    }
  };

  const [customeraddress, setcustomerAddressdata] = useState([]);
  useEffect(() => {
    getaddress();
  }, [modalVisible, user]);

  const getaddress = async data => {
    let res = await axios.get(
      `https://api.vijayhomeservicebengaluru.in/api/getcustomeraddresswithuserid/${user?._id}`,
    );
    if ((res.status = 200)) {
      setcustomerAddressdata(res.data?.customerAddress);
    }
  };

  useEffect(() => {
    getwalletdeduction();
  }, []);

  const [walletdeductiondata, setwalletdeductiondata] = useState([]);

  const getwalletdeduction = async () => {
    let res = await axios.get(
      `https://api.vijayhomesuperadmin.in/api/getwalletDisc/`,
    );
    if ((res.status = 200)) {
      setwalletdeductiondata(res.data?.walletDisc);
    }
  };
  console.log('Fulladd', Fulladd);

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: Fulladd?.markerCoordinate?.latitude,
    longitude: Fulladd?.markerCoordinate?.longitude,
  });

  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: selectedLocation.latitude,
    longitude: selectedLocation.longitude,
  });

  const handleSelectedAddress = i => {
    setChecked(i);
    setFulladd(i);
    setMarkerCoordinate({
      latitude: i.markerCoordinate?.latitude,
      longitude: i.markerCoordinate?.longitude,
    });
  };
 

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // Update the initialRegion when selectedLocation changes
      mapRef.current.animateToRegion({
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        latitudeDelta: 0.001, // Adjust this value for your desired zoom level
        longitudeDelta: 0.001, // Adjust this value for your desired zoom level
      });
    }
  }, [selectedLocation]);

  // Calculate the max date as the 10th day of the current month
  const toda = new Date();

  const handleBackButton = () => {
    if (showWebView) {
      // If the modal is open, close it
      setShowWebView(false);
      return true; // Prevent default behavior (exit the app)
    } else {
      // If the modal is not open, navigate to another screen
      navigation.navigate('cart');
      return true;
    }
  };

  useEffect(() => {
    // Subscribe to the hardware back button press event
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => {
      backHandler.remove();
    };
  }, [navigation, showWebView]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('cart');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // Address validation
  const [isAddressSelected, setAddressSelected] = useState(false);
  const [isAddressConfirmed, setAddressConfirmed] = useState(false);

  const handleBookNowClick = () => {
    // if (isAddressSelected) {
    bottomSheet.current.show();
    // } else {
    // alert('Please select an address before booking.');
    // }
  };

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    closeCalendar();
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




 
  
  const scrollToPosition = () => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.RCTView.Commands.scrollTo,
      [0, 50], // Adjust to scroll by 100px
    );
  };
  const [selectedIndex, setSelectedIndex] = useState(null); 
  const handleTabClick = (date) => {
  
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    setSlotModalVisible(true);
      scrollToNext(); 
    console.log('Selected date:', formattedDate); 
    
  
  };
  const scrollToNext = (index) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 100, animated: true }); 
    }
  };

   
   const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        padding: 15,
        backgroundColor: 'lightgray',
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
      }}
      onPress={() => handleTabClick(item, index)}
    >
      <Text style={{ fontSize: 16, color: 'black' }}>
        {item.label}: {item.date}
      </Text>
    </TouchableOpacity>
  );
  const isTabActive = tab => {
    return selectedDate === tab;
  };

  const deleteAllCartItems = () => {
    MyCartItmes.forEach(item => {
      dispatch(deleteMyCartItem({id: item.id}));
    });
  };

  const deleteAllCartaddonItems = () => {
    MyCartaddonItmes.forEach(item => {
      dispatch(deleteMyCartItemaddon({id: item.id}));
    });
  };
  const handle = item => {
    dispatch(addToCart1(item));
  };

  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const addressData = await AsyncStorage.getItem('address');
        console.log('addressData', addressData);

        if (userData) {
          setuser(JSON.parse(userData));
          setuser1(JSON.parse(userData));
        }

        if (addressData) {
          setFulladd(JSON.parse(addressData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData();
  }, []);

  const [vijay, setVijay] = useState('');
  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData1 = async () => {
      try {
        const userData = await AsyncStorage.getItem('usedVoucherCodes');
        if (userData) {
          setVijay(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData1();
  }, []);

  const joinedNames = MyCartItmes.map(item => {
    const serviceName = item.service?.serviceName || ''; // Get serviceName or an empty string if it's undefined
    return `${serviceName}+${item.planName}(${item.qty})`;
  });
  const joinedaddonNames = MyCartaddonItmes.map(item => {
    const serviceName = item.planName || ''; // Get serviceName or an empty string if it's undefined
    return `${item.planName}(${item.qty})`;
  });

  const joinedPlanNames = joinedNames.join(', ');
  const joinedPlanaddonNames = joinedaddonNames.join(', ');

  const treatmentdata = MyCartItmes.map(item => item.service?.serviceName);

  const abc1 = treatmentdata.join(', ');
  const joinedServiceNames = abc1;

  useEffect(() => {
    getvoucher();
    // getaddon();
    // getservice();
  }, []);

  const getvoucher = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getvoucher',
    );
    if (res.status === 200) {
      // Extract all unique categories from MyCartItems
      const uniqueCategories = Array.from(
        new Set(MyCartItmes.map(item => item.service?.category)),
      );

      // Filter voucherdata to include only items that match any category from MyCartItems
      const filteredVoucherData = res.data?.voucher.filter(
        i => i.category === MyCartItmes[0]?.category,
      );

      setvoucherdata(filteredVoucherData);
    }
  };

  const [validationMessage, setValidationMessage] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const applyCouponCode = async () => {
    // Fetch the user's data from AsyncStorage
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);

      if (user.voucherCode === voucherCode) {
        alert('Coupon code already applied');
        return Carttotal;
      }

      const appliedCoupon = voucherdata.find(
        item => item.voucherCode === voucherCode,
      );

      if (appliedCoupon) {
        const discountPercentageValue = parseInt(
          appliedCoupon.discountPercentage,
          10,
        );
        const discountAmount = (discountPercentageValue / 100) * Carttotal;
        const getResults = Carttotal - discountAmount;

        setCouponDiscount(getResults);
        setValidationMessage('');
        setAppliedCoupon(appliedCoupon);

        // Update the user's voucherCode in AsyncStorage to prevent further use
        user.voucherCode = voucherCode;
        await AsyncStorage.setItem('user', JSON.stringify(user));

        return getResults;
      } else {
        setValidationMessage('Invalid coupon');
        setAppliedCoupon(null);
        setCouponDiscount(Carttotal);
        return Carttotal;
      }
    } else {
      console.error('User data not found in AsyncStorage');
      alert('User data not found. Please log in or create a user account.');
      return Carttotal;
    }
  };

  const handleSlotClick1 = (index, startTime) => {
    
    setSelectedSlotIndex(index);
    setSelectedSlotText(`${startTime}`);
    setSelectedSlot(`${startTime}`); 
  };
  
  const filteredData =
    MyCartItmes[0]?.service?.store_slots?.filter(
      item => item.slotCity === savecity,
    ) || []; // Set filteredData to an empty array if undefined

  const now = new Date();
  const filteredData1 = filteredData.filter(item => {
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
        return false;
      }

      const startTimeDate = startTime.toDate();

      // Calculate the time difference in hours
      const timeDifferenceInHours = (startTimeDate - now) / (1000 * 60 * 60);

      // Check if the start time is at least 3 hours ahead of the current time
      return timeDifferenceInHours >= 2;
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
      slots = filteredData1 || [];
    } else {
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

    return groupedSlots.map((slotGroup, groupIndex) => (
      <View key={groupIndex} style={{flexDirection: 'row', marginBottom: 10}}>
        {slotGroup.map((slot, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              Fulladd ? setModalVisible(false) : setModalVisible(true);
              handleSlotClick1(
                groupIndex * 3 + index,
                slot.startTime,
                slot.endTime,
              );
            }}
            style={[
              styles.slotBox,
              {
                backgroundColor:
                  selectedSlotIndex === groupIndex * 3 + index
                    ? 'darkred'
                    : 'lightpink',
                color:
                  selectedSlotIndex === groupIndex * 3 + index
                    ? 'white'
                    : 'white',
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
                  fontWeight: 'bold',
                },
              ]}>
              {slot.startTime}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  const calculateExpiryDate = (selectedDate, servicePeriod) => {
    let monthsToAdd = 0;

    // Determine the number of months to add based on service period
    if (servicePeriod === 'monthly') {
      monthsToAdd = 1;
    } else if (servicePeriod === 'quart') {
      monthsToAdd = 3;
    } else if (servicePeriod === 'half') {
      monthsToAdd = 6;
    } else if (servicePeriod === 'year') {
      monthsToAdd = 12;
    }

    // Calculate the expiryDate by adding the months
    const expiryDate = moment(selectedDate)
      .add(monthsToAdd, 'months')
      .format('YYYY-MM-DD');

    return expiryDate;
  };

  const servicePeriod = 1;
  const serviceFrequency = 1;
  const expiryDate = calculateExpiryDate(selectedDate, servicePeriod);
  const sDate = moment(selectedDate, 'YYYY-MM-DD');
  const eDate = moment(expiryDate, 'YYYY-MM-DD');

  const totalDays = Math.ceil(eDate.diff(sDate, 'days'));
  const interval = Math.ceil(totalDays / serviceFrequency);

  const dividedDates = [];

  const sf = serviceFrequency ? serviceFrequency : '1';
  for (let i = 0; i < sf; i++) {
    const date = sDate
      .clone()
      .add(interval * i, 'days')
      .format('YYYY-MM-DD');
    dividedDates.push(date);
  }

  const dividedamtCharges = [Carttotal];

  const sAmtDate = moment(selectedDate, 'YYYY-MM-DD');
  const eamtDate = moment(selectedDate, 'YYYY-MM-DD');
  const amtFrequency = 1;
  const totalamtDays = Math.ceil(eamtDate.diff(sAmtDate, 'days'));
  const intervalamt = Math.ceil(totalamtDays / amtFrequency);
  // const dividedamtCharge = Math.ceil(remainingAmt / amtFrequency);

  const dividedamtDates = [];
  // const dividedamtCharges = [];

  for (let i = 0; i < amtFrequency; i++) {
    const date = sDate
      .clone()
      .add(intervalamt * i, 'days')
      .format('YYYY-MM-DD');
    dividedamtDates.push(date);
  }

  const [paymentMode, setpaymentMode] = useState('');
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // const booking = a => {
  //   setpaymentMode(a);

  //   addtreatmentdetails(a);
  // };

  useEffect(() => {
    getpaymentstatus();
  }, [user]);

  const getpaymentstatus = async () => {
    let res = await axios.get(
      `https://api.vijayhomeservicebengaluru.in/api/payment/paymentstatus/${user._id}`,
    );
    if ((res.status = 200)) {
      setData(
        res.data?.getPaymentStatus.filter(i => i.code === 'PAYMENT_SUCCESS'),
      );
    }
  };

  let discountAmount = 0; // Initialize discountAmount

  const vAmount = user?.wAmount;

  const dis = walletdeductiondata[0]?.Discount;
  discountAmount = vAmount <= dis ? vAmount : (vAmount * dis) / 100; // Update discountAmount based on conditions

  const walletdetailsAdd = async a => {
    try {
      const config = {
        url: '/RechargeWalletAmount',
        method: 'post',
        baseURL: 'https://api.vijayhomesuperadmin.in/api',
        headers: {'content-type': 'application/json'},
        data: {
          userId: user?._id,

          desc: 'Purchase the service',
          wAmt: discountAmount,
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
        }
      });
    } catch (error) {
      console.log(error.response.data.error);
      // alert(error.response.data.error);
    }
  };

  ///map setup
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
    backgroundColor: 'white',
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
    setIsModalVisible(false);
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

  const debouncedRegionChange = _debounce(region => {
    setMarkerCoordinate({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    handleMarkerMove(region.latitude, region.longitude);
  }, 500);

  const handleemail = text => {
    setemail(text);
  };
  const handlecustomer = text => {
    setcustomerName(text);
  };

  const makeApiCall = async (selectedResponse, contactNumber) => {
    console.log('hello');
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
    const serviceName = content.replace(
      /\{Service_name\}/g,
      MyCartItmes[0]?.service.serviceName,
    );
    const slotTiming = serviceName.replace(
      /\{Slot_timing\}/g,
      selectedSlotText,
    );
    const serivePrice = slotTiming.replace(
      /\{Service_amount\}/g,
      couponDiscount,
    );
    const serviceDate = serivePrice.replace(/\{Service_date\}/g, selectedDate);
    // const serviceVideoLink = serviceDate.replace(
    //   /\{Video_link\}/g,
    //   selectedVideoLink
    // );

    // // Replace <p> with line breaks and remove HTML tags
    const convertedText = serviceDate
      .replace(/<p>/g, '\n')
      .replace(/<\/p>/g, '')
      .replace(/<br>/g, '\n')
      .replace(/&nbsp;/g, '')
      .replace(/<strong>(.*?)<\/strong>/g, '<b>$1</b>')
      .replace(/<[^>]*>/g, '');

    // const requestData = [
    //   {
    //     dst: "91" + contactNumber,
    //     messageType: "0",
    //     textMessage: {
    //       content: convertedText,
    //     },
    //   },
    // ];

    try {
      const response = await axios.post(
        'https://api.vijayhomeservicebengaluru.in/send-message',
        {
          mobile: contactNumber,
          msg: convertedText,
        },
      );

      if (response.status === 200) {
        deleteAllCartaddonItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const abc = isSelected
    ? couponDiscount + total1 - discountAmount
    : couponDiscount + total1;
  const st = String(abc);

  const [paymentData, setPaymentData] = useState({
    merchant_id: '3663823',
    order_id: '0001',
    currency: 'INR',
    amount: '1000',

    cancel_url: 'http://localhost:3000/payment-cancel',
    language: 'EN',
  });

  const ab = couponDiscount + total1;
  const bc = ab - discountAmount;

  // Calculate vendorCharge as 35% of `ab`
  const vendorCharge = (ab * 35) / 100;
  const vendorCharge1 = (bc * 35) / 100;

  // Calculate GST based on whether `isSelected` is true or false
  const GST = isSelected
    ? (vendorCharge1 * 18) / 100 // GST on `ab - discountAmount` if `isSelected` is true
    : (vendorCharge * 18) / 100; // GST on `vendorCharge` if `isSelected` is false

  console.log('yogesh', ab - discountAmount, vendorCharge1);
  // Ensure GST is a fixed decimal number
  const finalGST = GST.toFixed(2);
  console.log('finalGST', finalGST);

  const YogiGT = isSelected
    ? couponDiscount + total1 - discountAmount + parseInt(finalGST)
    : couponDiscount + total1 + parseInt(finalGST);

  const finalGrandTotal = YogiGT.toFixed(2);
  console.log('YogiGT', YogiGT.toFixed(2));

  const handleSubmit1 = async e => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select the Service date  ');

      return;
    }
    if (!selectedSlotText) {
      alert('Please select the Service slot  ');

      return;
    }
    try {
      const paydata1 = {
        customerData: {
          _id: user?._id,
          EnquiryId: user?.EnquiryId,
          customerName: user?.customerName,
          category: user?.category,
          mainContact: user?.mainContact,
          email: user?.email,
          approach: user?.approach,
        },
        customerData: user?._id,
        dividedDates: dividedDates.length ? dividedDates : [selectedDate],
        customerName: customerName,
        email: email,
        userId: user?._id,
        dividedamtCharges: dividedamtCharges,
        dividedamtDates: dividedamtDates,
        paymentMode: 'Trying to booking',
        cardNo: user?.cardNo,
        category: MyCartItmes[0]?.service?.category,
        contractType: 'One Time',
        service: MyCartItmes[0]?.service?.serviceName,
        serviceID: MyCartItmes[0]?.service?._id,
        serviceCharge: Carttotal,
        dateofService: selectedDate,
        selectedSlotText: selectedSlotText,
        serviceFrequency: 1,
        startDate: selectedDate,
        expiryDate: selectedDate,
        firstserviceDate: selectedDate,
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('LT'),
        type: 'website',
        desc: joinedPlanNames + joinedPlanaddonNames,
        city: savecity,
        discAmt: isSelected ? discountAmount : 0,
        GrandTotal: finalGrandTotal,

        TotalAmt: Carttotal + totaladdon1,
        couponCode: Coupancode,
        totalSaved: CartSavedtotal + FreqensaveAmt1,
        markerCoordinate: markerCoordinate,
        deliveryAddress: Fulladd,
        amount: isSelected
          ? couponDiscount + total1 - discountAmount
          : couponDiscount + total1,
        number: user.number,
        MUID: 'MUID' + Date.now(),
        transactionId: 'T' + Date.now(),
      };

      const updatedRedirectUrl = `https://api.vijayhomeservicebengaluru.in/api/payment/CCAvenueUserAppstatus/${paydata1.transactionId}/${paydata1.userId}/${paydata1.serviceID}`;

      const paymentString = new URLSearchParams({
        merchant_id: paymentData.merchant_id,
        order_id: paymentData.order_id,
        currency: paymentData.currency,
        amount: paymentData.amount,
        redirect_url: updatedRedirectUrl,
        cancel_url: paymentData.cancel_url,
        language: paymentData.language,
      }).toString();

      try {
        const response = await axios.post(
          'https://api.vijayhomeservicebengaluru.in/api/CCAvenue/CCAvenueUserApppayment',
          {payment_string: paymentString, updateddata: paydata1},
        );
        console.log('paymentString:', paymentString);

        if (response && response.data && response.data.url) {
          setShowWebView(true);
          setPaymentUrl(response.data.url);
        }
      } catch (error) {
        console.error(
          'Error initiating payment:',
          error.response || error.message || error,
        );
      }
    } catch (error) {}
  };

  const addtreatmentdetails = async () => {
    if (!selectedDate) {
      alert('Please select the Service date  ');

      return;
    }
    if (!selectedSlotText) {
      alert('Please select the Service slot  ');

      return;
    }
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);

        if (user.customerName) {
          if (!Fulladd?.address) {
            alert('Please select the address  ');
          } else {
            setModalVisible1(true);
            // user.voucherCode = voucherCode;
            const config = {
              url: 'https://api.vijayhomeservicebengaluru.in/api/addservicedetails',
              method: 'post',

              headers: {'content-type': 'application/json'},
              data: {
                customerData: user,
                customerName: customerName,
                email: email,
                dividedDates: dividedDates ? dividedDates : selectedDate,
                dividedamtCharges: dividedamtCharges,
                dividedamtDates: dividedamtDates,
                cardNo: user?.cardNo,
                category: MyCartItmes[0]?.category,
                contractType: 'One Time',
                service: MyCartItmes[0]?.service?.serviceName,
                serviceID: MyCartItmes[0]?.service?._id,
                serviceCharge: Carttotal,
                dateofService: selectedDate,
                selectedSlotText: selectedSlotText,
                serviceFrequency: 1,
                startDate: selectedDate,
                // planName: plan?.pName,
                expiryDate: expiryDate,
                firstserviceDate: selectedDate,
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('LT'),
                type: 'userapp',
                desc: joinedPlanNames + joinedPlanaddonNames,
                city: savecity,
                userId: user?._id,
                deliveryAddress: Fulladd,
                // serviceImg: sdata?.serviceImg,
                // AddOns: MyCartItmes,
                discAmt: isSelected ? discountAmount : 0,
                // Carttotal: Carttotal,
                GrandTotal: finalGrandTotal,
                paymentMode: 'cash',
                TotalAmt: Carttotal + totaladdon1,
                couponCode: Coupancode,
                totalSaved: CartSavedtotal + FreqensaveAmt1,
                markerCoordinate: markerCoordinate,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                const selectedResponse = whatsappdata[0];
                deleteAllCartItems();
                deleteAllCartaddonItems();
                setModalVisible1(false);
                clearCartaddon();
                bottomSheet.current.close();
                setlocationModalVisible(false);
                // setModalVisible1(false);
                // advp(response.data.data);
                makeApiCall(selectedResponse, user.mainContact);
                AsyncStorage.setItem(
                  'user',
                  JSON.stringify(response.data.user),
                );
                navigation.navigate('success', {data: response.data.data});
                dispatch(clearCart());
                dispatch(clearCartaddon());
                if (isSelected) {
                  walletdetailsAdd();
                }
              }
            });
          }
        } else if (customerName) {
          if (!Fulladd) {
            alert('Please select the address  ');
          }
          // if (couponDiscount < 700) {
          //   alert("Please add morethan 700Rs ");
          // }
          else {
            setModalVisible1(true);
            const config = {
              url: 'https://api.vijayhomeservicebengaluru.in/api/addservicedetails',
              method: 'post',

              headers: {'content-type': 'application/json'},
              data: {
                customerData: {
                  _id: user._id,
                  cardNo: user?.cardNo,
                  customerName: customerName,
                  email: email,
                  mainContact: user?.mainContact,
                  type: user?.type,
                  city: savecity,
                },
                customerName: customerName,
                email: email,
                dividedDates: dividedDates ? dividedDates : selectedDate,
                dividedamtCharges: dividedamtCharges,
                dividedamtDates: dividedamtDates,
                cardNo: user?.cardNo,
                category: MyCartItmes[0]?.category,
                contractType: 'One Time',
                service: MyCartItmes[0]?.service?.serviceName,
                serviceID: MyCartItmes[0]?.service?._id,
                serviceCharge: Carttotal,
                dateofService: selectedDate,
                selectedSlotText: selectedSlotText,
                serviceFrequency: 1,
                startDate: selectedDate,
                discAmt: isSelected ? discountAmount : 0,
                expiryDate: expiryDate,
                firstserviceDate: selectedDate,
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('LT'),
                type: 'userapp',
                desc: joinedPlanNames + joinedPlanaddonNames,
                city: savecity,
                userId: user?._id,
                deliveryAddress: Fulladd,
                GrandTotal: finalGrandTotal,
                paymentMode: 'cash',
                TotalAmt: Carttotal + totaladdon1,
                couponCode: Coupancode,
                totalSaved: CartSavedtotal + FreqensaveAmt1,
                markerCoordinate: markerCoordinate,
              },
            };
            await axios(config).then(function (response) {
              if (response.status === 200) {
                const selectedResponse = whatsappdata[0];
                deleteAllCartItems();
                deleteAllCartaddonItems();
                setModalVisible1(false);
                bottomSheet.current.close();
                setlocationModalVisible(false);
                // advp(response.data.data);

                makeApiCall(selectedResponse, user.mainContact);
                if (isSelected) {
                  walletdetailsAdd();
                }
                AsyncStorage.setItem(
                  'user',
                  JSON.stringify(response.data.user),
                );
                dispatch(clearCart());
                dispatch(clearCartaddon());
                navigation.navigate('success', {data: response.data.data});
              }
            });
          }
        } else {
          alert('Please provide customer name and email  ');
          setModalVisible1(false);
        }
      } else {
        alert('User data not found. Please log in or create a user account.');
        setModalVisible1(false);
      }
    } catch (error) {
      console.error(error);
      setModalVisible1(false);
      alert(' Not Added');
    }
  };
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
         
          {showWebView ? (
            <View style={{flex: 1}}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}>
                Please wait while you get redirected
              </Text>
              <WebView source={{uri: paymentUrl}} style={{flex: 1}} />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  textAlign: 'center',
                  backgroundColor: 'white',
                }}>
                Please note: By any chance if you close the app directly we're
                not responsible for any deductions that happens and you may not
                be liable for a refund{' '}
              </Text>
            </View>
          ) : (
            <View style={{flex: 1}}>
              {useLortti && (
                <LottieView
                  source={require('../../../assets/wallet.json')}
                  autoPlay
                  loop
                  width={'100%'}
                  height={'100%'}
                  style={{position: 'absolute', zIndex: 11}}
                />
              )}
              {time == true ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: 'white',
                  }}>
                  <Bubbles
                    size={6}
                    color="blue"
                    style={{textAlign: 'center'}}
                  />
                </View>
              ) : (
                <View style={styles.container}>
                  <ScrollView style={{marginBottom: 30}}>
                    <View style={{margin: 15}}>
                      <Text
                        style={{
                          color: 'black',

                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Service Details
                      </Text>

                      <ScrollView>
                        {MyCartItmes.map(item => (
                          <View style={styles.card}>
                            <View style={{flexDirection: 'row'}}>
                              <View style={{flex: 0.7}}>
                                <View style={{marginLeft: 5}}>
                                  <View></View>
                                  <Text
                                    style={{
                                      fontSize: 16,
                                      fontWeight: '600',
                                      color: 'darkred',
                                    }}>
                                    {item.planName}
                                  </Text>
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      fontWeight: '600',
                                      color: 'black',
                                    }}>
                                    {item.service?.serviceName}
                                  </Text>

                                  <View style={{flexDirection: 'row'}}>
                                    <Text
                                      style={{
                                        marginLeft: 10,
                                        color: 'grey',
                                        textDecorationLine: 'line-through',
                                      }}>
                                      <FontAwesome name="rupee" size={14} />
                                      {item.planPrice}
                                    </Text>
                                    <Text
                                      style={{marginLeft: 10, color: 'grey'}}>
                                      <FontAwesome name="rupee" size={14} />{' '}
                                      {item.offerprice}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                              <View style={{flex: 0.3}}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                  }}>
                                  <FontAwesome
                                    name="rupee"
                                    size={14}
                                    color="black"
                                    style={{marginTop: 4}}
                                  />

                                  <Text
                                    style={{
                                      textAlign: 'center',
                                      marginLeft: 2,
                                      color: 'black',
                                      fontSize: 15,
                                      fontWeight: '500',
                                    }}>
                                    {item.qty * item.offerprice}
                                  </Text>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    backgroundColor: 'green',
                                    elevation: 15,
                                    padding: 5,
                                    justifyContent: 'center',
                                    width: 100,
                                  }}>
                                  <TouchableOpacity
                                    style={{}}
                                    onPress={() => {
                                      if (item.qty > 1) {
                                        dispatch(removeMyCartItem(item));
                                      } else {
                                        dispatch(deleteMyCartItem(item.id));
                                      }
                                    }}>
                                    <Text>
                                      <AntDesign
                                        name="minuscircleo"
                                        size={18}
                                        color="white"
                                      />{' '}
                                    </Text>
                                  </TouchableOpacity>
                                  <Text
                                    style={{color: 'orange', marginLeft: 5}}>
                                    {item.qty}
                                  </Text>

                                  <TouchableOpacity
                                    style={{marginLeft: 10}}
                                    onPress={() => handle(item)}>
                                    <Text>
                                      <AntDesign
                                        name="pluscircleo"
                                        size={18}
                                        color="white"
                                      />
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    </View>

                    {addondata.length > 0 ? (
                      <View style={{backgroundColor: 'white', margin: 10}}>
                        <Text
                          style={{
                            color: 'black',

                            fontSize: 18,
                            fontWeight: 'bold',
                          }}>
                          Frequently Added Together
                        </Text>

                        <View>
                          <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            {addondata.map(i => {
                              // Replace this condition with your specific condition for checking if an item is in the cart
                              const cartItem = MyCartaddonItmes.find(
                                cartItem => cartItem.id === i._id,
                              );
                              // Check if the item is in the cart
                              const isItemInCart = !!cartItem;

                              return (
                                
                                <View
                                  key={i.addOnsId} // Add a unique key for each item in the map function
                                  style={{
                                    width: 180,
                                    // borderWidth: 2,
                                    borderColor: '#FFD700',
                                    // backgroundColor: '#FFFFE0',
                                    borderRadius: 10,
                                    margin: 10,
                                    // height: 130,
                                  }}>
                                  <View>
                                    <Image
                                      source={{
                                        uri: `https://api.vijayhomesuperadmin.in/addOns/${i.addOnsImage}`,
                                      }}
                                      style={{
                                        width: '100%',
                                        height: 150,
                                      }}
                                    />
                                    {isItemInCart ? (
                                      <View
                                        style={{
                                          flexDirection: 'row',
                                          // marginTop: 20,
                                          justifyContent: 'center',
                                          // borderWidth: 1,
                                          padding: 2,
                                          width: '70%',
                                          justifyContent: 'center',
                                          alignContent: 'center',
                                          alignSelf: 'center',
                                          // borderColor: 'darkred',
                                          borderRadius: 5,
                                          elevation: 15,
                                          backgroundColor: 'darkred',
                                          position: 'absolute',
                                          bottom: 10,
                                        }}>
                                        <TouchableOpacity
                                          style={{}}
                                          onPress={() => {
                                            if (cartItem.qty > 1) {
                                              dispatch(
                                                removeMyCartItemaddon(cartItem),
                                              );
                                            } else {
                                              dispatch(
                                                deleteMyCartItemaddon(
                                                  cartItem.id,
                                                ),
                                              );
                                            }
                                          }}>
                                          <Text>
                                            <AntDesign
                                              name="minuscircleo"
                                              size={15}
                                              color="white"
                                            />
                                          </Text>
                                        </TouchableOpacity>
                                        <Text
                                          style={{
                                            marginLeft: 10,
                                            color: 'white',
                                          }}>
                                          {cartItem.qty}
                                        </Text>

                                        <TouchableOpacity
                                          style={{marginLeft: 10}}
                                          onPress={() =>
                                            handleaddon1(cartItem)
                                          }>
                                          <Text>
                                            <AntDesign
                                              name="pluscircleo"
                                              size={15}
                                              color="white"
                                            />
                                          </Text>
                                        </TouchableOpacity>
                                      </View>
                                    ) : (
                                      <TouchableOpacity
                                        style={{
                                          // borderWidth: 1,
                                          width: 80,
                                          borderColor: 'grey',
                                          borderRadius: 5,
                                          position: 'absolute',
                                          bottom: 10,
                                          justifyContent: 'center',
                                          alignSelf: 'center',
                                          elevation: 15,
                                          backgroundColor: 'darkred',
                                          // borderColor: 'darkred',
                                        }}
                                        onPress={() => handleaddon(i)}>
                                        <Text
                                          style={{
                                            textAlign: 'center',
                                            fontSize: 13,
                                            padding: 1,
                                            fontWeight: 'bold',
                                            color: 'white',
                                          }}>
                                          Add
                                        </Text>
                                      </TouchableOpacity>
                                    )}
                                  </View>
                                  <View style={{padding: 5}}>
                                    <View>
                                      <Text
                                        style={styles.summarytext}
                                        numberOfLines={2}>
                                        {i.addOnsName}
                                      </Text>
                                    </View>

                                    <View
                                      style={{
                                        flexDirection: 'row',
                                      }}>
                                      <Text
                                        style={{
                                          textDecorationLine: 'line-through',
                                          fontSize: 14,
                                          fontWeight: '700',
                                          color: '#513b1c',
                                        }}>
                                        <FontAwesome name="rupee" size={12} />
                                        {cartItem?.qty
                                          ? cartItem?.qty * i.addOnsPrice
                                          : i.addOnsPrice}
                                      </Text>
                                      <Text
                                        style={{
                                          marginLeft: 10,
                                          fontWeight: 'bold',
                                          color: '#e41b17',
                                        }}>
                                        <FontAwesome name="rupee" size={12} />
                                        {cartItem?.qty
                                          ? cartItem?.qty * i.addOnsOfferPrice
                                          : i.addOnsOfferPrice}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              );
                            })}
                          </ScrollView>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}


                   
                    <View style={styles.container}>
                    
                      <View style={{margin: 15, marginTop: -10,flex:1}} ref={screenRef}>
                      
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
                            onPress={() => 
                            
                              handleTabClick(today)
                              
                            }>
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
                            onPress={() =>
                            handleTabClick(tomorrow)
                    
                             
                            }>
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
                            onPress={() => 
                              handleTabClick(nextTwoDays)
                             
                             
                            }>
                            <Text
                              style={[
                                styles.box3,
                                isTabActive(
                                  nextTwoDays.format('YYYY-MM-DD'),
                                ) && {
                                  color: 'white',
                                  fontWeight: 'bold',
                                },
                              ]}>
                              {nextTwoDays.format('ddd, D')}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        
                      </View>
                     
                      <View style={{margin: 15, flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={[
                            styles.box,
                            isTabActive(nextthreeDays.format('YYYY-MM-DD')) && {
                              backgroundColor: 'darkred',
                            },
                          ]}
                          onPress={() => 
                            handleTabClick(nextthreeDays)
                        
                          }>
                          <Text
                            style={[
                              styles.box3,
                              isTabActive(
                                nextthreeDays.format('YYYY-MM-DD'),
                              ) && {
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
                                <Text>Select a date</Text>
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
    
                      <Modal
  animationType="slide"
  transparent={true}
  visible={isSlotModalVisible}
  onRequestClose={() => setSlotModalVisible(false)}
>
  <View
    style={{
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'white',
      width: '100%',
      elevation: 15,
      borderRadius: 10,
      height: 'auto',
    }}
  >
    
    <TouchableOpacity
      onPress={() => setSlotModalVisible(false)}
      style={{
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'gray',
        padding: 5,
      }}
    >
      <Feather name="x" color="black" size={29} />
    </TouchableOpacity>

    <View style={{ margin: 15 }}>
      
      <View>
        <Text style={styles.bd}>Select a Slot</Text>
        <View style={{ height: 1, backgroundColor: 'lightgray', marginTop: 15 }} />
        {renderSlots()} 
      </View>

     
      

      
      

      
      <View>
        <Text style={styles.bd}>Select Your Address</Text>
        <View style={{ height: 1, backgroundColor: 'lightgray', marginTop: 15 }} />
        {customeraddress.map(i => (
          <TouchableOpacity
            style={{ flexDirection: 'row', marginTop: 15 }}
            onPress={() => {
              setChecked(i);
              handleSelectedAddress(i);
              bottomSheet.current.show();
              setSlotModalVisible(false);
            }}
          >
            <View style={{ flex: 0.15 }}>
              <RadioButton
                value={i}
                status={checked === i ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(i);
                  handleSelectedAddress(i);
                  bottomSheet.current.show();
                   setSlotModalVisible(false);
                }}
              />
            </View>
            <View style={{ flex: 0.85 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 17,
                  }}
                >
                  {i.saveAs === 'other' ? i.otherData : i.saveAs}
                </Text>
              </View>
              <Text style={{ fontSize: 13, color: 'black' }}>
                {i.platNo}, {i.landmark}, {i.address}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View
          style={{
            height: 1,
            backgroundColor: 'lightgray',
            marginVertical: 15,
          }}
        />
        <TouchableOpacity
          onPress={mapModal}
          style={{
            flexDirection: 'row',
            marginRight: 10,
            marginTop: 15,
          }}
        >
          <AntDesign
            name="plus"
            size={16}
            style={{ color: 'darkred', marginTop: 2 }}
          />
          <Text
            style={{
              marginLeft: 10,
              color: 'darkred',
              fontWeight: '600',
              fontSize: 15,
            }}
          >
            Add New Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    
    <TouchableOpacity
      onPress={() => {
        console.log('Selected Slot:', selectedSlot);
        console.log('Selected Address:', checked);
        if (selectedSlot && checked) {
          setSlotModalVisible(false);
       
          
        } else {
          alert('Please select both a slot and an address');
        }
      }}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
        }}
      >
        Proceed
      </Text>
    </TouchableOpacity>
  </View>
</Modal>
                      
                  

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
                              placeholder="Customer Name"
                              placeholderTextColor={'black'}
                              style={{
                                elevation: 15,
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderColor: 'white',
                                paddingLeft: 10,
                                color: 'black',
                                height: 40,
                              }}
                              underlineColorAndroid={
                                Platform.OS === 'android' ? 'white' : null
                              }
                              value={customerName}
                              onChangeText={handlecustomer}
                            />
                            <TextInput
                              placeholder="Email "
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
                              placeholderTextColor={'black'}
                              value={email}
                              underlineColorAndroid={
                                Platform.OS === 'android' ? 'white' : null
                              }
                              onChangeText={handleemail}
                            />
                          </View>
                        </View>
                        
                      )}
                    </View>
                    
                    
                   
                    {voucherdata.length > 0 ? (
                      <View
                        style={{
                          backgroundColor: 'white',
                          marginTop: 10,
                          margin: 15,
                        }}>
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
                          Coupons & Offers
                        </Text>

                        <View style={{flexDirection: 'row', marginTop: 10}}>
                          <View style={{flex: 0.45}}>
                            <TextInput
                              style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                height: 45,
                                paddingLeft: 15,
                                color: 'black',
                                fontSize: 14,
                              }}
                              onChangeText={text => setVoucherCode(text)}
                              placeholder="Enter Voucher Code"
                              placeholderTextColor={'grey'}
                              underlineColorAndroid={
                                Platform.OS === 'android' ? 'white' : null
                              }
                            />
                            <Text style={{color: 'red'}}>
                              {validationMessage}
                            </Text>
                          </View>
                          <View style={{flex: 0.1}}></View>
                          <View style={{flex: 0.45}}>
                            <TouchableOpacity
                              onPress={() => {
                                const result = applyCouponCode();
                                setDiscountedTotal(result);

                                // setCouponDiscountShow(true)
                              }}
                              style={{
                                backgroundColor: 'darkred',
                                padding: 10,
                                borderRadius: 5,
                              }}>
                              <Text
                                style={{
                                  color: 'white',
                                  fontSize: 14,
                                  textAlign: 'center',
                                }}>
                                Apply
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    ) : (
                      ''
                    )}
                    <View style={{margin: 5}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#40A2D8'}}>*</Text>
                        <Text
                          style={{
                            color: '#40A2D8',
                            fontWeight: '900',
                            textAlign: 'auto',
                          }}>
                          Book Over Rs 1500 to use wallet , upto 10% From your
                          wallet Account !
                        </Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#40A2D8'}}>*</Text>
                        <Text
                          style={{
                            color: '#40A2D8',
                            fontWeight: '900',
                            textAlign: 'auto',
                          }}>
                          Book over Rs 1500, get 2% cashback in your wallet !
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginTop: 20,
                        paddingLeft: 15,
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          backgroundColor: 'rgb(214, 202, 140)',
                          width: 180,
                          borderTopRightRadius: 80,
                          padding: 3,
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Payment summary
                      </Text>

                      <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: 0.8}}>
                          <Text style={styles.summarytext}>Total Amount</Text>
                        </View>
                        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              textDecorationLine: 'line-through',
                            }}>
                            <FontAwesome
                              name="rupee"
                              color="black"
                              size={14}
                              style={{marginTop: 3}}
                            />
                            <Text
                              style={{
                                textDecorationLine: 'line-through',
                                color: 'black',
                              }}>
                              {/* {total
                            ? parseFloat(plan.pPrice) + parseFloat(total)
                            : plan.pPrice} */}
                              {Carttotal1 + totaladdon1}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: 0.8}}>
                          <Text style={styles.summarytext}>Discount</Text>
                        </View>
                        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.summarytext}>
                              {couponDiscount !== Carttotal && appliedCoupon
                                ? `${appliedCoupon.discountPercentage}%`
                                : '0%'}
                            </Text>
                          </View>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: 0.8}}>
                          <Text style={styles.summarytext}>Taxes and Fee</Text>
                        </View>
                        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.summarytext}>{finalGST}</Text>
                          </View>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: 0.8}}>
                          <Text style={styles.summarytext}>Saved</Text>
                        </View>
                        <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                          <View style={{flexDirection: 'row'}}>
                            <FontAwesome
                              name="rupee"
                              color="rgb(30,135,226)"
                              size={14}
                              style={{marginTop: 3}}
                            />
                            <Text style={{color: 'rgb(30,135,226)'}}>
                              {/* {discAmt
                            ? savedAmt + FreqensaveAmt + discAmt
                            : savedAmt + FreqensaveAmt} */}
                              {CartSavedtotal + FreqensaveAmt1}
                            </Text>
                          </View>
                        </View>
                      </View>
                      {voucherCode ? (
                        <View style={{flexDirection: 'row', margin: 10}}>
                          <View style={{flex: 0.5}}>
                            <Text style={styles.summarytext}>Coupon Code</Text>
                          </View>
                          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text style={{fontSize: 12, color: 'green'}}>
                                {voucherCode ? voucherCode : ''}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <></>
                      )}

                      {discountAmount && couponDiscount + total1 >= 1500 ? (
                        <View style={{flexDirection: 'row', margin: 5}}>
                          <View style={{flex: 0.5, flexDirection: 'row'}}>
                            <Checkbox
                              status={isSelected ? 'checked' : 'unchecked'}
                              onPress={handlePress}
                            />

                            <Text
                              style={{
                                marginTop: 10,
                                fontWeight: '500',
                                color: 'black',
                              }}>
                              Use wallet balance{' '}
                            </Text>
                          </View>
                          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: 'green',
                                  marginRight: 5,
                                }}>
                                {discountAmount
                                  ? discountAmount.toFixed(2)
                                  : ''}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <></>
                      )}

                      <Text
                        style={{
                          borderBottomWidth: 1,
                          borderColor: 'lightgray',
                        }}></Text>

                      <View style={{flexDirection: 'row', margin: 10}}>
                        <View style={{flex: 0.8}}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: 'black',
                              fontWeight: 'bold',
                            }}>
                            Grand Total
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: 'grey',
                            }}>
                            (including GST & Other Charges)
                          </Text>
                        </View>
                        <View style={{flex: 0.25, alignItems: 'flex-end'}}>
                          <View style={{flexDirection: 'row'}}>
                            <FontAwesome
                              name="rupee"
                              color="black"
                              size={18}
                              style={{marginTop: 3, marginRight: 2}}
                            />
                            <Text
                              style={{
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold',
                              }}>
                              {finalGrandTotal}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          backgroundColor: 'white',
                          // elevation: 3,
                          borderRadius: 5,
                          padding: 10,
                          margin: 2,
                        }}
                        onPress={() => setcancelationModel(true)}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'darkred',
                            fontWeight: '700',
                          }}>
                          Cancellation Policy
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>

                  <Modal isVisible={ModalVisible1}>
                    <View
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        padding: 15,
                      }}>
                      <ActivityIndicator size="large" />
                      <Text
                        style={{color: 'black', fontSize: 23, marginLeft: 10}}>
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
                        minDate={today.toISOString().split('T')[0]} // Allow selection from the 10th day of the current month
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

                  <Modal isVisible={cancelationModel}>
                    <View style={styles.content}>
                      <TouchableOpacity
                        onPress={() => {
                          setcancelationModel(false);
                        }}
                        style={{
                          alignSelf: 'flex-end',
                          backgroundColor: '',
                          borderWidth: 1,
                          borderRadius: 50,
                          borderColor: 'gray',
                          // padding: 5,
                          marginBottom: 20,
                        }}>
                        <Feather name="x" color="grey" size={25} />
                      </TouchableOpacity>
                      <Text style={styles.title}>
                        Vijay Home Services Cancellation Policy
                      </Text>
                      <Text style={styles.subtitle}>
                        At Vijay Home Services, we understand that plans can
                        change. Our cancellation policy is designed to be fair
                        and transparent for all our customers.
                      </Text>
                      <Text style={styles.sectionTitle}>
                        No Cancellation Charges !!
                      </Text>
                      <Text style={styles.sectionText}>
                        Before 4 Hours: If you cancel your service more than 4
                        hours before the scheduled slot, there will be no
                        cancellation charges.
                      </Text>
                      <Text style={styles.sectionTitle}>
                        Cancellation Charges !!
                      </Text>
                      <Text style={styles.sectionText}>
                        Within 4 Hours to 1 Hour Before Scheduled Slot:
                        {'\n'}- Full House Cleaning: ₹500
                        {'\n'}- Sofa/Kitchen/Bathroom/Mini-Services Cleaning:
                        ₹100
                        {'\n'}- Home Repair Services: ₹200
                        {'\n'}- Appliances Services: ₹200
                      </Text>
                      <Text style={styles.sectionText}>
                        Within 1 Hour and After Scheduled Slot:
                        {'\n'}- Full House Cleaning: ₹700
                        {'\n'}- Sofa/Kitchen/Bathroom/Mini-Services Cleaning:
                        ₹150
                      </Text>
                      <Text style={styles.sectionText}>
                        We appreciate your understanding and cooperation. Please
                        contact us as soon as possible if you need to cancel or
                        reschedule your service to avoid any charges.
                      </Text>
                      <TouchableOpacity>
                        <Text></Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>

                  {selectedDate && selectedSlotText ? (
                    <View onPress={() => setModalVisible(true)}></View>
                  ) : (
                    ''
                  )}

                  {selectedDate && selectedSlotText ? (
                    <TouchableOpacity
                      onPress={() => {
                        if (!Fulladd.address) {
                          alert('Please select the address');
                        } else {
                          bottomSheet.current.show();
                          // setlocationModalVisible(true);
                        }
                      }}
                      style={{
                        flexDirection: 'row',
                        backgroundColor: 'darkred',

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
                    <Pressable
                      style={{
                        flexDirection: 'row',
                        backgroundColor: '#8b00005e',

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
                    </Pressable>
                  )}

<View>
  <BottomSheet
    hasDraggableIcon
    ref={bottomSheet}
    height={600}
    style={{backgroundColor: 'white'}}
  >
    <View>
      <View
        style={{
          backgroundColor: 'white',
          marginTop: 20,
          paddingLeft: 15,
        }}
      >
       
        
         <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 10}}>
          <Text style={{fontSize: 14, color: 'black'}}>
            Selected Date: <Text style={{fontWeight: 'bold'}}>{selectedDate}</Text>
          </Text>
          <TouchableOpacity onPress={() => bottomSheet.current.close()}>
            <Feather name="edit" color="grey" size={16} marginRight={5} />
          </TouchableOpacity>
        </View>

        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <Text style={{fontSize: 14, color: 'black'}}>
            Selected Slot: <Text style={{fontWeight: 'bold'}}>{selectedSlot || 'None'}</Text>
          </Text>
          <TouchableOpacity onPress={() => setSlotModalVisible(true)}>
            <Feather name="edit" color="grey" size={16} marginRight={5} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: 'black',
            backgroundColor: 'rgb(214, 202, 140)',
            width: 180,
            borderTopRightRadius: 80,
            padding: 3,
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Payment summary
        </Text>

        {/* Total Amount */}
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{flex: 0.8}}>
            <Text style={styles.summarytext}>Total Amount</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row', textDecorationLine: 'line-through'}}>
              <FontAwesome
                name="rupee"
                color="black"
                size={14}
                style={{marginTop: 3}}
              />
              <Text
                style={{
                  textDecorationLine: 'line-through',
                  color: 'black',
                }}
              >
                {Carttotal1 + totaladdon1}
              </Text>
            </View>
          </View>
        </View>

       
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{flex: 0.8}}>
            <Text style={styles.summarytext}>Discount</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.summarytext}>
                {couponDiscount !== Carttotal && appliedCoupon
                  ? `${appliedCoupon.discountPercentage}%`
                  : '0%'}
              </Text>
            </View>
          </View>
        </View>

        
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{flex: 0.8}}>
            <Text style={styles.summarytext}>Taxes and Fee</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.summarytext}>{finalGST}</Text>
            </View>
          </View>
        </View>

        
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{flex: 0.8}}>
            <Text style={styles.summarytext}>Saved</Text>
          </View>
          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome
                name="rupee"
                color="rgb(30,135,226)"
                size={14}
                style={{marginTop: 3}}
              />
              <Text style={{color: 'rgb(30,135,226)'}}>
                {CartSavedtotal + FreqensaveAmt1}
              </Text>
            </View>
          </View>
        </View>

        
        {voucherCode ? (
          <View style={{flexDirection: 'row', margin: 10}}>
            <View style={{flex: 0.5}}>
              <Text style={styles.summarytext}>Coupon Code</Text>
            </View>
            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12, color: 'green'}}>
                  {voucherCode ? voucherCode : ''}
                </Text>
              </View>
            </View>
          </View>
        ) : null}

        
        {discountAmount && couponDiscount + total1 >= 1500 ? (
          <View style={{flexDirection: 'row', margin: 5}}>
            <View style={{flex: 0.5, flexDirection: 'row'}}>
              <Checkbox
                status={isSelected ? 'checked' : 'unchecked'}
                onPress={handlePress}
              />
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: '500',
                  color: 'black',
                }}
              >
                Use wallet balance
              </Text>
            </View>
            <View style={{flex: 0.5, alignItems: 'flex-end'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'green',
                  marginRight: 5,
                }}
              >
                {discountAmount ? discountAmount.toFixed(2) : ''}
              </Text>
            </View>
          </View>
        ) : null}

        <Text
          style={{
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          }}
        ></Text>

        {/* Grand Total */}
        <View style={{flexDirection: 'row', margin: 10}}>
          <View style={{flex: 0.8}}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              Grand Total
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: 'grey',
              }}
            >
              (inc. Taxes & Other Charges)
            </Text>
      
          </View>
       
          <View style={{flex: 0.25, alignItems: 'flex-end',flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome
              name="rupee"
              color="black"
              size={18}
              style={{ marginRight: 2}}
            />
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {finalGrandTotal}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
                        style={{
                          backgroundColor: 'white',
                          // elevation: 3,
                          borderRadius: 5,
                          padding: 10,
                          margin: 2,
                          marginTop: -10,
                        }}
                        onPress={() => setcancelationModel(true)}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: 'darkred',
                            fontWeight: '700',
                          }}>
                          Cancellation Policy
                        </Text>
                      </TouchableOpacity>
          </View>
        {/* Payment Type */}
        <Text
          style={{
            color: 'black',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 10,
            borderBottomWidth: 1,
            borderColor: '#eee',
            paddingBottom: 15,
          }}
        >
          Select Payment Type
        </Text>

        {/* Payment Options */}
        <View style={{flexDirection: 'row', margin: 10}}>
          <TouchableOpacity
            style={styles.paymentrow}
            onPress={handleSubmit1}
          >
            
            <Text style={styles.mastercardtext}>Pay now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentrow3}
            onPress={addtreatmentdetails}
          >
            
            <Text style={styles.mastercardtext}>Pay After Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </BottomSheet>
</View>


                  <View style={styles.centeredView}>
                    <Modal
                      animationType="slide"
                      transparent={true}
                      visible={locationModalVisible}
                      onRequestClose={() => {
                        setlocationModalVisible(false);
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
                            setlocationModalVisible(false);
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
                            <Text
                              style={{
                                color: 'black',
                                fontSize: 17,
                                fontFamily: 'Poppins-Medium',
                              }}>
                              Confirm your location
                            </Text>
                          </View>
                          <View
                            style={{
                              height: 1,
                              backgroundColor: 'lightgray',
                              marginTop: 15,
                            }}
                          />

                          <View style={{flex: 0.85}}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{
                                  color: 'black',
                                  marginTop: 20,
                                  fontSize: 13,
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                {Fulladd?.address}
                              </Text>
                            </View>
                          </View>

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
                            bottomSheet.current.show();
                          }}
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
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
                  <View style={{flex: 1, backgroundColor: 'red'}}>
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
                        <AntDesign
                          name="closecircle"
                          color="darkred"
                          size={35}
                        />
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
                              onRegionChange={region =>
                                debouncedRegionChange(region)
                              }>
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
                              <FontAwesome
                                name="map-pin"
                                color={'green'}
                                size={25}
                              />
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
                                {!isKeyboardVisible ? (
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
                                      <Text
                                        style={{
                                          color: 'white',
                                          fontWeight: 'bold',
                                        }}>
                                        Use my current location
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                ) : (
                                  ''
                                )}
                                {!isKeyboardVisible ? (
                                  <>
                                    <Text
                                      style={{
                                        fontSize: 15,
                                        color: 'black',
                                        fontWeight: 'bold',
                                        marginTop: 10,
                                      }}>
                                      Address:
                                    </Text>
                                    <Text
                                      style={{color: 'black', fontSize: 14}}>
                                      {address}
                                    </Text>
                                  </>
                                ) : (
                                  ''
                                )}
                                <View style={{marginTop: 10}}>
                                  <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.label}>
                                      House /Flat/ Block No
                                    </Text>
                                    <Text style={{color: 'red'}}> *</Text>
                                  </View>

                                  <TextInput
                                    style={styles.input}
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
                                    style={styles.input}
                                    value={landmark}
                                    onChangeText={text => setLandmark(text)}
                                    underlineColorAndroid={
                                      Platform.OS === 'android' ? 'white' : null
                                    }
                                  />
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                  }}>
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
                                      style={styles.input}
                                      value={otherData}
                                      onChangeText={text => setotherData(text)}
                                      underlineColorAndroid={
                                        Platform.OS === 'android'
                                          ? 'white'
                                          : null
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
          )}
         
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
    fontSize: 16,
    fontWeight: '700',
    color: '#513b1c',
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
  shead: {
    color: 'black',
    backgroundColor: 'rgb(219, 236, 231)',
    width: 150,
    borderTopRightRadius: 80,
    padding: 1,
    fontSize: 16,
    fontWeight: 'bold',
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
    // margin: 20,
    backgroundColor: 'gray',
    // borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    borderRadius: 0,
    width: '100%',
    position: 'absolute',
    bottom: 0,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
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
  box3: {
    fontWeight: 'bold',
    color: 'black',
  },
  mastercardimg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  mastercardtext: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
 
  paymentrow: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 15,
    backgroundColor: '#040458DB',
  },
  paymentrow3: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    elevation: 15,
    backgroundColor: '#8B0000',
  },
  paymentrow1: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
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
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 25,
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
  textinput0: {
    // backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
    fontSize: 16,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inc: {
    flexDirection: 'row',
    padding: 6,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    backgroundColor: 'white',
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
    padding: 5,
    borderColor: 'lightgrey',
    borderRadius: 7,
    textAlign: 'center',
    height: 'auto',
    fontSize: 14,
    elevation: 15,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'lightblue',
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderWidth: 1,
    marginRight: 5,
    padding: 6,
    borderColor: 'gray',
    borderRadius: 7,
    textAlign: 'center',
    height: 'auto',
    flex: 0.3,
    height: 35,
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
    backgroundColor: 'lightblue',
  },
  date1: {
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
    backgroundColor: 'darkred',
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
    fontSize: 14,
  },
  textinputicon: {
    position: 'absolute',
    top: 20,
    left: 16,
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
    height: 45,
    borderRadius: 5,
    backgroundColor: 'white',

    paddingLeft: 15,
    elevation: 16,
    color: 'black',
  },
  card: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 10,
    margin: 5,
  },
  remove: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
    borderRadius: 5,
    // width: 100,
    textAlign: 'center',
  },
  btm: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  content: {
    flexGrow: 1,
    margin: 15,
    backgroundColor: 'white',
    padding: 15,
  },
  title: {
    fontSize: 15,
    // fontWeight: "bold",
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Poppins-ExtraBold',
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  sectionTitle: {
    fontSize: 14,
    // fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: 'black',
    fontFamily: 'Poppins-ExtraBold',
  },
  sectionText: {
    fontSize: 12,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  slot: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  slotText: {
    fontSize: 16,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'darkred',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSlotText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Cartbook;
