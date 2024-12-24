import React, {useState, useRef, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  PermissionsAndroid,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Pressable,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useFCMToken} from '../../ApiServices/FCMtoken';
import Geocoder from 'react-native-geocoding';

import {Linking} from 'react-native';

import {Card} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useDispatch, useSelector} from 'react-redux';
import {updateBTSwitch} from './Redux/BTSwitch';
import AutoUpdate from '../../AutoUpdate';
import Category from '../../Components/Category';
import Category1 from '../../Components/Category1';
import GetLocation from 'react-native-get-location';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

function Home({navigation}) {
  const [imgActive, setImgActive] = React.useState(0);
  const fcmtoken = useFCMToken();
  console.log('fcmtoken', fcmtoken);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imgActive < sliderImages.length - 1) {
        scrollViewRef.current.scrollTo({
          x: (imgActive + 1) * WIDTH,
          animated: true,
        });
      } else {
        scrollViewRef.current.scrollTo({x: 0, animated: true});
      }
    }, 3000); // Change the interval (in milliseconds) according to your needs

    return () => clearInterval(interval);
  }, [imgActive]);

  const onChange = event => {
    const slide = Math.ceil(
      event.contentOffset.x / event.layoutMeasurement.width,
    );
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setselectedCity] = useState();
  const [savecity, setsavecity] = useState('');
  const [city, setaddress] = useState('');
  const [Bannerdata, setBannerdata] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [postcategorydata, setpostcategorydata] = useState([]);
  const [subdata, setsubdata] = useState([]);
  const [homepagetitledata, sethomepagetitledata] = useState([]);
  const [spotlightdata, setspotlightdata] = useState([]);
  const [sdata, setsdata] = useState([]);
  const [servicedata, setservicedata] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState('');

  const [secondsdata, setsecondsdata] = useState([]);
  const [visible, setVisible] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [appupdateModalVisible, setappupdateModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [citydata, setcitydata] = useState([]);
  const [sliderImages, setSliderImages] = useState([]);

  const [version, setVersion] = useState('');

  const [CityModalVisible, setCityModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('savecity').then(value => {
      if (value) {
        // If a city is already saved, hide the modal
        setsavecity(value);
        setCityModalVisible(false);
      } else {
        // If no city is saved, show the modal
        setCityModalVisible(true);
      }
    });
  }, []);

  // useEffect(() => {
  //   checkDeviceVersion();
  //   getversions();
  // }, [version]);

  const getversions = async () => {
    let res = await axios.get(
      'https://api.vijayhomeservicebengaluru.in/api/getversions',
    );
    if ((res.status = 200)) {
      const version = res.data?.versions;

      setVersion(version[0]?.version);
    }
  };

  // const checkDeviceVersion = versions => {
  //   const phversion = DeviceInfo.getVersion();

  //   if (phversion < version) {
  //     setappupdateModalVisible(true);
  //   }
  // };

  const handleUpdatePress = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=com.vhs1');
  };

  useEffect(() => {
    spotlightbanner();
  }, []);

  const spotlightbanner = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getallbanner',
    );
    if ((res.status = 200)) {
      setSliderImages(res.data?.banner);
    }
  };

  const imageSliderData = sliderImages.map(item => ({
    img: `https://api.vijayhomesuperadmin.in/userbanner/${item.banner}`,
    subcategory: item.subcategory,
  }));
  const imagenew = imageSliderData.map(item => item.img);

  const setUserCity = sCity => {
    setselectedCity(sCity);
    AsyncStorage.setItem('savecity', sCity);
    setCityModalVisible(false);
  };

  // useEffect(() => {
  //   if (savecity) {
  //     setCityModalVisible(false);
  //   } else {
  //     setCityModalVisible(true);
  //   }
  // }, [savecity]);

  const toggleModal = () => {
    setModalVisible(true);
  };

  const close = () => {
    setSelectedCategory('');
    setModalVisible(false);
  };

  useEffect(() => {
    AsyncStorage.getItem('city').then(value => {
      setaddress(value);
    });
    AsyncStorage.getItem('savecity').then(value => {
      setsavecity(value);
    });
  }, []);

  function groupItemsIntoRows(items, itemsPerRow) {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
  }

  useEffect(() => {
    try {
      getcity();
    } catch (error) {
      console.error('An error occurred in the second useEffect:', error);
    }
  }, []);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error('An error occurred in the third useEffect:', error);
    }
  }, []);

  useEffect(() => {
    try {
      getsubcategory();
    } catch (error) {
      console.error('An error occurred in the fourth useEffect:', error);
    }
  }, [SelectedCategory]);

  useEffect(() => {
    try {
      getbannerimg();
      getcategory();
      getallsubcategory();
      gethomepagetitle();
    } catch (error) {
      console.error('An error occurred in the fifth useEffect:', error);
    }
  }, []);

  useEffect(() => {
    try {
      getservices();
    } catch (error) {
      console.error('An error occurred in the sixth useEffect:', error);
    }
  }, [homepagetitledata]);

  useEffect(() => {
    try {
      setInterval(() => {
        setVisible(!visible);
      }, 2000);
    } catch (error) {
      console.error('An error occurred in the seventh useEffect:', error);
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.vijayhomesuperadmin.in/api/userapp/getallbanner',
      );

      if (response.data && response.data.banner) {
        setBannerdata(response.data.banner);
      } else {
        console.error(
          "Error fetching images: API response does not contain 'addbanner' property",
        );
      }
    } catch (error) {
      console.error('No internet');
    }
  };

  const getsubcategory = async () => {
    let res = await axios.post(
      `https://api.vijayhomesuperadmin.in/api/userapp/postappsubcat/`,
      {
        category: SelectedCategory,
      },
    );

    if ((res.status = 200)) {
      setpostcategorydata(res.data?.subcategory);
    }
  };

  const getbannerimg = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getallspotlightbanner',
    );
    if ((res.status = 200)) {
      setspotlightdata(res.data?.spotlightbanner);
    }
  };

  const getcategory = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/getcategory',
    );
    if (res.status === 200) {
      setcategorydata(res.data?.category);
    }
  };

  const getservices = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat',
    );
    if (res.status === 200) {
      const data = res.data?.subcategory;
      const filteredData = data.filter(i => {
        const shouldInclude = i.homePagetitle === homepagetitledata[0]?.title;

        return shouldInclude;
      });

      setsdata(res.data?.subcategory);

      setservicedata(filteredData);
      setsecondsdata(
        data.filter(i => i.homePagetitle === homepagetitledata[1]?.title),
      );
    }
  };

  const gethomepagetitle = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/gettitle',
    );
    if ((res.status = 200)) {
      sethomepagetitledata(res.data?.homepagetitle);
    }
  };

  const getallsubcategory = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/userapp/getappsubcat',
    );
    if ((res.status = 200)) {
      setsubdata(res.data?.subcategory);
    }
  };

  const getcity = async () => {
    let res = await axios.get(
      'https://api.vijayhomesuperadmin.in/api/master/getcity',
    );
    if ((res.status = 200)) {
      setcitydata(res.data?.mastercity);
    }
  };

  const startRefreshTimer = (refreshCallback, interval) => {
    const timer = setInterval(() => {
      refreshCallback();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);

    setTimeout(() => {
      setRefresh(false);
    }, 2000);
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

  const MyCartItmes = useSelector(state => state.cart);
  const TotalQuantity = MyCartItmes.reduce((accumulator, item) => {
    const quantity = parseInt(item?.qty);
    if (!isNaN(quantity)) {
      return accumulator + quantity;
    } else {
      return accumulator;
    }
  }, 0);

  const [address, setAddress] = useState({address: '', markerCoordinate: {}});
  useEffect(() => {
    Geocoder.init('AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk');
  }, []);
  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const location = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        });

        const {latitude, longitude} = location;

        fetchAddress(latitude, longitude);
      } catch (error) {
        const {code, message} = error;
        console.warn(code, message);
      }
    };

    const fetchAddress = async (latitude, longitude) => {
      try {
        const response = await Geocoder.from(latitude, longitude);
        const address = response.results[0].formatted_address;

        const abc = {
          address: address,
          markerCoordinate: {latitude: latitude, longitude: longitude},
        };
        AsyncStorage.setItem('address', JSON.stringify(abc));
        AsyncStorage.setItem('locationData', JSON.stringify(abc));

        console.log('abc', abc);
        setAddress({
          address: abc,
          markerCoordinate: {latitude: latitude, longitude: longitude},
        });
      } catch (error) {
        console.error('Error fetching address: ', error);
      }
    };

    getCurrentLocation();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="darkred" barStyle="light-content" />
      <View style={styles.container} key={refresh}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <Image
              source={require('../../../assets/Banner1.jpg')}
              style={{
                width: '100%',
                height: 60,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                elevation: 1,

                backgroundColor: 'white',
              }}>
              <Pressable
                style={{flex: 0.8}}
                onPress={() => setCityModalVisible(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    // borderWidth: 1,
                    elevation: 3,
                    padding: 5,
                    width: 140,
                    borderRadius: 5,
                    borderColor: 'grey',
                    backgroundColor: 'white',
                  }}>
                  <Feather
                    name="map-pin"
                    size={18}
                    color="black"
                    style={{marginTop: 3}}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: 'Poppins-Medium',
                      fontSize: 14,
                      marginLeft: 5,
                    }}>
                    {selectedCity ? selectedCity : savecity}
                  </Text>
                </View>
              </Pressable>

              <View style={{flex: 0.35, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('wallet')}
                  style={{marginRight: 10}}>
                  <Entypo name="wallet" color="darkred" size={30} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{position: 'relative', marginRight: 10}}
                  onPress={() => {
                    if (TotalQuantity && TotalQuantity > 0) {
                      navigation.navigate('cart');
                    } else {
                      // Handle the case when TotalQuantity doesn't exist or is 0
                      // For example, show an alert or perform a different action
                      alert('Please book the service and comeback.');
                      console.log('TotalQuantity is not present or zero');
                    }
                  }}>
                  <Entypo name="shopping-cart" color="darkred" size={30} />
                  {TotalQuantity > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor: 'orange',
                        borderRadius: 10,
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        right: -5,
                        top: -5,
                      }}>
                      <Text style={{color: 'darkred', fontSize: 12}}>
                        {TotalQuantity}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{marginRight: 10}}>
                  <MaterialIcons name="account-box" color="darkred" size={33} />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: 'white',
                // borderWidth: 1,
                elevation: 5,
                borderColor: 'grey',
                padding: 12,
                margin: 15,
                borderRadius: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.navigate('search')}>
                <Text style={[styles.text, styles.elevation]}>
                  Search here...
                </Text>

                <FontAwesome
                  name="search"
                  color="black"
                  size={20}
                  style={{position: 'absolute', top: -1}}
                />
              </TouchableOpacity>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <View style={{}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 18,
                    paddingLeft: 20,
                    marginTop: 10,
                  }}>
                  Services By Us
                </Text>

                <View style={{margin: 10}}>
                  {groupItemsIntoRows(categorydata, 4).map(
                    (rowItems, rowIndex) => (
                      <View key={rowIndex} style={{flexDirection: 'row'}}>
                        {rowItems.map((item, index) => (
                          <TouchableOpacity
                            onPress={() => {
                              if (item.category === 'Packers & Movers') {
                                navigation.navigate('Bottomtab');
                              } else {
                                setSelectedCategory(item.category);
                                toggleModal();
                              }
                            }}
                            style={{
                              flex: 1 / 4,
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 1,
                            }}>
                            {item ? (
                              <View style={{marginTop: 10}}>
                                <View style={styles.servicesimgrow}>
                                  <Image
                                    source={{
                                      uri: `https://api.vijayhomesuperadmin.in/category/${item.categoryImg}`,
                                    }}
                                    style={styles.servicesimg}
                                  />
                                </View>
                                <Text style={styles.servicestext}>
                                  {item.category}
                                </Text>
                              </View>
                            ) : (
                              <></>
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    ),
                  )}
                </View>
              </View>
            </View>
            <SafeAreaView style={styles.container}>
              <ScrollView
                ref={scrollViewRef}
                onScroll={({nativeEvent}) => onChange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.scrollView}>
                {imageSliderData.map((e, index) => (
                  <TouchableOpacity
                    key={index.toString()} // Use index as a key (assuming it's unique)
                    style={styles.imageContainer}
                    onPress={() => {
                      const filteredData = sdata.filter(
                        i => i.subcategory === e.subcategory,
                      );
                      if (filteredData.length > 0) {
                        // Check if filteredData is not empty
                        navigation.navigate('repairing', {
                          cdata: filteredData[0],
                        });
                      }
                    }}>
                    <Image
                      resizeMode="stretch"
                      style={styles.image}
                      source={{uri: e.img}}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <View style={styles.wrapDot}>
                {imagenew.map((e, index) => (
                  <Text
                    key={e}
                    style={imgActive === index ? styles.dotActive : styles.dot}>
                    ●
                  </Text>
                ))}
              </View>
            </SafeAreaView>

            {/* Cleaning */}
            <Category
              navigation={navigation}
              category={categorydata[0]?.category}
              subdata={subdata}
              title={'Up to 50% off'}
              color={'#ffb6c1'}
            />
            <Category
              navigation={navigation}
              category={categorydata[1]?.category}
              subdata={subdata}
              title={'100% in House Staff'}
              color={'#add8e6'}
            />
            <Category
              navigation={navigation}
              category={categorydata[2]?.category}
              subdata={subdata}
              title={'Licensed Company'}
              color={'#98fb98'}
            />

            <View style={{backgroundColor: 'white'}}>
              <TouchableOpacity
                style={{margin: 20}}
                onPress={() => {
                  if (categorydata[5]?.category === 'Packers & Movers') {
                    navigation.navigate('Bottomtab');
                  } else {
                    navigation.navigate('repairing', {
                      cdata: i,
                    });
                  }
                }}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text style={styles.homepagetitle}>
                    {categorydata[5]?.category}
                  </Text>
                  <Text
                    style={{
                      backgroundColor: '#ffb6c1',
                      borderRadius: 20,
                      paddingHorizontal: 10,
                      paddingVertical: 3,
                      fontSize: 12,
                      color: 'black',
                      textTransform: 'uppercase',
                      marginTop: 5,
                      marginBottom: 5,
                      marginLeft: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontFamily: 'Poppins-Medium',
                    }}>
                    1lakh + Happy Customer
                  </Text>
                </View>
                <Image
                  source={{
                    uri: `https://vijayahomeservices.b-cdn.net/Banner%20VHS-01.jpg`,
                  }}
                  style={{width: '100%', height: 180, resizeMode: 'cover'}}
                />
                {/* <View
                  style={{
                    // position: 'absolute',
                    zIndex: 1,
                    backgroundColor: 'rgb(135, 20, 20)',
                    padding: 5,
                    borderRadius: 3,

                    // right: 50,
                    // left: 40,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: 100,
                    top: -20,
                  }}>
                  <Text style={{color: 'white'}}>Book Now</Text>
                </View> */}
              </TouchableOpacity>
            </View>
            <View style={{margin: 15}}>
              <Pressable
                onPress={() =>
                  navigation.navigate('repairing', {
                    cdata: sdata.find(
                      i => i.subcategory === spotlightdata[0]?.category,
                    ),
                  })
                }>
                <Card style={styles.bcard}>
                  <View style={styles.booknow}>
                    <Text style={{color: 'white'}}>Book Now</Text>
                  </View>

                  <Image
                    source={{
                      uri: `https://api.vijayhomesuperadmin.in/spotlight/${spotlightdata[0]?.banner}`,
                    }}
                    style={styles.bannerimg}
                  />
                </Card>
              </Pressable>
            </View>

            <Category1
              navigation={navigation}
              category={categorydata[3]?.category}
              subdata={subdata}
              title={'Shine Like New'}
              color={'#98fb98'}
            />

            <Category1
              navigation={navigation}
              category={categorydata[6]?.category}
              subdata={subdata}
              title={'100+ Booking Per Day'}
              color={'#ffb6c1'}
            />

            <View style={{margin: 15}}>
              <Pressable
                onPress={() =>
                  navigation.navigate('repairing', {
                    cdata: sdata.find(
                      i => i.subcategory === spotlightdata[1]?.category,
                    ),
                  })
                }>
                <Card style={styles.bcard}>
                  <View style={styles.booknow}>
                    <Text style={{color: 'white'}}>Book Now</Text>
                  </View>

                  <Image
                    source={{
                      uri: `https://api.vijayhomesuperadmin.in/spotlight/${spotlightdata[1]?.banner}`,
                    }}
                    style={styles.bannerimg}
                  />
                </Card>
              </Pressable>
            </View>

            <Category1
              navigation={navigation}
              category={categorydata[4]?.category}
              subdata={subdata}
              title={'Trained Team'}
              color={'#ffb6c1'}
            />
            <Category1
              navigation={navigation}
              category={categorydata[7]?.category}
              subdata={subdata}
            />

            <View style={{margin: 15}}>
              <Pressable
                onPress={() =>
                  navigation.navigate('repairing', {
                    cdata: sdata.find(
                      i => i.subcategory === spotlightdata[2]?.category,
                    ),
                  })
                }>
                <Card style={styles.bcard}>
                  <View style={styles.booknow}>
                    <Text style={{color: 'white'}}>Book Now</Text>
                  </View>

                  <Image
                    source={{
                      uri: `https://api.vijayhomesuperadmin.in/spotlight/${spotlightdata[2]?.banner}`,
                    }}
                    style={styles.bannerimg}
                  />
                </Card>
              </Pressable>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <View style={{margin: 20}}>
                <Text style={styles.homepagetitle}>
                  {homepagetitledata[0]?.title}
                </Text>

                <View style={{marginTop: 10}}>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {sdata
                      .filter(
                        i => i.homePagetitle === homepagetitledata[0]?.title,
                      ) // Filter based on category
                      .map((i, index) => (
                        <View style={{flex: 1, flexDirection: 'row'}}>
                          <TouchableOpacity
                            key={i._id} // The key prop should be applied here, on the outermost element.
                            onPress={() => {
                              if (i.category.trim() === 'Packers & Movers') {
                                navigation.navigate('Bottomtab'); // Uncomment this when needed.
                              } else {
                                navigation.navigate('repairing', {
                                  cdata: i,
                                });
                              }
                            }}
                            style={{
                              flex: 1 / 3, // Each item should take 1/3 of the row width
                              paddingHorizontal: 8, // Add some horizontal spacing between items
                            }}>
                            <View style={styles.servicesimgrow1}>
                              <Image
                                source={{
                                  uri: `https://api.vijayhomesuperadmin.in/subcat/${i.subcatimg}`,
                                }}
                                style={styles.servicesimg1}
                              />
                            </View>
                            <Text style={styles.servicestext1}>
                              {i.subcategory}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                  </ScrollView>
                </View>
              </View>
            </View>
            {homepagetitledata[1]?.title ? (
              <View style={{backgroundColor: 'white'}}>
                <View style={{margin: 20}}>
                  <Text style={styles.homepagetitle}>
                    {homepagetitledata[1]?.title}
                  </Text>

                  <View style={{marginTop: 10}}>
                    <ScrollView
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
                      {sdata
                        .filter(
                          i => i.homePagetitle === homepagetitledata[1]?.title,
                        ) // Filter based on category
                        .map((i, index) => (
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <TouchableOpacity
                              key={i._id} // The key prop should be applied here, on the outermost element.
                              onPress={() => {
                                if (i.category.trim() === 'Packers & Movers') {
                                  navigation.navigate('Bottomtab'); // Uncomment this when needed.
                                } else {
                                  navigation.navigate('repairing', {
                                    cdata: i,
                                  });
                                }
                              }}
                              style={{
                                flex: 1 / 3, // Each item should take 1/3 of the row width
                                paddingHorizontal: 8, // Add some horizontal spacing between items
                              }}>
                              <View style={styles.servicesimgrow1}>
                                <Image
                                  source={{
                                    uri: `https://api.vijayhomesuperadmin.in/subcat/${i.subcatimg}`,
                                  }}
                                  style={styles.servicesimg1}
                                />
                              </View>
                              <Text style={styles.servicestext1}>
                                {i.subcategory}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('socialmedia')}
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: 'gray',
                padding: 10,
                margin: 15,
                backgroundColor: 'gray',
                borderRadius: 10,
                marginBottom: 100,
              }}>
              <View style={{flex: 0.85, padding: 5}}>
                <Text style={{color: 'white', fontSize: 18, fontWeight: '600'}}>
                  Connect with us
                </Text>
                <Text style={{color: 'white'}}>
                  Connect with us and get first buy bonus connect for more
                  updates
                </Text>
              </View>
              <TouchableOpacity style={{flex: 0.15}}>
                <Entypo name="chat" size={50} color="black" />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal isVisible={isModalVisible}>
          <TouchableOpacity onPress={close}>
            <AntDesign
              name="closecircleo"
              color="darkred"
              size={30}
              style={{
                width: 30,
                justifyContent: 'flex-end',
                alignSelf: 'flex-end',
                textAlign: 'right',
                marginTop: 10,
                backgroundColor: 'white',
                zIndex: 11,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>

          <View style={{backgroundColor: 'white'}}>
            <Image
              source={require('../../../assets/Banner2.jpg')}
              style={{
                width: '100%',
                height: 100,
                resizeMode: 'cover',
                // marginTop: -7,
              }}
            />

            {postcategorydata.length > 0 ? (
              <FlatList
                data={postcategorydata.sort(
                  (a, b) => parseInt(a.order.trim()) - parseInt(b.order.trim()),
                )}
                numColumns={4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      setSelectedCategory('');
                      navigation.navigate('repairing', {cdata: item});
                    }}
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 5,
                      padding: 3,
                    }}>
                    <View>
                      <Image
                        source={{
                          uri: `https://api.vijayhomesuperadmin.in/subcat/${item.subcatimg}`,
                        }}
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: 'lightgrey',
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: 10,
                        color: 'black',
                        textAlign: 'left',
                        height: 'auto',
                        fontWeight: 'bold',
                      }}>
                      {item.subcategory}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View>
                <ActivityIndicator size="large" color="darkred" />
              </View>
            )}
          </View>
        </Modal>

        <Modal isVisible={CityModalVisible}>
          <View style={{borderRadius: 20, backgroundColor: 'white'}}>
            <Image
              source={require('../../../assets/city.jpg')}
              style={{
                width: '100%',
                height: 100,
              }}
            />
            <View style={styles.modalContainer}>
              {citydata
                .slice()
                .sort((a, b) => a.city.localeCompare(b.city))
                .map((i, index) => (
                  <TouchableOpacity
                    key={i._id}
                    onPress={() => setUserCity(i.city)}
                    style={[
                      styles.cityItem,
                      {
                        backgroundColor:
                          selectedCity === i.city ? 'darkred' : 'white',
                      },
                    ]}>
                    <Feather
                      name="map-pin"
                      size={18}
                      style={{
                        marginTop: 4,
                        color: selectedCity === i.city ? 'white' : 'darkred',
                      }}
                    />
                    <Text
                      style={{
                        color: selectedCity === i.city ? 'white' : 'black',
                        marginTop: 3,
                        marginLeft: 5,
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {i.city}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        </Modal>

        <Modal isVisible={appupdateModalVisible}>
          <View style={{borderRadius: 20, backgroundColor: 'white'}}>
            {/* <Image
                source={require("../assets/india-theme.jpg")}
                style={{
                  width: "100%",
                  height: 100,
                }}
              /> */}
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                marginTop: 20,
              }}>
              New update is available
            </Text>
            <Text style={{color: 'grey', textAlign: 'center', marginTop: 20}}>
              The current version of this application is no longer supported. We
              apologize for any inconvenience we may have caused you.
            </Text>

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={handleUpdatePress}>
                <Text
                  style={{
                    backgroundColor: 'darkred',
                    color: 'white',
                    padding: 8,
                    borderRadius: 20,
                    marginTop: 20,
                    width: 150,
                    textAlign: 'center',
                    marginBottom: 20,
                  }}>
                  UPDATE NOW
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <AutoUpdate />
      {/* )} */}
    </View>
  );
}
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: 'white',
    // marginBottom: 20,
    // margin: 15,
  },
  modalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    marginBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    padding: 10,
  },
  cityItem: {
    flexBasis: '44%', // Set to 48% for 2 cities per row with some spacing
    margin: 5,
    padding: 5,
    borderRadius: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
  },
  card: {
    // width: windowWidth,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: 'red', // Customize the active indicator color
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: 100,
    height: 100,
  },

  row: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 15,
  },
  textinput: {
    margin: 15,
    borderRadius: 10,
    paddingLeft: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
  textinputicon: {
    position: 'absolute',
    top: 27,
    marginLeft: 13,
    paddingLeft: 10,
  },
  homepagetitle: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    paddingVertical: 5,
  },
  elevation: {
    elevation: 2,
  },
  row1: {
    backgroundColor: 'white',
    marginTop: 10,
    flex: 1,
  },
  servicesimgrow: {
    // backgroundColor: "#e8f0fe75",
    padding: 1,
    borderRadius: 5,
    // width: 80,
    // height: 80,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
  },
  servicesimgrow1: {
    width: 100,
    height: 100,
  },
  servicesimg: {
    width: 65,
    height: 65,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  servicesimg1: {
    width: '100%',
    height: 90,
    borderRadius: 10,
    resizeMode: 'contain',
    marginRight: 5,
  },
  servicestext: {
    color: 'black',
    // fontWeight: "bold",
    textAlign: 'center',
    fontSize: 11,
    // height: 30,
    marginTop: 5,
    fontFamily: 'Poppins-Medium',
  },
  servicestext1: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 12,
    // height: ,
    width: 100,
  },
  wrow: {
    backgroundColor: 'white',
    padding: 20,
    flex: 0.5,
    borderRadius: 5,
    width: 250,
    marginBottom: 5,
  },
  wrow1: {
    backgroundColor: 'white',
    padding: 20,
    flex: 0.5,
    borderRadius: 5,
    width: 250,
    marginLeft: 10,
    marginBottom: 5,
  },
  helpimg: {
    width: 60,
    height: 60,
    marginTop: 70,
    borderRadius: 50,
  },
  homeimg: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  row2: {
    backgroundColor: '#a61717',
    marginTop: 20,
  },
  listTab: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 10,
  },
  btnTab: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 10,
    marginRight: 10,
    width: 80,
    justifyContent: 'center',
    // width: Dimensions.get('window').width / 3.5,
  },

  textTab: {
    fontSize: 12,
  },
  btnTabActive: {
    borderColor: 'red',
  },
  textTabActive: {
    color: 'red',
  },
  itemcontainer: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  filtertext: {
    position: 'absolute',
    left: 33,
    fontSize: 12,
    color: 'black',
  },
  filtericon: {
    position: 'absolute',
    bottom: 5,
    right: 35,
    color: 'white',
    fontSize: 30,
  },
  filterimg: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  filtercontainer: {
    flex: 0.5,
    textAlign: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    paddingLeft: 40,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  textinput1: {
    // backgroundColor: '#eee',
    borderWidth: 1,
    borderColor: '#eee',
    width: '100%',
    fontSize: 16,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  bcard: {
    width: '100%',
    height: 230,
  },
  bannerimg: {
    width: '100%',
    height: 230,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  hrtag: {
    height: 1,
    backgroundColor: 'lightgray',
    margin: 15,
  },
  booknow: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgb(135, 20, 20)',
    padding: 5,
    borderRadius: 3,
    bottom: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
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
  scrollView: {
    width: WIDTH,
    height: HEIGHT * 0.25,
    marginTop: 10,
  },
  imageContainer: {
    borderRadius: 10,
    marginHorizontal: 10, // Adjust this value to set the desired gap on both sides
  },
  image: {
    width: WIDTH - 20, // Adjust this value to account for the gap on both sides
    height: HEIGHT * 0.25,
    borderRadius: 10,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: '#ffff',
  },
});
export default Home;
