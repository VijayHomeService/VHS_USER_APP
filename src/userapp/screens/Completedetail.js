import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios, {all} from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import Video from 'react-native-video';
import StarRating from 'react-native-star-rating-widget';
import Loader from './Loader';

function Upcomingdetail({navigation}) {
  const formatDate = dateString => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const route = useRoute();
  const {allorder} = route.params;
  const [technisian, setTechnisian] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [paymentMode, setpaymentMode] = useState('');
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [someCondition, setsomeCondition] = useState(false);
  const [rating, setRating] = useState(0);
  const [isratingmodel, setisratingmodel] = useState(false);
  const [ratingData, setratingData] = useState([]);
  const [review, setreview] = useState('');

  const toggleModal2 = () => {
    setisratingmodel(!isratingmodel);
  };

  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setValue(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    getallserviceorder();
  }, []);

  const getallserviceorder = async () => {
    try {
      const res = await axios.get(
        'https://api.vijayhomeservicebengaluru.in/api/getalltechnician',
      );
      if (res.status === 200) {
        const filteredOrders = res.data?.technician.filter(
          order => order._id === allorder.dsrdata[0]?.TechorPMorVendorID,
        );

        setTechnisian(filteredOrders);
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching service orders: ', error);
    }
  };

  const [paymentsstatus, setpaymentsstatus] = useState([]);

  useEffect(() => {
    getPayment();
  }, []);

  useEffect(() => {
    if (value && paymentsstatus.length > 0 && allorder) {
      // Filtering based on the provided criteria
      const filteredData = {
        payments: paymentsstatus.filter(item => item.userId === value._id),
        allorder: allorder._id,
      };
    }
  }, [value, paymentsstatus, allorder]);

  const getPayment = async () => {
    try {
      const res = await axios.get(
        'https://api.vijayhomeservicebengaluru.in/api/payment/service/getservicePayments',
      );
      if (res.status === 200) {
        setpaymentsstatus(res.data?.success);
      } else {
        console.error('Failed to fetch payment data.');
      }
    } catch (error) {
      console.error('Error fetching payment data: ', error);
    }
  };

  const {payments} = paymentsstatus;

  const updateReview = async () => {
    if (!rating) {
      alert('Please write review');
    } else {
      try {
        const config = {
          url: `/userapp/addrating`,
          method: 'post',
          baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
          // data: formdata,
          headers: {'content-type': 'application/json'},
          data: {
            ServiceName: allorder?.service,
            rating: rating,
            review: review,
            userId: value?._id,
            serviceID: allorder?._id,
            customerName: value.customerName,
          },
        };
        await axios(config).then(function (response) {
          if (response.status === 200) {
            setisratingmodel(false);
            setsomeCondition(false);
            alert('Thank for giving the feedback');
          }
        });
      } catch (error) {
        console.error(error);
        alert('Please try again later');
      }
    }
  };

  useEffect(() => {
    getratings();
  }, [allorder]);

  const getratings = async () => {
    try {
      const response = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/userapp/getallrating`,
      );

      if (response.status === 200 || response.status === 201) {
        setratingData(
          response.data?.rating.filter(
            i =>
              i.userId === allorder?.customerData[0]?._id ||
              i.serviceID === allorder?._id,
          ),
        );
      } else {
        console.error('Failed to fetch data. Status:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while fetching data:', error);
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (ratingData?.length > 0) {
  //       setisratingmodel(false);
  //     } else {
  //       setisratingmodel(true);
  //     }
  //   }, 3000); // 1000ms = 1 second

  //   return () => clearInterval(interval); // Cleanup the interval on component unmount
  // }, [allorder, ratingData]);

  const [isLoading, setIsLoading] = useState(true);

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
  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          <ScrollView style={{marginBottom: 50}}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                margin: 10,
                flexWrap: 'wrap',
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
                {allorder?.category}
              </Text>
            </View>

            {allorder && allorder?.paymentMode === 'cash' ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 15,
                    elevation: 3,
                    backgroundColor: 'white',
                    margin: 10,
                    borderRadius: 5,
                  }}>
                  <View style={{flex: 0.7}}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 15,
                        fontWeight: '600',
                      }}>
                      Thanks for Choosing Vijay Home Servicess
                    </Text>

                    <TouchableOpacity
                      style={{flexDirection: 'row', marginTop: 5}}>
                      <Text style={{color: 'black'}}> ● Service Charge</Text>

                      {allorder?.GrandTotal ? (
                        <Text style={{color: 'black', marginLeft: 5}}>
                          ₹ {allorder?.GrandTotal}
                        </Text>
                      ) : (
                        <Text style={{color: 'black', marginLeft: 5}}>
                          ₹ {allorder?.serviceCharge}
                        </Text>
                      )}
                    </TouchableOpacity>

                    <View>
                      <Text
                        style={{
                          color: 'green',
                          backgroundColor: 'aliceblue',
                          width: 90,
                          marginTop: 5,
                          textAlign: 'center',
                        }}>
                        Completed
                      </Text>
                    </View>

                    {/* <TouchableOpacity
                      onPress={toggleModal}
                      style={{
                        borderWidth: 1,
                        borderColor: 'grey',
                        padding: 8,
                        borderRadius: 5,
                        width: 130,
                        marginTop: 10,
                      }}>
                      <Text style={{textAlign: 'center'}}>View Receipt</Text>
                    </TouchableOpacity> */}
                  </View>
                  <View
                    style={{
                      flex: 0.3,
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}>
                    <Video
                      source={require('../../../assets/a.mp4')}
                      style={{
                        width: 70,
                        height: 70,
                      }}
                      muted={false}
                      repeat={true}
                      resizeMode="contain"
                      paused={false}
                    />
                  </View>
                </View>
              </>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  padding: 15,
                  elevation: 3,
                  backgroundColor: 'white',
                  margin: 10,
                  borderRadius: 5,
                }}>
                <View style={{flex: 0.7}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: '600',
                    }}>
                    Thanks for Choosing Vijay Home Servicess
                  </Text>

                  <TouchableOpacity
                    style={{flexDirection: 'row', marginTop: 5}}>
                    <Text style={{color: 'green', fontSize: 17}}> ● Paid</Text>

                    {allorder?.GrandTotal ? (
                      <Text
                        style={{color: 'green', fontSize: 17, marginLeft: 5}}>
                        ₹ {allorder?.GrandTotal}
                      </Text>
                    ) : (
                      <Text
                        style={{color: 'green', fontSize: 17, marginLeft: 5}}>
                        ₹ {allorder.serviceCharge}
                      </Text>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={toggleModal}
                    style={{
                      borderWidth: 1,
                      borderColor: 'grey',
                      padding: 8,
                      borderRadius: 5,
                      width: 130,
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: 'green',
                    }}>
                    <Text style={{textAlign: 'center', color: 'black'}}>
                      View Receipt
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 0.3,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  <Video
                    source={require('../../../assets/a.mp4')}
                    style={{
                      width: 80,
                      height: 80,
                    }}
                    muted={false}
                    repeat={true}
                    resizeMode="contain"
                    paused={false}
                  />
                </View>
              </View>
            )}
            {technisian[0]?.vhsname ? (
              <View
                style={{
                  backgroundColor: 'white',
                  elevation: 3,
                  borderRadius: 5,
                  padding: 15,
                  margin: 10,
                }}>
                <Text
                  style={{fontSize: 15, color: 'darkred', fontWeight: '700'}}>
                  Technician Details
                </Text>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{color: 'black'}}>Name : </Text>

                  <Text style={{color: 'grey', fontSize: 14}}>
                    {technisian[0]?.vhsname}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{color: 'black'}}>Exp : </Text>
                  <Text style={{color: 'grey', fontSize: 14}}>
                    {technisian[0]?.experiance}
                  </Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Text style={{color: 'black'}}>Languages know : </Text>
                  <Text style={{color: 'grey', fontSize: 14}}>
                    {technisian[0]?.languagesknow}
                  </Text>
                </View>
              </View>
            ) : (
              <></>
            )}

            <View
              style={{
                backgroundColor: 'white',
                elevation: 3,
                borderRadius: 5,
                padding: 15,
                margin: 10,
              }}>
              <Text style={{fontSize: 15, color: 'darkred', fontWeight: '700'}}>
                Service Dates
              </Text>

              {allorder?.dividedDates?.map(dateInfo => (
                <Text
                  style={{color: 'grey', fontSize: 14, marginTop: 5}}
                  key={dateInfo.id}>
                  {formatDate(dateInfo.date)}
                </Text>
              ))}
            </View>

            <View
              style={{
                backgroundColor: 'white',
                elevation: 3,
                borderRadius: 5,
                padding: 15,
                margin: 10,
              }}>
              <Text style={{fontSize: 15, color: 'darkred', fontWeight: '700'}}>
                Service slot
              </Text>

              <Text style={{color: 'grey', fontSize: 14, marginTop: 5}}>
                {allorder?.selectedSlotText}
              </Text>
            </View>

            {allorder ? (
              <>
                <View
                  style={{
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 5,
                    padding: 15,
                    margin: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'darkred',
                      fontWeight: '700',
                    }}>
                    Services details
                  </Text>
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View>
                      <Text style={styles.text}>
                        {allorder.desc.replace(/,/g, '\n')}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              ''
            )}

            {/* {allorder  ? (
              <>
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 3,
                    borderRadius: 5,
                    padding: 15,
                    margin: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "darkred",
                      fontWeight: "700",
                    }}
                  >
                    Addons
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 7 }}>
                    <View style={{ flex: 0.7 }}>
                      <Text style={styles.text}>Plan Name</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "flex-end" }}>
                      <Text style={{ color: "black", fontSize: 14 }}>
                        {allorder?.AddOns[0]?.planName}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: 7 }}>
                    <View style={{ flex: 0.7 }}>
                      <Text style={styles.text}>Plan Price</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "flex-end" }}>
                      <Text style={{ color: "black", fontSize: 14 }}>
                        {allorder?.AddOns[0]?.planPrice}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: 7 }}>
                    <View style={{ flex: 0.7 }}>
                      <Text style={styles.text}>Offer Price</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "flex-end" }}>
                      <Text style={{ color: "black", fontSize: 14 }}>
                        {allorder?.AddOns[0]?.oferprice}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "row", marginTop: 7 }}>
                    <View style={{ flex: 0.7 }}>
                      <Text style={styles.text}>Quantity</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: "flex-end" }}>
                      <Text style={{ color: "black", fontSize: 14 }}>
                        {allorder?.AddOns[0]?.qty}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              ""
            )} */}

            <View
              style={{
                backgroundColor: 'white',
                elevation: 3,
                borderRadius: 5,
                padding: 15,
                margin: 10,
              }}>
              <Text style={{fontSize: 15, color: 'darkred', fontWeight: '700'}}>
                Payment Summary
              </Text>

              {allorder && allorder.TotalAmt ? (
                <>
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View style={{flex: 0.7}}>
                      <Text style={styles.text}>Total Amount</Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 14,
                          textDecorationLine: 'line-through',
                        }}>
                        ₹ {allorder?.TotalAmt}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                ''
              )}

              {allorder && allorder.discAmt ? (
                <>
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View style={{flex: 0.7}}>
                      <Text style={styles.text}>Discount</Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Text style={{color: 'black', fontSize: 14}}>
                        ₹ {allorder?.discAmt}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                ''
              )}

              {allorder && allorder.totalSaved ? (
                <>
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View style={{flex: 0.7}}>
                      <Text style={styles.text1}>Saved</Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Text style={styles.text1}>₹ {allorder?.totalSaved}</Text>
                    </View>
                  </View>
                </>
              ) : (
                ''
              )}

              {allorder && allorder.couponCode ? (
                <>
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View style={{flex: 0.7}}>
                      <Text style={{color: 'rgb(1, 107, 248)'}}>Coupons</Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Text style={{color: 'rgb(1, 107, 248)', fontSize: 12}}>
                        {allorder?.couponCode}
                      </Text>
                    </View>
                  </View>
                </>
              ) : (
                ''
              )}

              <View style={{flexDirection: 'row', marginTop: 7}}>
                <View style={{flex: 0.7}}>
                  <Text style={styles.text2}>GrandTotal</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                  <Text style={styles.text2}>₹ {allorder?.GrandTotal}</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                elevation: 3,
                borderRadius: 5,
                padding: 15,
                margin: 10,
              }}>
              <Text style={{fontSize: 15, color: 'darkred', fontWeight: '700'}}>
                Booking Details
              </Text>

              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={{flexDirection: 'row', marginTop: 10}}>
                <View style={{flex: 0.1}}>
                  <MaterialCommunityIcons name="cash" color="black" size={28} />
                </View>
                <View
                  style={{
                    flex: 0.8,
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  {allorder?.GrandTotal ? (
                    <Text style={{color: 'black'}}>
                      Amount : ₹ {allorder?.GrandTotal}
                    </Text>
                  ) : (
                    <Text style={{color: 'black'}}>
                      Amount : ₹ {allorder?.serviceCharge}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    flex: 0.1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                  }}>
                  {/* <AntDesign name="right" color="grey" size={15} /> */}
                </View>
              </TouchableOpacity>

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{flex: 0.1}}>
                  <Entypo name="location-pin" color="black" size={28} />
                </View>
                <View
                  style={{
                    flex: 0.9,

                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    padding: 10,
                    marginTop: -5,
                  }}>
                  <Text style={{color: 'black', fontSize: 13}}>
                    {allorder?.deliveryAddress?.platNo}
                  </Text>
                  <Text style={{color: 'black', fontSize: 13}}>
                    ,{allorder?.deliveryAddress?.landmark}
                  </Text>
                  <Text style={{color: 'black', fontSize: 13}}>
                    ,{allorder?.deliveryAddress?.address}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{flex: 0.1}}>
                  <AntDesign name="clockcircleo" color="black" size={20} />
                </View>
                <View
                  style={{
                    flex: 0.9,
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}>
                  <Text style={{color: 'black', fontSize: 13}}>
                    {allorder?.date}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          <View>
            <TouchableOpacity
              onPress={toggleModal2}
              style={{
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'darkred',
              }}>
              <Text style={{color: 'white', fontWeight: '800'}}> REVIEW</Text>
            </TouchableOpacity>
          </View>
          {/* Modal */}

          {allorder && allorder.paymentMode ? (
            <>
              <Modal isVisible={isModalVisible}>
                <View
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'darkred',
                      fontWeight: '700',
                    }}>
                    Payment Summary
                  </Text>

                  {allorder && allorder.TotalAmt ? (
                    <>
                      <View style={{flexDirection: 'row', marginTop: 20}}>
                        <View style={{flex: 0.7}}>
                          <Text style={styles.text}>Total Amount</Text>
                        </View>
                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 14,
                              textDecorationLine: 'line-through',
                            }}>
                            ₹ {allorder.TotalAmt}
                          </Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    ''
                  )}

                  {allorder && allorder.discAmt ? (
                    <>
                      <View style={{flexDirection: 'row', marginTop: 7}}>
                        <View style={{flex: 0.7}}>
                          <Text style={styles.text}>Discount</Text>
                        </View>
                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                          <Text style={{color: 'black', fontSize: 14}}>
                            ₹ {allorder.discAmt}
                          </Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    ''
                  )}

                  {allorder && allorder.totalSaved ? (
                    <>
                      <View style={{flexDirection: 'row', marginTop: 7}}>
                        <View style={{flex: 0.7}}>
                          <Text style={styles.text1}>Saved</Text>
                        </View>
                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                          <Text style={styles.text1}>
                            ₹ {allorder.totalSaved}
                          </Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    ''
                  )}

                  {allorder && allorder.couponCode ? (
                    <>
                      <View style={{flexDirection: 'row', marginTop: 7}}>
                        <View style={{flex: 0.7}}>
                          <Text style={{color: 'rgb(1, 107, 248)'}}>
                            Coupons
                          </Text>
                        </View>
                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                          <Text
                            style={{
                              color: 'rgb(1, 107, 248)',
                              fontSize: 12,
                            }}>
                            ₹ {allorder.couponCode}
                          </Text>
                        </View>
                      </View>
                    </>
                  ) : (
                    ''
                  )}

                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View style={{flex: 0.7}}>
                      <Text style={{color: 'black'}}>Payment Mode</Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Text style={{color: 'black', fontSize: 12}}>
                        {allorder?.paymentMode ? allorder?.paymentMode : 'cash'}
                      </Text>
                    </View>
                  </View>
                  <Text style={{borderBottomWidth: 1}}></Text>
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View style={{flex: 0.7}}>
                      <Text style={{color: 'black', fontWeight: 'bold'}}>
                        GrandTotal
                      </Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}>
                        ₹ {allorder?.GrandTotal}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={toggleModal}
                    style={{
                      backgroundColor: 'darkred',
                      padding: 10,
                      marginTop: 20,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </>
          ) : (
            <Modal isVisible={isModalVisible}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 5,
                }}>
                {payments && payments.length > 0 && (
                  <View style={{marginTop: 10}}>
                    <Text style={styles.text2}>Payment Details</Text>
                    {payments.map((payment, index) => (
                      <View
                        key={index}
                        style={{flexDirection: 'row', marginTop: 7}}>
                        <View style={{flex: 0.7}}>
                          <Text style={styles.text}>Transaction ID</Text>
                        </View>
                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                          <Text style={{color: 'black', fontSize: 14}}>
                            {payment.data && payment.data.transactionId}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                )}

                <Text
                  style={{
                    fontSize: 15,
                    color: 'darkred',
                    fontWeight: '700',
                  }}>
                  Payment Summary
                </Text>

                {allorder && allorder.TotalAmt ? (
                  <>
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                      <View style={{flex: 0.7}}>
                        <Text style={styles.text}>Total Amount11</Text>
                      </View>
                      <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 14,
                            textDecorationLine: 'line-through',
                          }}>
                          ₹ {allorder.TotalAmt}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  ''
                )}

                {allorder && allorder.discAmt ? (
                  <>
                    <View style={{flexDirection: 'row', marginTop: 7}}>
                      <View style={{flex: 0.7}}>
                        <Text style={styles.text}>Discount</Text>
                      </View>
                      <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                        <Text style={{color: 'black', fontSize: 14}}>
                          ₹ {allorder.discAmt}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  ''
                )}

                {allorder && allorder.totalSaved ? (
                  <>
                    <View style={{flexDirection: 'row', marginTop: 7}}>
                      <View style={{flex: 0.7}}>
                        <Text style={styles.text1}>Saved</Text>
                      </View>
                      <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                        <Text style={styles.text1}>
                          ₹ {allorder.totalSaved}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  ''
                )}

                {allorder && allorder.couponCode ? (
                  <>
                    <View style={{flexDirection: 'row', marginTop: 7}}>
                      <View style={{flex: 0.8}}>
                        <Text style={styles.text}>Coupons</Text>
                      </View>
                      <View style={{flex: 0.2, alignItems: 'center'}}>
                        <Text style={{color: 'black', fontSize: 12}}>
                          ₹ {allorder.couponCode}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  ''
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 7,
                    borderTopWidth: 1,
                    borderColor: 'grey',
                    paddingTop: 10,
                    marginTop: 10,
                  }}>
                  <View style={{flex: 0.7}}>
                    <Text style={styles.text2}>Payment Mode</Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Text style={{color: 'black', fontSize: 17}}>
                      {allorder.paymentMode ? allorder.paymentMode : 'cash'}
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 7}}>
                  <View style={{flex: 0.7}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      Booked date
                    </Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      {allorder?.date}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 7}}>
                  <View style={{flex: 0.7}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      Service status
                    </Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Text
                      style={{
                        color: 'green',
                        fontWeight: 'bold',
                        fontSize: 14,
                      }}>
                      Completed
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 7}}>
                  <View style={{flex: 0.7}}>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      GrandTotal
                    </Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    {allorder?.GrandTotal ? (
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}>
                        ₹ {allorder?.GrandTotal}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}>
                        ₹ {allorder?.serviceCharge}
                      </Text>
                    )}
                  </View>
                </View>
                <View></View>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    backgroundColor: 'darkred',
                    padding: 10,
                    marginTop: 20,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          )}
          {/* {allorder.paymentMode === 'online' ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={submit}
              style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: 'darkred',
                alignSelf: 'center',
                width: '90%',
                padding: 8,
                textAlign: 'center',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 18,
                  textAlign: 'center',
                }}>
                Pay now
              </Text>
            </TouchableOpacity>
          )} */}
        </View>
      )}
      <View>
        <Modal isVisible={isratingmodel}>
          <TouchableOpacity
            onPress={toggleModal2}
            style={{
              position: 'absolute',
              right: 0,
              backgroundColor: 'white',
              zIndex: 1,
              borderRadius: 50,
            }}>
            <AntDesign name="closecircle" color="" size={35} />
          </TouchableOpacity>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <View style={{backgroundColor: 'white'}}>
              <View style={{margin: 10}}>
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}>
                    {allorder?.service}
                  </Text>
                  <Text style={{color: 'black', fontSize: 13}}>
                    {allorder._id}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <StarRating
                    rating={rating}
                    onChange={setRating}
                    color="darkred"
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginTop: 20,
                    }}>
                    Review
                  </Text>
                  <TextInput
                    style={{
                      borderRadius: 10,
                      elevation: 10,
                      backgroundColor: 'white',
                      color: 'black',
                      marginTop: 10,
                      textAlignVertical: 'top',
                      height: 200,
                    }}
                    onChangeText={text => setreview(text)}
                    multiline={true}
                    numberOfLines={6}
                    underlineColorAndroid={
                      Platform.OS === 'android' ? 'white' : null
                    }
                  />
                </View>

                <TouchableOpacity
                  onPress={updateReview}
                  style={{
                    borderWidth: 1,
                    padding: 5,
                    borderRadius: 5,
                    width: '100%',
                    justifyContent: 'center',
                    marginTop: 30,
                    borderColor: 'darkred',
                    flexDirection: 'row',
                    alignSelf: 'flex-end',
                    backgroundColor: 'darkred',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Save Review
                  </Text>
                </TouchableOpacity>
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
  },
  text: {
    color: 'black',
    fontSize: 14,
  },
  text1: {
    color: 'green',
    fontSize: 14,
  },
  text2: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
});
export default Upcomingdetail;
