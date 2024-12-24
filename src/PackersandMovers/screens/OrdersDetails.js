import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import WebView from 'react-native-webview';
import axios from 'axios';
// import Zigzag from '../../../assets/kirushape.svg';
// import Arrow4 from '../../../assets/Arrow-04.svg';

export default function OrdersDetails({navigation, route}) {
  const orders = route.params.orders;
  const deviceWidth = Dimensions.get('window').width;

  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  console.log('orders?._id', orders?._id);

  const amt =
    orders?.paymentStatus === 'online' ? orders?.amount - 99 : orders?.amount;

  const handleSubmit1 = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://pm.vijayhomeservice.in/api/CCAvenue/CCAvenueAfterBookpayment',
        {serviceId: orders?._id, amount: amt},
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
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // padding: 15,
              paddingVertical: 8,
              paddingHorizontal: 10,
              backgroundColor: '#0000003d',
              // elevation: 4,
            }}>
            <View>
              <TouchableOpacity>
                <Ionicons
                  name="chevron-back-sharp"
                  size={20}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                  color: '#333',
                }}>
                {orders.bookingDate}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: 'Poppins-Regular',
                  color: 'green',
                }}>
                <FontAwesome5 name="truck-moving" size={10} color="green" />{' '}
                {orders.vehicleType}
              </Text>
            </View>
          </View>

          <ScrollView>
            <View style={{width: deviceWidth}}>
              <Image
                source={require('../../../assets/map-for-refereene.png')}
                style={{width: '100%', height: 150}}
              />
            </View>
            <View
              style={{
                backgroundColor: 'white',
                height: '100%',
                marginBottom: 30,
              }}>
              <View style={{paddingHorizontal: 15, paddingTop: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <View>
                    <Image
                      source={require('../../../assets/Images/delivery-truck.png')}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 10,
                        fontFamily: 'Poppins-SemiBold',
                        backgroundColor:
                          orders.jobStatus === 'Pending'
                            ? '#ffe0a86b'
                            : orders.jobStatus === 'Completed'
                            ? '#a6ffa663'
                            : orders.jobStatus === 'In Progress'
                            ? '#b0b0ff59'
                            : 'gray',
                        paddingHorizontal: 8,
                        paddingVertical: 3,
                        borderRadius: 5,
                        color:
                          orders.jobStatus === 'Pending'
                            ? 'orange'
                            : orders.jobStatus === 'Completed'
                            ? 'green'
                            : orders.jobStatus === 'In Progress'
                            ? 'blue'
                            : 'black',
                      }}>
                      {orders.jobStatus}
                    </Text>
                  </View>
                </View>
                {/* <View style={{marginVertical: 10, marginHorizontal: 50}}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins-Regular',
                  color: '#333',
                  marginBottom: 5,
                }}>
                You rated
              </Text>
              <View style={{flexDirection: 'row'}}>
                {Array.from({length: 5}).map((_, index) => (
                  <AntDesign
                    key={index}
                    name="star"
                    size={12}
                    color="gold"
                    style={{padding: 3}}
                  />
                ))}
              </View>
            </View> */}
                <View style={{marginVertical: 10, marginHorizontal: 50}}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Bold',
                      color: '#333',
                      marginBottom: 5,
                    }}>
                    Service Date : {''}
                    {orders?.serviceDate}
                  </Text>
                  <View style={{flexDirection: 'row'}}></View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#d3d3d3',
                    borderBottomWidth: 0.2,
                  }}></View>

                <View style={{marginVertical: 15}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <Ionicons
                      name="speedometer-outline"
                      size={30}
                      color="#ababab"
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#333',
                      }}>
                      <FontAwesome5 name="rupee-sign" size={11} color="#333" />
                      {orders?.amount}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#333',
                      }}>
                      {Math.round(orders.distance)} km
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#333',
                      }}>
                      {orders.slot}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#d3d3d3',
                    borderBottomWidth: 0.2,
                  }}></View>
                <View style={{marginVertical: 20}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 0.1}}>
                      <FontAwesome6
                        name="location-dot"
                        size={15}
                        color="#009688"
                      />
                    </View>
                    <View style={{flex: 0.9}}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#565656',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {orders.pickupLocation}
                      </Text>
                    </View>
                  </View>
                  <View style={{marginLeft: 3}}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: 'black',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      |
                    </Text>
                    {/* <Entypo name="flow-line" size={20} color="#3f51b5" /> */}
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 0.1}}>
                      <FontAwesome6
                        name="location-dot"
                        size={15}
                        color="#e91e63"
                      />
                    </View>
                    <View style={{flex: 0.9}}>
                      <Text
                        style={{
                          fontSize: 10,
                          color: '#565656',
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {orders.dropLocation}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Poppins-Bold',
                        color: '#333',
                      }}>
                      Items
                    </Text>
                    <Text
                      style={{
                        fontSize: 13,
                        fontFamily: 'Poppins-Bold',
                        color: '#333',
                      }}>
                      Qty
                    </Text>
                  </View>
                  {orders?.Items?.map(item => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                            color: '#333',
                          }}>
                          {item.itemname}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Poppins-Regular',
                            color: '#333',
                          }}>
                          {item.qty}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
                <View
                  style={{
                    borderBottomColor: '#d3d3d3',
                    borderBottomWidth: 0.2,
                  }}></View>
                <View style={{marginVertical: 15}}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Poppins-SemiBold',
                      color: '#333',
                    }}>
                    Bill Details
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: 'Poppins-Regular',
                        color: '#333',
                      }}>
                      Packers and Movers Service
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontFamily: 'Poppins-Medium',
                        color: '#333',
                      }}>
                      <FontAwesome5 name="rupee-sign" size={10} color="#333" />{' '}
                      {orders.baseAmount}
                    </Text>
                  </View>
                  {orders?.PMAddonsItems?.map(item => (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: 'Poppins-Regular',
                          color: '#333',
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: 'Poppins-Medium',
                          color: '#333',
                        }}>
                        <FontAwesome5
                          name="rupee-sign"
                          size={10}
                          color="#333"
                        />{' '}
                        {item.offerPrice * item.qty}
                      </Text>
                    </View>
                  ))}

                  <View
                    style={{
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 0.2,
                    }}></View>
                  {orders?.paymentStatus === 'online' ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginVertical: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: 'Poppins-Regular',
                          color: '#333',
                        }}>
                        Advance
                      </Text>
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: 'Poppins-Medium',
                          color: '#333',
                        }}>
                        <FontAwesome5
                          name="rupee-sign"
                          size={10}
                          color="#333"
                        />{' '}
                        99
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}

                  <View
                    style={{
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 0.2,
                    }}></View>

                  <View
                    style={{
                      borderBottomColor: '#d3d3d3',
                      borderBottomWidth: 0.2,
                    }}></View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#333',
                      }}>
                      Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-SemiBold',
                        color: '#333',
                      }}>
                      <FontAwesome5 name="rupee-sign" size={11} color="#333" />{' '}
                      {orders.amount}
                    </Text>
                  </View>
                </View>
              </View>
              {/* <Zigzag width={220} height={100} /> */}
              <Image
                source={require('../../../assets/kiru-shape-05.png')}
                style={{
                  width: deviceWidth,
                  height: 14,
                  position: 'Relative',
                  bottom: 10,
                }}
              />
              <View style={{paddingHorizontal: 15}}>
                {/* <Text
              style={{
                fontSize: 12,
                fontFamily: 'Poppins-SemiBold',
                color: '#333',
              }}>
              Payment
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: '#333',
                  }}>
                  Paid by UPI
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: '#333',
                  }}>
                  kiruthikamani@oksbi
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Medium',
                    color: '#333',
                  }}>
                  <FontAwesome5 name="rupee-sign" size={10} color="#333" />{' '}
                  1951.28
                </Text>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#d3d3d3',
                borderBottomWidth: 0.2,
              }}></View> */}
                {/* <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: '#333',
                  }}>
                  Get invoice copy
                </Text>
              </View>
              <View>
                <FontAwesome name="angle-right" size={15} color="#333" />
              </View>
            </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>

          {orders.fullPaymentStatus === 'online' ? (
            <Text
              style={{
                color: 'green',
                textAlign: 'center',
                padding: 10,
                fontSize: 14,
              }}>
              Payment Successful
            </Text>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit1}
              style={{
                position: 'absolute',
                bottom: 10,
                backgroundColor: 'darkred',
                alignSelf: 'center',
                width: '90%',
                padding: 5,
                textAlign: 'center',
                borderRadius: 5,
                // right: 0,
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
        </>
      )}
    </View>
  );
}
