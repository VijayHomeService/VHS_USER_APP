import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
  RefreshControl,
  SafeAreaView,
  Dimensions,
  UIManager,
  TextInput,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {addToCart, clearCart} from './Redux1/MyCartSlice';
import {useFCMToken} from '../../ApiServices/FCMtoken';

import {deleteMyCartItem} from './Redux1/MyCartSlice'; // Adjust the path as needed
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Linking} from 'react-native';

import Video from 'react-native-video';

import Loader from './Loader';
import ContentLoader from 'react-native-easy-content-loader';
import moment from 'moment';
import YoutubeIframe from 'react-native-youtube-iframe';
import Shimmer from 'react-native-shimmer';

function Repairing({navigation}) {
  const dispatch = useDispatch();
  const fcmtoken = useFCMToken();
  const MyCartItmes = useSelector(state => state.cart);

  const Carttotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
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

  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const [isPlaying2, setIsPlaying2] = useState(true);

  const handlePress1 = () => {
    setIsPlaying1(!isPlaying1);
  };

  const handlePress2 = () => {
    setIsPlaying2(!isPlaying2);
  };

  // Function to check if an item is in the cart
  const isItemInCart = itemId => {
    return MyCartItmes.some(cartItem => cartItem.id === itemId);
  };
  // Function to get quantity of an item by its _id from the cart
  const getItemQuantityById = itemId => {
    const cartItem = MyCartItmes.find(item => item.id === itemId);
    return cartItem ? cartItem.qty : 0;
  };

  const [address, setaddress] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const bottomSheet = useRef();
  const route = useRoute();
  const {cdata} = route.params;
  const [time, setTime] = useState(true);
  const [Servicedata, setServicedata] = useState([]);
  const [postsubdata, setpostsubdata] = useState([]);
  const [feqdata, setfeqdata] = useState([]);
  const [offerBannerdata, setofferBannerdata] = useState([]);
  const [catservicedata, setcatservicedata] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showratecard, setshowratecard] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedItem, setSelectedItem] = useState(null);
  const [numberData, setNumbersData] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const [showSelectedPrice, setShowSelectedPrice] = useState(false);
  const scrollViewRef = useRef(null);
  const [ITEM_HEIGHT, setItemHeight] = useState(400);
  const screenWidth = Dimensions.get('window').width - 20;
  const itemsPerRow = 2; // Number of items you want to display per row
  const marginWidth = 20; // Total margin width (10 pixels on each side)
  const itemWidth = (screenWidth - marginWidth) / itemsPerRow;
  const [Vdata, setVdata] = useState('');
  const [pricesdata, setpricesdata] = useState([]);
  const [Item, setItem] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedPlan, setselectedPlan] = useState(pricesdata[0]);

  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [ratingData, setratingData] = useState([]);

  const [isBuffering, setIsBuffering] = useState(true);

  const [savecity, setsavecity] = useState('');
  const [rateCarddata, setrateCarddata] = useState([]);
  const [user, setuser] = useState('');
  const [mainContact, setmainContact] = useState();
  const [LoginModal, setLoginModal] = useState(false);
  const [otpLoader, setotpLoader] = useState(false);

  console.log('user repair', user);

  useEffect(() => {
    if (!user) {
      console.log('hit login modela');
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
  useEffect(() => {
    AsyncStorage.getItem('savecity').then(value => {
      setsavecity(value);
    });
  }, []);

  useEffect(() => {
    getrateCard();
  }, []);

  const getrateCard = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getRateCard',
    );
    if ((res.status = 200)) {
      setrateCarddata(res.data?.RateCard);
    }
  };

  useEffect(() => {
    getservicemanagement();
  }, [cdata]);

  const getservicemanagement = async () => {
    try {
      const res = await axios.get(
        'https://api.vijayhomesuperadmin.in/api/userapp/getservices',
      );
      if (res.status === 200) {
        const filteredBySubcategory = res.data?.service.filter(
          i => i.Subcategory === cdata?.subcategory,
        );
        const filteredByCategory = res.data?.service.filter(i => {
          return (
            i.category === cdata?.category &&
            !filteredBySubcategory.some(subItem => subItem._id === i._id)
          );
        });

        // setServicedata(filteredBySubcategory);
        const othServiceNames = cdata.othservice.map(item => item.name);
        const filteredData = filteredByCategory.filter(item =>
          othServiceNames.some(name => item.serviceName === name),
        );

        setcatservicedata(filteredData);
      } else {
        console.error('Error fetching services: Status code not 200');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    getservicemanagement1();
  }, []);

  useEffect(() => {
    getsvideo();
  }, [selectedItem]);

  const [svideodata, setsvideodata] = useState([]);

  const getsvideo = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getservicevideo',
    );
    if (res.status === 200) {
      setsvideodata(
        res.data?.serviceName.filter(
          i => i.serviceName === selectedItem?.serviceName,
        ),
      );
    }
  };

  const getservicemanagement1 = async () => {
    try {
      const res = await axios.post(
        `https://api.vijayhomesuperadmin.in/api/userapp/postsubcatservice/`,
        {
          Subcategory: cdata?.subcategory,
        },
      );
      if (res.status === 200) {
        setServicedata(res.data?.subcatdata);
      } else {
        console.error('Error fetching services: Status code not 200');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('address').then(value => {
      setaddress(value);
    });
  }, []);

  const handleViewDetails = item => {
    setSelectedItem(item);
    setShowModal(!showModal);
  };

  const handleViewDetails1 = item => {
    setSelectedItem(item);

    navigation.navigate('summary', {plan: item, sdata: Item});
  };
  const handleViewDetails2 = item => {
    navigation.navigate('summary', {plan: item, sdata: selectedItem});
    setShowModal(false);
    setVdata('');
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setTime(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getsubcategory();
  }, [cdata?.subcategory]);

  const getsubcategory = async () => {
    let res = await axios.post(
      `https://api.vijayhomesuperadmin.in/api/userapp/postappresubcat/`,
      {
        subcategory: cdata?.subcategory,
      },
    );

    if ((res.status = 200)) {
      setpostsubdata(res.data?.subcategory);
    }
  };

  useEffect(() => {
    getAllNumbers();
  }, []);

  useEffect(() => {
    getbannerimg();
    getwhyneed();
    getbannerdatamiddle();
    getReviewsVideos();
  }, []);

  const [ReviewVideodata, setReviewVideodata] = useState([]);

  const getbannerimg = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getallofferbanner',
    );
    if ((res.status = 200)) {
      setofferBannerdata(
        res.data?.offerbanner.filter(i => i.subcategory === cdata?.subcategory),
      );
    }
  };

  const getReviewsVideos = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getallReviewVideos',
    );
    if ((res.status = 200)) {
      setReviewVideodata(
        res.data?.ReviewVideos.filter(
          i => i.Subcategory === cdata?.subcategory,
        ),
      );
    }
  };

  const [Bannermidledata, setBannermidledata] = useState([]);

  const getbannerdatamiddle = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getallSpotlightSP',
    );
    if ((res.status = 200)) {
      setBannermidledata(
        res.data?.SpotlightSP.filter(i => i?.service === cdata?.subcategory),
      );
    }
  };

  const handleCategoryClick = clickedItem => {
    setpricesdata(
      clickedItem?.morepriceData.filter(i => i.pricecity === savecity),
    );

    setItem(clickedItem);

    // bottomSheet.current.show();

    setShowModal1(!showModal1);
  };

  const handleviewselect = selectedItem => {
    setItem(selectedItem);
  };

  const settheservice = item => {
    setItem(item);
  };

  const handleItemClick = (item, index) => {
    setSelectedItemIndex(index);
    setselectedPlan(item);
    setItem(selectedItem);
    const itemToAdd = {
      _id: item._id,
      category: cdata.category,
      service: Item,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        cartItem => cartItem.category === cdata.category,
      );

      if (existingCartItem) {
        dispatch(addToCart({...itemToAdd, id: existingCartItem.id}));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigation.navigate('summary', {plan: item, sdata: Item});
    }
  };

  const handleItemClick1 = (item, index) => {
    setSelectedItemIndex(index);
    setselectedPlan(item);

    const itemToAdd = {
      _id: item._id,
      category: cdata.category,
      service: selectedItem,
      pName: item.pName,
      pPrice: item.pPrice,
      pofferprice: item.pofferprice,
      pservices: item.pservices,
    };

    if (!item.pservices) {
      const existingCartItem = MyCartItmes.find(
        cartItem => cartItem.category === cdata.category,
      );

      if (existingCartItem) {
        dispatch(addToCart({...itemToAdd, id: existingCartItem.id}));
      } else {
        dispatch(clearCart());
        dispatch(addToCart(itemToAdd));
      }
    } else {
      // alert("This is AMC services ")
      navigation.navigate('summary', {plan: item, sdata: selectedItem});
    }
  };
  useEffect(() => {
    if (pricesdata && pricesdata?.length > 0) {
      setselectedPlan(pricesdata[0]);
    }
  }, []);

  const getAllNumbers = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getwhatsNumbers',
    );
    if (res.status === 200) {
      setNumbersData(
        res.data?.numbersData.filter(i => i.numbersCategory === cdata.category),
      );
    }
  };

  const getwhyneed = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getallfeq',
    );
    if (res.status === 200) {
      setfeqdata(res.data?.feq.filter(i => i.category === cdata.category));

      // Filter images based on some condition (e.g., only images for a specific category)
    }
  };
  const handlePhoneCall = () => {
    Linking.openURL(`tel:${numberData[0]?.phoneNumber}`);
  };

  const handleWhatsAppCall = () => {
    Linking.openURL(`whatsapp://send?phone=${numberData[0]?.whatsappNumber}`);
  };

  const servicesRef = useRef(null); // Create a ref for the "Services" section in catservicedata

  // Function to scroll to a specific service section
  const scrollToService = (index, sub_subcategory) => {
    const yPosition = index * ITEM_HEIGHT;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({y: yPosition, animated: true});
    }
  };

  const handleBackButton = () => {
    if (showModal) {
      // If the modal is open, close it
      setShowModal(false);
      return true; // Prevent default behavior (exit the app)
    } else {
      // If the modal is not open, navigate to another screen
      navigation.navigate('repairing', {cdata: cdata});
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
  }, [navigation, showModal]);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('tab');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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

  const onLoad = () => {
    setIsBuffering(false);
  };

  const getVideoIdFromLink = youtubeLink => {
    try {
      // Extract the video ID from the YouTube URL
      const videoIdMatch = youtubeLink.match(/[?&]v=([^&]+)/);

      return videoIdMatch && videoIdMatch[1];
    } catch (error) {
      console.error('Error extracting video ID:', error);
      return null;
    }
  };

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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={{flex: 1}}>
          <ScrollView
            ref={scrollViewRef}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Video
              ref={videoRef}
              source={{uri: cdata?.videolink}}
              resizeMode="cover"
              repeat
              autoplay
              shouldPlay
              style={{width: '100%', height: 180}}
              onLoad={onLoad}
            />

            <View style={{margin: 10}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  fontFamily: 'Poppins-Bold',
                }}>
                {cdata.subcategory}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 14,
                        marginTop: 2,
                        paddingRight: 5,
                      }}>
                      {' '}
                      4.9
                    </Text>
                    <AntDesign name="star" color="gold" size={20} />
                    <AntDesign name="star" color="gold" size={20} />
                    <AntDesign name="star" color="gold" size={20} />
                    <AntDesign name="star" color="gold" size={20} />
                    <AntDesign name="star" color="gold" size={20} />
                  </View>
                  <Text style={{color: 'black', fontSize: 14, marginTop: 2}}>
                    {' '}
                    (9.1T)
                  </Text>
                </View>

                <View style={{flex: 0.2}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity onPress={handlePhoneCall}>
                      <Image
                        source={require('../../../assets/icons8-call-2.gif')}
                        style={{
                          width: 50,
                          height: 30,
                          marginTop: 5,
                          resizeMode: 'contain',
                          marginRight: 25,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleWhatsAppCall}>
                      <Image
                        source={require('../../../assets/icons8-whatsapp.gif')}
                        style={{
                          width: 40,
                          height: 40,
                          marginBottom: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View>
              {offerBannerdata?.length > 0 ? (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{}}>
                  {offerBannerdata.map((i, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        flexDirection: 'row',
                        borderWidth: 2,
                        borderColor: '#FFD700',
                        backgroundColor: '#FFFFE0',
                        padding: 5,
                        width: itemWidth,
                        borderRadius: 10,
                        marginRight: 10,
                        marginBottom: 10,
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                        shadowRadius: 5,
                        elevation: 5,
                        marginLeft: 10,
                      }}>
                      <View
                        style={{
                          flex: 0.1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={{
                            uri: `https://api.vijayhomesuperadmin.in/offerbanner/${i.icon}`,
                          }}
                          style={{width: 20, height: 20}}
                        />
                      </View>
                      <View style={{flex: 0.9, marginLeft: 10}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 12,
                            fontFamily: 'Poppins-Medium',
                          }}>
                          {i.header}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            marginTop: 5,
                            color: 'grey',
                          }}>
                          {i.desc}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              ) : (
                <></>
              )}
            </View>

            {postsubdata?.length > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    // marginTop: 10,
                  }}>
                  {postsubdata
                    .sort((a, b) => parseInt(a.order) - parseInt(b.order))
                    .map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '25%',
                          padding: 5,
                          borderColor:
                            selectedItemIndex === index
                              ? 'transparent'
                              : 'transparent',
                          borderWidth: 2,
                        }}
                        onPress={() =>
                          scrollToService(index + 1, item?.sub_subcategory)
                        }>
                        <Image
                          source={{
                            uri: `https://api.vijayhomesuperadmin.in/resubcat/${item.resubcatimg}`,
                          }}
                          style={{
                            width: 70,
                            height: 60,
                            resizeMode: 'cover',
                            borderRadius: 5,
                          }}
                        />
                        <Text style={styles.servicestext}>
                          {item.sub_subcategory}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </View>
              </>
            ) : (
              ''
            )}

            <View>
              {Servicedata.length > 0 ? (
                <View
                  style={{
                    margin: 10,
                    // borderBottomWidth: 1,
                    borderColor: '#eee',
                    // paddingBottom: 20,
                  }}>
                  {Servicedata.sort(
                    (a, b) => parseInt(a.order) - parseInt(b.order),
                  ).map(item => (
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 0.7, marginTop: 20}}>
                        {item.servicetitle ? (
                          <Text style={styles.shead}>{item.servicetitle}</Text>
                        ) : (
                          ''
                        )}

                        <Text
                          style={{
                            fontSize: 16,
                            color: 'black',
                            fontFamily: 'Poppins-Bold',
                            marginTop: 5,
                          }}>
                          {item.serviceName}
                        </Text>
                        {item.servicebelow ? (
                          <Text style={styles.sbelow}>{item.servicebelow}</Text>
                        ) : (
                          ''
                        )}

                        <View style={{flexDirection: 'row', marginTop: 5}}>
                          <Entypo name="star" color="gold" size={20} />
                          <Text
                            style={{
                              fontSize: 13,
                              marginLeft: 5,
                              color: 'black',
                              fontFamily: 'Poppins-Medium',
                            }}>
                            4.9 (328.8k)
                          </Text>
                        </View>

                        {item.morepriceData.length > 0 ? (
                          <View style={{flexDirection: 'row', marginTop: 5}}>
                            <>
                              <Text
                                style={{color: 'black', fontWeight: 'bold'}}>
                                Start price
                              </Text>
                              <Text style={styles.originalPrice}>
                                ₹
                                {Math.min(
                                  ...item.morepriceData
                                    .filter(i => i.pricecity === savecity) // Filter based on condition
                                    .map(i => i.pPrice), // Extract pPrice values
                                )}
                              </Text>
                              <Text
                                style={{color: 'black', fontWeight: 'bold'}}>
                                ₹
                                {Math.min(
                                  ...item.morepriceData
                                    .filter(i => i.pricecity === savecity) // Filter based on condition
                                    .map(i => i.pofferprice), // Extract pPrice values
                                )}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 10,
                                  color: 'black',
                                  fontWeight: 'bold',
                                }}>
                                {item.offerPrice}
                              </Text>
                            </>
                          </View>
                        ) : (
                          <></>
                        )}

                        <View style={{flexDirection: 'row'}}>
                          <Image
                            source={{
                              uri: `https://api.vijayhomesuperadmin.in/service/${selectedItem?.Eximg}`,
                            }}
                            style={{width: 12, height: 12, marginTop: 5}}
                          />
                          {item?.category !== 'Painting' ? (
                            <Text
                              style={{
                                fontSize: 15,
                                color: 'black',
                                padding: 6,
                              }}
                              numberOfLines={4}
                              ellipsizeMode="tail">
                              {item.serviceDesc[0]?.text}
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontSize: 13,
                                color: 'black',
                                padding: 6,
                                fontFamily: 'Poppins-Regular',
                              }}
                              numberOfLines={4}
                              ellipsizeMode="tail">
                              {item.serviceDesc[0]?.text}
                            </Text>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <TouchableOpacity
                            onPress={() => handleViewDetails(item)}>
                            <Text
                              style={{
                                color: 'violet',
                                fontSize: 14,
                                fontWeight: 'bold',
                                marginTop: 16,
                              }}>
                              View Price
                            </Text>
                          </TouchableOpacity>
                          {cdata?.category === 'Appliance Service' ? (
                            <Shimmer
                              duration={1500}
                              pauseDuration={1000}
                              tilt={60}>
                              <TouchableOpacity
                                onPress={() => setshowratecard(true)}>
                                <Text
                                  style={{
                                    color: '#3993c1',
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    marginTop: 16,
                                    textDecorationLine: 'underline',
                                  }}>
                                  Spare Parts RateCard
                                </Text>
                              </TouchableOpacity>
                            </Shimmer>
                          ) : (
                            <></>
                          )}
                        </View>

                        <View style={styles.hrtag} />
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TouchableOpacity
                          style={[styles.textinput1, styles.elevation1]}
                          onPress={() => {
                            if (item.morepriceData.length > 0) {
                              handleCategoryClick(item);
                            } else {
                              navigation.navigate('ESpage', {sdata: item});
                            }
                          }}>
                          <Image
                            source={{
                              uri: `https://api.vijayhomesuperadmin.in/service/${item.serviceImg}`,
                            }}
                            style={styles.servicesimg}
                          />
                          <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 15,
                                padding: 2,
                                color: 'red',
                                fontWeight: '600',
                              }}>
                              BOOK
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  <ContentLoader
                    pRows={3}
                    avatar
                    aShape="square"
                    reverse={true}
                    tHeight={20}
                    active={1}
                    animationDuration={500}
                    loading={12}
                    aSize={80}
                    containerStyles={{padding: 19, marginTop: 40}}
                  />

                  <ContentLoader
                    pRows={3}
                    avatar
                    aShape="square"
                    reverse={true}
                    tHeight={20}
                    active={1}
                    animationDuration={500}
                    loading={12}
                    aSize={80}
                    containerStyles={{padding: 19, marginTop: 40}}
                  />
                  <ContentLoader
                    pRows={3}
                    avatar
                    aShape="square"
                    reverse={true}
                    tHeight={20}
                    active={1}
                    animationDuration={500}
                    loading={12}
                    aSize={80}
                    containerStyles={{padding: 19, marginTop: 40}}
                  />
                </View>
              )}
            </View>

            <View style={{margin: 10}}>
              <Image
                source={{
                  uri: `https://api.vijayhomesuperadmin.in/spotlightSP/${Bannermidledata[0]?.img}`,
                }}
                style={{
                  width: '100%',
                  height: 120,
                  // borderRadius:40
                  resizeMode: 'cover',
                }}
              />
            </View>

            {cdata?.category !== 'Painting' ? (
              <ScrollView ref={servicesRef}>
                {catservicedata?.length > 0 ? (
                  <View>
                    <View>
                      <Text
                        style={{
                          marginLeft: 15,
                          color: 'black',
                          fontWeight: '600',
                          fontSize: 18,
                        }}>
                        Other Services
                      </Text>
                    </View>

                    <View
                      style={{
                        margin: 20,
                        borderBottomWidth: 1,
                        borderColor: '#eee',
                        paddingBottom: 20,
                      }}>
                      {catservicedata.map((item, index) => (
                        <View style={{flexDirection: 'row'}} key={index}>
                          <View style={{flex: 0.7, marginTop: 20}}>
                            {item.servicetitle ? (
                              <Text style={styles.shead}>
                                {item.servicetitle}
                              </Text>
                            ) : (
                              ''
                            )}

                            <Text
                              style={{
                                fontSize: 18,
                                color: 'black',
                                fontWeight: 'bold',
                                marginTop: 5,
                              }}>
                              {item.serviceName}
                            </Text>
                            {item.servicebelow ? (
                              <Text style={styles.sbelow}>
                                {item.servicebelow}
                              </Text>
                            ) : (
                              ''
                            )}

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                              <Entypo name="star" color="gold" size={20} />
                              <Text
                                style={{
                                  fontSize: 15,
                                  marginLeft: 5,
                                  color: 'black',
                                }}>
                                4.9 (328.8k)
                              </Text>
                            </View>

                            <View style={{flexDirection: 'row', marginTop: 5}}>
                              {item?.serviceDirection === 'Survey' ? (
                                <Text
                                  style={{color: 'black', fontWeight: 'bold'}}>
                                  Free Estimation
                                </Text>
                              ) : item?.serviceDirection === 'Enquiry' ? (
                                <Text
                                  style={{color: 'black', fontWeight: 'bold'}}>
                                  Free Consultancy
                                </Text>
                              ) : (
                                <>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontWeight: 'bold',
                                    }}>
                                    Start price
                                  </Text>
                                  <Text style={styles.originalPrice}>
                                    ₹{item.morepriceData[0]?.pPrice}
                                  </Text>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontWeight: 'bold',
                                    }}>
                                    ₹{item.morepriceData[0]?.pofferprice}
                                  </Text>
                                  <Text
                                    style={{
                                      marginLeft: 10,
                                      color: 'black',
                                      fontWeight: 'bold',
                                    }}>
                                    {item.offerPrice}
                                  </Text>
                                </>
                              )}
                            </View>

                            <View>
                              <Text
                                numberOfLines={4}
                                ellipsizeMode="tail"
                                style={{
                                  fontSize: 14,
                                  color: 'black',
                                  fontFamily: 'Poppins-Medium',
                                }}>
                                {item.serviceDesc[0]?.text}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => handleViewDetails(item)}>
                              <Text
                                style={{
                                  color: 'violet',
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                  marginTop: 16,
                                }}>
                                View Price
                              </Text>
                            </TouchableOpacity>
                            <View style={styles.hrtag} />
                          </View>

                          <View
                            style={{
                              flex: 0.3,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <TouchableOpacity
                              style={[styles.textinput1, styles.elevation1]}
                              onPress={() => {
                                if (item.morepriceData.length > 0) {
                                  handleCategoryClick(item);
                                } else {
                                  navigation.navigate('ESpage', {
                                    sdata: item,
                                  });
                                }
                              }}>
                              <Image
                                source={{
                                  uri: `https://api.vijayhomesuperadmin.in/service/${item.serviceImg}`,
                                }}
                                style={styles.servicesimg}
                              />

                              <View style={{flex: 0.2, alignItems: 'flex-end'}}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    fontSize: 15,
                                    padding: 2,
                                    color: 'red',
                                    fontWeight: '600',
                                  }}>
                                  BOOK
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                ) : (
                  ''
                )}
              </ScrollView>
            ) : (
              <></>
            )}
          </ScrollView>
          {cdata?.category === 'Painting' ? (
            ''
          ) : Carttotal > 0 ? (
            <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'rgb(224, 206, 85)',
                  padding: 5,
                  marginTop: 5,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '100%',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <MaterialIcons
                    name="local-offer"
                    size={15}
                    color="black"
                    style={{
                      marginTop: 3,
                      paddingRight: 3,
                      fontWeight: 'bold',
                    }}
                  />
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    Congratulations!
                  </Text>
                </View>
                <Text
                  style={{color: 'black', marginLeft: 10, fontWeight: 'bold'}}>
                  <FontAwesome name="rupee" size={12} color="black" />{' '}
                  {CartSavedtotal}
                </Text>
                <Text
                  style={{color: 'black', marginLeft: 4, fontWeight: 'bold'}}>
                  {' '}
                  saved so far!
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    flex: 0.5,
                    backgroundColor: 'darkred',
                    color: 'white',
                    padding: 10,
                    width: '100%',
                    textAlign: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  onPress={() => navigation.navigate('cart')}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      Total
                    </Text>
                    <Text style={{color: 'white'}}>
                      {' '}
                      <FontAwesome name="rupee" size={13} color="white" />{' '}
                      {Carttotal}
                    </Text>
                  </View>

                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    View Cart
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <></>
          )}

          <View>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={showModal1}
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal1(!showModal1);
                  }}
                  style={[styles.textinput, styles.elevation]}>
                  <Feather name="x" color="white" size={29} />
                </TouchableOpacity>
                <ScrollView>
                  <View style={{margin: 10}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 10,
                        borderBottomWidth: 1,
                        borderColor: '#eee',
                        paddingBottom: 15,
                        marginTop: 50,
                      }}>
                      Select Option
                    </Text>
                    {pricesdata.length > 0 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          marginTop: 20,
                        }}>
                        {pricesdata.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{
                              width: '33.33%',
                              marginBottom: 10,
                              padding: 10,
                            }}
                            onPress={() => handleItemClick(item, index)}>
                            <View
                              style={{
                                borderWidth: 2,
                                padding: 5,
                                borderRadius: 5,
                                color:
                                  selectedItemIndex === index
                                    ? 'darkred'
                                    : 'black',
                                borderColor: isItemInCart(item._id)
                                  ? 'darkred'
                                  : 'lightgrey',
                              }}>
                              <Text
                                style={{
                                  color:
                                    selectedItemIndex === index
                                      ? 'darkred'
                                      : 'black',
                                  borderColor:
                                    selectedItemIndex === index
                                      ? 'darkred'
                                      : 'lightgrey',
                                  color: '#19c37d',
                                  fontWeight: 'bold',
                                  textAlign: 'center',
                                  borderRadius: 5,
                                  fontSize: 14,
                                }}>
                                {item.pName}
                              </Text>
                              <View
                                style={{
                                  // flexDirection: "row",
                                  justifyContent: 'center',
                                  // position:"absolute",
                                  // bottom:0
                                }}>
                                <Text
                                  style={{
                                    textDecorationLine: 'line-through',
                                    fontSize: 12,
                                    color: 'black',
                                    textAlign: 'center',
                                  }}>
                                  <FontAwesome name="rupee" size={11} />
                                  {item.pPrice}
                                </Text>
                                <Text
                                  style={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    // marginLeft: 5,
                                    fontSize: 12,
                                    textAlign: 'center',
                                  }}>
                                  <FontAwesome name="rupee" size={11} />{' '}
                                  {item.pofferprice}
                                </Text>
                              </View>
                              <View style={{marginTop: 10}}>
                                {item?.pservices ? (
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontWeight: 'bold',
                                      textAlign: 'center',
                                      fontSize: 14,
                                    }}>
                                    {' '}
                                    Services - {item.pservices}
                                  </Text>
                                ) : (
                                  ''
                                )}
                              </View>
                              {isItemInCart(item._id) && (
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    color: 'darkred',
                                    fontWeight: 'bold',
                                  }}>
                                  Added
                                </Text>
                              )}
                            </View>
                          </TouchableOpacity>
                        ))}
                      </View>
                    ) : (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 50,
                        }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            fontSize: 14,
                            color: 'black',
                          }}>
                          No data found !
                        </Text>
                      </View>
                    )}

                    <View style={styles.hrtag} />

                    {Carttotal > 0 ? (
                      <View style={{width: '100%'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            backgroundColor: 'rgb(224, 206, 85)',
                            padding: 5,
                            marginTop: 5,
                            alignSelf: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                          }}>
                          <View style={{flexDirection: 'row'}}>
                            <MaterialIcons
                              name="local-offer"
                              size={15}
                              style={{marginTop: 3, paddingRight: 5}}
                            />
                            <Text style={{color: 'black'}}>
                              Congratulations!
                            </Text>
                          </View>
                          <Text style={{color: 'black', marginLeft: 2}}>
                            <FontAwesome name="rupee" size={12} color="black" />{' '}
                            {CartSavedtotal}
                            saved so far!
                          </Text>
                        </View>
                        <View>
                          <TouchableOpacity
                            style={{
                              flex: 0.5,
                              backgroundColor: 'darkred',
                              color: 'white',
                              padding: 10,
                              width: '100%',
                              textAlign: 'center',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                            onPress={() => {
                              navigation.navigate('cart');
                              setShowModal1(false);
                            }}>
                            <View style={{flexDirection: 'row'}}>
                              <Text
                                style={{color: 'white', fontWeight: 'bold'}}>
                                Total
                              </Text>
                              <Text style={{color: 'white'}}>
                                {' '}
                                <FontAwesome
                                  name="rupee"
                                  size={13}
                                  color="white"
                                />{' '}
                                {Carttotal}
                              </Text>
                            </View>

                            <Text style={{color: 'white', fontWeight: 'bold'}}>
                              View Cart
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                </ScrollView>
              </View>
            </Modal>
          </View>

          <Modal
            animationType={'slide'}
            transparent={false}
            visible={showModal}
            style={{backgroundColor: 'white', margin: 0}}
            onRequestClose={() => {}}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(!showModal);
                setVdata('');
                setSelectedPrice('');
                setShowSelectedPrice(false);
                setSelectedItemId('');
              }}
              style={[styles.textinput, styles.elevation]}>
              <Feather name="x" color="white" size={29} />
            </TouchableOpacity>

            {showSelectedPrice && (
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  // padding: 10,
                  position: 'absolute',
                  width: '100%',
                  bottom: 0,
                  zIndex: 10,
                  borderTopWidth: 1,
                  borderColor: 'darkred',
                  top: 0,
                  // borderRadius: 10,
                  // marginLeft: 10,
                }}>
                <View style={{flex: 0.7}}>
                  <Text style={{color: 'darkred', fontSize: 15}}>
                    {selectedPrice.pName}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        textDecorationLine: 'line-through',
                        color: 'black',
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {selectedPrice.pPrice}
                    </Text>
                    <Text style={{color: 'black', fontSize: 14, marginLeft: 5}}>
                      {selectedPrice.pofferprice}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={{flex: 0.3, justifyContent: 'center'}}
                  onPress={() => handleViewDetails2(Vdata)}>
                  <Text
                    style={{
                      backgroundColor: 'darkred',
                      color: 'white',
                      padding: 10,
                      width: '100%',
                      textAlign: 'center',
                      borderRadius: 5,
                    }}>
                    View Cart
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <ScrollView>
              <View style={styles.modal}>
                <View>
                  <Image
                    source={{
                      uri: `https://api.vijayhomesuperadmin.in/service/${selectedItem?.serviceImg}`,
                    }}
                    style={{
                      width: '100%',
                      height: 180,
                      resizeMode:
                        // selectedItem?.category === "Painting"
                        //   ? "contain"
                        'contain',
                    }}
                  />
                </View>

                <View style={{flex: 0.2}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      margin: 3,
                    }}>
                    <TouchableOpacity onPress={handlePhoneCall}>
                      <Image
                        source={require('../../../assets/icons8-call-2.gif')}
                        style={{
                          width: 50,
                          height: 30,
                          marginTop: 5,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleWhatsAppCall}>
                      <Image
                        source={require('../../../assets/icons8-whatsapp.gif')}
                        style={{
                          width: 40,
                          height: 40,
                          marginBottom: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.minicon}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.8}}>
                      <Text style={{color: 'green', fontSize: 12}}>
                        {selectedItem?.servicetitle}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      color: 'black',

                      fontWeight: '600',
                      fontSize: 20,
                    }}>
                    {selectedItem?.serviceName}
                  </Text>

                  {selectedItem?.servicebelow ? (
                    <Text style={{color: 'black', fontSize: 12}}>
                      {selectedItem?.servicebelow}
                    </Text>
                  ) : (
                    ''
                  )}

                  {selectedItem?.serviceHours ? (
                    <Text style={{marginLeft: 10}}>
                      Service Hours {selectedItem?.serviceHours}
                    </Text>
                  ) : (
                    ''
                  )}

                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '900',
                        marginTop: 20,
                        fontSize: 17,
                      }}>
                      Service Description
                    </Text>

                    <View style={{padding: 10}}>
                      {selectedItem?.serviceDesc?.map((i, index) => (
                        <View key={index} style={{flexDirection: 'row'}}>
                          <Image
                            source={{
                              uri: `https://api.vijayhomesuperadmin.in/service/${selectedItem?.Eximg}`,
                            }}
                            style={{width: 16, height: 16, marginTop: 7}}
                          />
                          <Text
                            style={{
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              marginLeft: 5,
                              fontSize: 15,
                              color: 'grey',
                            }}>
                            {i.text}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {selectedItem?.morepriceData?.length > 0 ? (
                    <View>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                        <View style={{margin: 15}}>
                          <View style={{flexDirection: 'row'}}>
                            {selectedItem?.morepriceData
                              ?.filter(i => i.pricecity === savecity)
                              .map(i => (
                                <View
                                  style={{
                                    flex: 1,
                                    borderColor: 'grey',
                                    backgroundColor: 'white',
                                    marginRight: 15,
                                    elevation: 15,
                                    padding: 6,
                                    width: 170,
                                    height: 170,
                                  }}
                                  key={i.id}>
                                  <Text style={styles.tb}>{i.pName}</Text>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                    }}>
                                    <Text style={{flexShrink: 1}}>
                                      <Text
                                        style={{
                                          textDecorationLine: 'line-through',
                                          color: 'black',
                                        }}>
                                        <FontAwesome name="rupee" size={13} />
                                        {i.pPrice}
                                      </Text>{' '}
                                      <Text
                                        style={{
                                          fontWeight: 'bold',
                                          color: 'black',
                                          marginLeft: 10,
                                        }}>
                                        <FontAwesome name="rupee" size={13} />{' '}
                                        {i.pofferprice}
                                      </Text>
                                    </Text>
                                  </View>

                                  <Text
                                    style={{
                                      color: 'orange',
                                      textAlign: 'center',
                                    }}>
                                    {(
                                      ((i.pPrice - i.pofferprice) / i.pPrice) *
                                      100
                                    ).toFixed(0)}
                                    % discount
                                  </Text>

                                  {i?.pservices ? (
                                    <Text
                                      style={{
                                        color: 'black',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                      }}>
                                      {' '}
                                      Services - {i.pservices}
                                    </Text>
                                  ) : (
                                    <></>
                                  )}
                                  {isItemInCart(i._id) ? (
                                    <Text> </Text>
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() => {
                                        handleviewselect(selectedItem);
                                        handleItemClick1(i);
                                      }}
                                      style={{
                                        position: 'absolute',
                                        bottom: 10,
                                        width: '100%',
                                      }}>
                                      <Text
                                        style={{
                                          backgroundColor:
                                            selectedItemId === i._id
                                              ? 'green'
                                              : 'darkred',
                                          padding: 5,
                                          color: 'white',
                                          width: '100%',
                                          textAlign: 'center',
                                          borderRadius: 3,
                                          marginTop: 15,
                                        }}>
                                        Book
                                      </Text>
                                    </TouchableOpacity>
                                  )}

                                  {isItemInCart(i._id) && (
                                    <View
                                      style={{
                                        flex: 0.3,
                                        position: 'absolute',
                                        bottom: 10,
                                      }}>
                                      <View
                                        style={{
                                          flexDirection: 'row',

                                          backgroundColor: 'green',
                                          elevation: 15,
                                          padding: 5,
                                          borderRadius: 5,
                                          justifyContent: 'space-evenly',
                                          width: '100%',
                                          marginTop: 10,
                                        }}>
                                        <TouchableOpacity
                                          style={{}}
                                          onPress={() => {
                                            const cartItem = MyCartItmes.find(
                                              cartItem => cartItem.id === i._id,
                                            );

                                            if (cartItem && cartItem.qty > 1) {
                                              console.log('asas');
                                              dispatch(deleteMyCartItem(i._id));
                                              // dispatch(removeMyCartItem(i));
                                            } else {
                                              dispatch(deleteMyCartItem(i._id));
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
                                          style={{
                                            color: 'orange',
                                            marginLeft: 5,
                                          }}>
                                          {getItemQuantityById(i._id)}
                                        </Text>

                                        <TouchableOpacity
                                          style={{}}
                                          onPress={() => handleItemClick(i)}>
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
                                  )}
                                </View>
                              ))}
                          </View>
                        </View>
                      </ScrollView>
                    </View>
                  ) : (
                    <></>
                  )}

                  <View>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '900',
                        marginTop: 20,
                        fontSize: 17,
                      }}>
                      Service Includes
                    </Text>

                    <View style={{padding: 10}}>
                      {selectedItem?.serviceIncludes?.map((i, index) => (
                        <View key={index} style={{flexDirection: 'row'}}>
                          <Image
                            source={{
                              uri: `https://api.vijayhomesuperadmin.in/service/${selectedItem?.Desimg}`,
                            }}
                            style={{width: 16, height: 16, marginTop: 7}}
                          />
                          <Text
                            style={{
                              flexWrap: 'wrap',
                              flexDirection: 'row',
                              marginLeft: 5,
                              fontSize: 15,
                              marginTop: 3,
                              color: 'black',
                            }}>
                            {i.text}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {selectedItem?.serviceExcludes?.length > 0 ? (
                    <View>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: '900',
                          marginTop: 20,
                          fontSize: 16,
                        }}>
                        Service Excludes
                      </Text>

                      <View style={{padding: 10}}>
                        {selectedItem?.serviceExcludes?.map((i, index) => (
                          <View key={index} style={{flexDirection: 'row'}}>
                            <Image
                              source={{
                                uri: `https://api.vijayhomesuperadmin.in/service/${selectedItem?.Inimg}`,
                              }}
                              style={{width: 16, height: 16, marginTop: 5}}
                            />
                            <Text
                              style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                marginLeft: 5,
                                fontSize: 15,
                                marginTop: 3,
                                color: 'grey',
                              }}>
                              {i.text}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ) : (
                    <></>
                  )}
                  {svideodata.length > 0 ? (
                    <View>
                      <Text
                        style={{
                          fontSize: 19,
                          color: 'darkred',
                          fontWeight: 'bold',
                          marginTop: 10,
                        }}>
                        Thoughtful curations
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          fontWeight: 'bold',
                          marginTop: 5,
                        }}>
                        Of our finest experiences
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}

                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.5}}>
                      {svideodata[0] ? (
                        <Pressable onPress={handlePress1}>
                          <View
                            style={{
                              width: '90%',
                              height: 250,
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '',
                            }}>
                            {isPlaying1 == false ? (
                              <AntDesign
                                name="playcircleo"
                                color={'black'}
                                size={30}
                                style={{position: 'absolute', zIndex: 11}}
                              />
                            ) : (
                              <></>
                            )}
                            <Video
                              ref={videoRef1}
                              source={{
                                uri: `https://api.vijayhomesuperadmin.in/sVideo/${svideodata[0]?.serviceVideo}`,
                              }}
                              resizeMode="cover"
                              volume={1.0}
                              muted={!isPlaying1}
                              paused={!isPlaying1}
                              repeat={true}
                              playWhenInactive={false}
                              useTextureView={false}
                              playInBackground={true}
                              disableFocus={true}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                                marginTop: 10,
                              }}
                            />
                          </View>
                        </Pressable>
                      ) : (
                        <></>
                      )}
                    </View>
                    <View style={{flex: 0.5}}>
                      {svideodata[1] ? (
                        <Pressable onPress={handlePress2}>
                          <View
                            style={{
                              width: '90%',
                              height: 250,
                              borderRadius: 10,
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '',
                            }}>
                            {isPlaying2 == false ? (
                              <AntDesign
                                name="playcircleo"
                                color={`black`}
                                size={30}
                                style={{position: 'absolute', zIndex: 11}}
                              />
                            ) : (
                              <></>
                            )}
                            <Video
                              ref={videoRef2}
                              source={{
                                uri: `https://api.vijayhomesuperadmin.in/sVideo/${svideodata[1]?.serviceVideo}`,
                              }}
                              resizeMode="cover"
                              volume={1.0}
                              muted={!isPlaying2}
                              paused={!isPlaying2}
                              repeat={true}
                              useTextureView={false}
                              playInBackground={true}
                              disableFocus={true}
                              playWhenInactive={false}
                              style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 10,
                                marginTop: 10,
                                backgroundColor: `rgba(0, 0, 0, ${
                                  isPlaying2 ? 0 : 0.5
                                })`,
                              }}
                            />
                          </View>
                        </Pressable>
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>

                  {ReviewVideodata.length > 0 ? (
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: 'bold',
                        marginTop: 50,
                      }}>
                      Testimonial Videos
                    </Text>
                  ) : (
                    <></>
                  )}

                  {ReviewVideodata &&
                    ReviewVideodata.map((i, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            borderRadius: 10,
                            overflow: 'hidden',
                            marginTop: 20,
                          }}>
                          <YoutubeIframe
                            videoId={getVideoIdFromLink(i.Links)}
                            height={190}
                            width="100%"
                            play={true}
                            resizeMode="cover"
                            controls={1}
                          />
                        </View>
                      );
                    })}

                  {feqdata.length > 0 ? (
                    <View>
                      {feqdata.map(i => (
                        <View>
                          <Text
                            style={{
                              color: 'black',
                              fontWeight: 'bold',
                              marginTop: 15,
                              fontSize: 16,
                            }}>
                            {i.title}
                          </Text>
                          <View>
                            {i.img.map(item => (
                              <View
                                style={{
                                  marginTop: 10,

                                  alignItems: 'center',
                                }}>
                                <Image
                                  source={{
                                    uri: `https://api.vijayhomesuperadmin.in/feq/${item.data}`,
                                  }}
                                  style={{
                                    width: 300,
                                    height: 300,
                                    resizeMode: 'center',
                                  }}
                                />
                              </View>
                            ))}
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </ScrollView>

            {selectedItem?.serviceDirection === 'Enquiry' ||
            selectedItem?.serviceDirection === 'Survey' ? (
              <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ESpage', {sdata: selectedItem})
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      backgroundColor: 'darkred',
                      padding: 10,
                      marginTop: 5,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      width: '90%',
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      {selectedItem?.serviceDirection === 'Survey'
                        ? 'Schedule Inspection'
                        : 'Schedule Callback'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : Carttotal > 0 ? (
              <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'rgb(224, 206, 85)',
                    padding: 5,
                    marginTop: 5,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <MaterialIcons
                      name="local-offer"
                      size={15}
                      color="black"
                      style={{
                        marginTop: 3,
                        paddingRight: 3,
                        fontWeight: 'bold',
                      }}
                    />
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      Congratulations!
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 10,
                      fontWeight: 'bold',
                    }}>
                    <FontAwesome name="rupee" size={12} color="black" />{' '}
                    {CartSavedtotal}
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      marginLeft: 4,
                      fontWeight: 'bold',
                    }}>
                    {' '}
                    saved so far!
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={{
                      flex: 0.5,
                      backgroundColor: 'darkred',
                      color: 'white',
                      padding: 10,
                      width: '100%',
                      textAlign: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => navigation.navigate('cart')}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        Total
                      </Text>
                      <Text style={{color: 'white'}}>
                        {' '}
                        <FontAwesome
                          name="rupee"
                          size={13}
                          color="white"
                        />{' '}
                        {Carttotal}
                      </Text>
                    </View>

                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                      View Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <></>
            )}
          </Modal>

          <Modal
            animationType={'slide'}
            transparent={false}
            visible={showratecard}
            style={{backgroundColor: 'white'}}
            onRequestClose={() => {}}>
            <TouchableOpacity
              onPress={() => {
                setshowratecard(!showratecard);
              }}
              style={[styles.rateclose, styles.elevation]}>
              <Feather name="x" color="white" size={29} />
            </TouchableOpacity>

            <ScrollView>
              <View style={{marginTop: 40}}>
                {rateCarddata.filter(i => i.city === savecity).length > 0 ? (
                  rateCarddata
                    .filter(i => i.city === savecity)
                    .map((i, index) => (
                      <View key={index} style={{margin: 10, marginTop: 5}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            backgroundColor: 'black',
                            color: 'white',
                            padding: 8,
                          }}>
                          {i.header}
                        </Text>

                        {i.desc.map((item, descIndex) => (
                          <View
                            key={descIndex}
                            style={{
                              flexDirection: 'row',
                              marginBottom: 2,
                              justifyContent: 'space-between',
                              backgroundColor: 'lightgrey',
                              padding: 5,
                            }}>
                            <Text style={{color: 'black'}}>{item.text}</Text>
                            <Text style={{color: 'black'}}>{item.cg}</Text>
                          </View>
                        ))}
                      </View>
                    ))
                ) : (
                  <Text
                    style={{
                      margin: 10,
                      marginTop: 5,
                      fontSize: 16,
                      color: 'black',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    No data found !
                  </Text>
                )}
              </View>
            </ScrollView>
          </Modal>
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
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  minicon: {
    backgroundColor: 'white',
    margin: 10,
  },
  // servicesimg: {
  //   width: 80,
  //   height: 80,
  //   borderRadius: 5,
  // },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  textinput1: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    // marginTop: 5,
    // padding: 10,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  elevation1: {
    elevation: 1,
  },
  textinput2: {
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    padding: 10,
  },
  elevation2: {
    elevation: 15,
  },
  servicestext: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 9,
    marginTop: 5,
    width: 70,
    height: 50,
  },
  originalPrice: {
    color: 'gray',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    marginRight: 5,
    marginLeft: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    marginLeft: 20,
    marginRight: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '100%',
    position: 'absolute',
    bottom: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  servicesimg: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  modal: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginTop: 60,
    marginBottom: 90,
  },
  text: {
    color: '#3f2949',
    marginTop: 10,
  },
  textinput: {
    borderRadius: 10,
    backgroundColor: 'darkred',
    borderRadius: 50,
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 1,
    zIndex: 10,
  },

  rateclose: {
    borderRadius: 10,
    backgroundColor: 'black',
    borderRadius: 50,
    padding: 5,
    position: 'absolute',
    right: 10,
    top: 20,
    zIndex: 10,
  },
  elevation: {
    elevation: 15,
  },
  acimg: {
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    marginTop: 5,
    // height: 45,
    paddingLeft: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    width: '100%',
  },
  label: {
    color: 'black',
    textAlign: 'left',
  },
  logintext: {
    backgroundColor: '#3A75F6',
    padding: 10,
    marginLeft: 130,
    marginRight: 130,
    borderRadius: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  hrtag: {
    height: 1,
    backgroundColor: 'lightgray',
    margin: 15,
  },
  shead: {
    color: 'green',
    backgroundColor: 'rgb(219, 236, 231)',
    width: 150,
    borderTopRightRadius: 80,
    padding: 1,
    fontSize: 11,
    paddingLeft: 5,
    fontFamily: 'Poppins-Medium',
  },
  sbelow: {
    color: 'black',
    fontSize: 11,
    color: 'green',
    fontFamily: 'Poppins-Medium',
  },
  tb: {
    fontSize: 16,
    padding: 8,
    color: '#19c37d',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tb1: {
    flex: 0.33,
    padding: 8,
    color: 'darkred',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 111,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
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
export default Repairing;
