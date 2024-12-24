import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from './Loader';
import moment from 'moment';
import BottomSheet from 'react-native-gesture-bottom-sheet';
function Upcomingdetail({navigation}) {
  const [serviceDate, setserviceDate] = useState('');

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
  const [Transaction, setTransaction] = useState('');

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
  }, [value]);

  const getallserviceorder = async () => {
    try {
      const res = await axios.get(
        'https://api.vijayhomeservicebengaluru.in/api/getalltechnician',
      );
      if (res.status === 200) {
        const techdata = res.data?.technician;
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

  // const submit = async e => {
  //   e.preventDefault();
  //   const requestData = {
  //     amount: parseFloat(allorder?.GrandTotal) * 100,
  //     serviceId: allorder?._id,
  //   };

  //   try {
  //     const config = {
  //       url: '/payment/addpayment',
  //       method: 'post',
  //       baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
  //       headers: {'content-type': 'application/json'},
  //       data: requestData,
  //     };
  //     const res = await axios(config);

  //     if (res.status === 200) {
  //       const base64ResponseData = res.data.base64;
  //       const sha256ResponseData = res.data.sha256encode;
  //       const merchantId = res.data.merchantId;
  //       const merchantTransactionId = res.data.merchantTransactionId;
  //       const redirectUrl = res.data.redirectUrl;
  //       setTransaction(res.data.merchantTransactionId);

  //       initiatePayment(
  //         base64ResponseData,
  //         sha256ResponseData,
  //         merchantId,
  //         merchantTransactionId,
  //         redirectUrl,
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     if (error.response) {
  //       alert(error.response.data.error);
  //       console.log(error.response.data.error);
  //     }
  //   }
  // };

  // const initiatePayment = async (
  //   base64Data,
  //   sha256Data,
  //   merchantId,
  //   merchantTransactionId,
  //   redirectUrl,
  // ) => {
  //   try {
  //     const data = JSON.stringify({
  //       request: base64Data,
  //     });

  //     const config = {
  //       method: 'post',
  //       url: 'https://api.phonepe.com/apis/hermes/pg/v1/pay',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'X-VERIFY': sha256Data,
  //         //   Authorization: "Bearer YOUR_API_KEY_HERE", // Add your API key here
  //       },
  //       data: data,
  //     };

  //     const response = await axios.request(config);

  //     const {redirectInfo} = response.data.data.instrumentResponse;
  //     setPaymentUrl(redirectInfo.url);
  //     setShowWebView(true);
  //     setIsCheckingStatus(true);
  //   } catch (error) {
  //     console.error('Error initiating payment:', error);
  //     setIsCheckingStatus(false);
  //     // Handle the error accordingly
  //   }
  // };
  // useEffect(() => {
  //   if (isCheckingStatus) {
  //     const intervalId = setInterval(() => {
  //       checkTransactionStatus();
  //     }, 3000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [isCheckingStatus]);

  // const checkTransactionStatus = async () => {
  //   const merchantId = 'M1PX7BZG1R4G';
  //   try {
  //     const config = {
  //       url: `/payment/status/${merchantId}/${Transaction}/${value?._id}/${allorder._id}`,
  //       method: 'post',
  //       baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
  //       headers: {'content-type': 'application/json'},
  //       data: {},
  //     };
  //     const res = await axios(config);

  //     if (res.status === 200) {
  //       const responseData = res.data.responseData;
  //       const code = responseData.code;

  //       if (code === 'PAYMENT_SUCCESS') {
  //         update();
  //         setIsCheckingStatus(false);
  //         update();
  //         addPayment();
  //         setShowWebView(false);
  //       } else {
  //         // Redirect to home store
  //         // navigation.navigate('tab');
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error checking transaction status:', error);
  //     // Handle the error accordingly
  //   }
  // };

  // const update = async () => {
  //   try {
  //     const config = {
  //       url: `/updatepaymentmode/${allorder?._id}`,
  //       method: 'post',
  //       baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
  //       // data: formdata,
  //       headers: {'content-type': 'application/json'},
  //       data: {
  //         paymentMode: 'online',
  //       },
  //     };
  //     await axios(config).then(function (response) {
  //       if (response.status === 200) {
  //         navigation.navigate('success', {data: allorder});
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     alert(' Not Added');
  //   }
  // };

  // const addPayment = async a => {
  //   try {
  //     const config = {
  //       url: '/addPayment',
  //       method: 'post',
  //       baseURL: 'https://api.vijayhomeservicebengaluru.in/api',
  //       headers: {'content-type': 'application/json'},
  //       data: {
  //         paymentDate: moment().format('YYYY-MM-DD'),
  //         paymentType: 'Customer',
  //         paymentMode: 'online',
  //         amount: allorder?.GrandTotal,
  //         Comment: 'user appp',
  //         serviceDate: serviceDate,
  //         serviceId: allorder?._id,
  //         customerId: value?._id,
  //       },
  //     };
  //     await axios(config).then(function (response) {
  //       if (response.status === 200) {
  //         // alert("Payment Added");
  //         // // window.location.reload("");
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     alert(error.response.data.error);
  //   }
  // };

  const bottomSheet = useRef();
  const handleBookNowClick = () => {
    // if (isAddressSelected) {
    bottomSheet.current.show();
    // } else {
    // alert('Please select an address before booking.');
    // }
  };

  const handleSubmit1 = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api.vijayhomeservicebengaluru.in/api/CCAvenue/CCAvenueUserApppaymentAfterBook',
        {
          serviceId: allorder?._id,
          userId: value?._id,
          amount: allorder?.GrandTotal,
          transactionId: allorder.transactionId,
        },
      );

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
  };
  return (
    <View style={{flex: 1}}>
      {showWebView ? (
        <WebView source={{uri: paymentUrl}} style={{flex: 1}} />
      ) : (
        <View style={styles.container}>
          <ScrollView
            style={{marginBottom: 50}}
            contentInsetAdjustmentBehavior="automatic">
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

            {allorder && allorder?.paymentMode === 'online' ? (
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
                      <Text style={{color: 'green', fontSize: 17}}>
                        {' '}
                        ● Paid
                      </Text>
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
                  <Image
                    source={require('../../../assets/vhs.png')}
                    style={{width: 40, height: 40}}
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
                        ₹{' '}
                        {parseInt(allorder?.TotalAmt) +
                          parseInt(allorder?.totalSaved)}
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
              {allorder ? (
                <>
                  <View style={{flexDirection: 'row', marginTop: 7}}>
                    <View style={{flex: 0.7}}>
                      <Text style={styles.text}>GST</Text>
                    </View>
                    <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                      <Text style={{color: 'black', fontSize: 14}}>
                        ₹ {allorder?.GrandTotal - allorder?.TotalAmt}
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

              {allorder?.GrandTotal ? (
                <View style={{flexDirection: 'row', marginTop: 7}}>
                  <View style={{flex: 0.7}}>
                    <Text style={styles.text2}>GrandTotal</Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Text style={styles.text2}>₹ {allorder?.GrandTotal}</Text>
                  </View>
                </View>
              ) : (
                <View style={{flexDirection: 'row', marginTop: 7}}>
                  <View style={{flex: 0.7}}>
                    <Text style={styles.text2}>GrandTotal</Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Text style={styles.text2}>
                      ₹ {allorder?.serviceCharge}
                    </Text>
                  </View>
                </View>
              )}
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

            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                elevation: 3,
                borderRadius: 5,
                padding: 15,
                margin: 10,
              }}
              onPress={handleBookNowClick}>
              <Text style={{fontSize: 15, color: 'darkred', fontWeight: '700'}}>
                Cancellation Policy
              </Text>
            </TouchableOpacity>

            <View>
              <BottomSheet
                hasDraggableIcon
                ref={bottomSheet}
                height={560}
                style={{backgroundColor: 'white'}}>
                <View style={styles.content}>
                  <Text style={styles.title}>
                    Vijay Home Services Cancellation Policy
                  </Text>
                  <Text style={styles.subtitle}>
                    At Vijay Home Services, we understand that plans can change.
                    Our cancellation policy is designed to be fair and
                    transparent for all our customers.
                  </Text>
                  <Text style={styles.sectionTitle}>
                    No Cancellation Charges !!
                  </Text>
                  <Text style={styles.sectionText}>
                    Before 4 Hours: If you cancel your service more than 4 hours
                    before the scheduled slot, there will be no cancellation
                    charges.
                  </Text>
                  <Text style={styles.sectionTitle}>
                    Cancellation Charges !!
                  </Text>
                  <Text style={styles.sectionText}>
                    Within 4 Hours to 1 Hour Before Scheduled Slot:
                    {'\n'}- Full House Cleaning: ₹500
                    {'\n'}- Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹100
                    {'\n'}- Home Repair Services: ₹200
                    {'\n'}- Appliances Services: ₹200
                  </Text>
                  <Text style={styles.sectionText}>
                    Within 1 Hour and After Scheduled Slot:
                    {'\n'}- Full House Cleaning: ₹700
                    {'\n'}- Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹150
                  </Text>
                  <Text style={styles.sectionText}>
                    We appreciate your understanding and cooperation. Please
                    contact us as soon as possible if you need to cancel or
                    reschedule your service to avoid any charges.
                  </Text>
                </View>
              </BottomSheet>
            </View>
          </ScrollView>

          {/* Modal */}

          {allorder && allorder.paymentMode === 'cash' ? (
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
                            ₹
                            {parseInt(allorder?.TotalAmt) +
                              parseInt(allorder?.totalSaved)}
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
                  {allorder ? (
                    <>
                      <View style={{flexDirection: 'row', marginTop: 7}}>
                        <View style={{flex: 0.7}}>
                          <Text style={styles.text}>GST</Text>
                        </View>
                        <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                          <Text style={{color: 'black', fontSize: 14}}>
                            ₹ {allorder?.GrandTotal - allorder?.TotalAmt}
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
                        {allorder?.paymentMode}
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
                          ₹{' '}
                          {parseInt(allorder?.TotalAmt) +
                            parseInt(allorder?.totalSaved)}
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
                {allorder ? (
                  <>
                    <View style={{flexDirection: 'row', marginTop: 7}}>
                      <View style={{flex: 0.7}}>
                        <Text style={styles.text}>GST</Text>
                      </View>
                      <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                        <Text style={{color: 'black', fontSize: 14}}>
                          ₹ {allorder?.GrandTotal - allorder?.TotalAmt}
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

                {/* <View style={{flexDirection: 'row', marginTop: 7}}>
                  <View style={{flex: 0.7}}>
                    <Text style={styles.text2}>GrandTotal</Text>
                  </View>
                  <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Text
                      style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
                      ₹ {allorder.GrandTotal}
                    </Text>
                  </View>
                </View> */}

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
                    <Text style={{color: 'green', fontSize: 17}}>
                      {allorder.paymentMode}
                    </Text>
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
          {allorder.paymentMode === 'online' ? (
            <></>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit1}
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
          )}
        </View>
      )}
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
  content: {
    flexGrow: 1,
    margin: 15,
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
});
export default Upcomingdetail;
