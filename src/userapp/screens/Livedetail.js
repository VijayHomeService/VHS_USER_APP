import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const formatDate = dateString => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function Livedetail() {
  const route = useRoute();
  const {call} = route.params;
  console.log('call1234....', call);
  const [technisian, setTechnisian] = useState([]);

  useEffect(() => {
    getallserviceorder();
  }, []);

  const getallserviceorder = async () => {
    try {
      const res = await axios.get(
        'https://api.vijayhomeservicebengaluru.in/api/getalltechnician',
      );
      if (res.status === 200) {
        const technicianId = call.dsrdata[0]?.TechorPMorVendorID;

        // Find the technician with the matching ID
        const technician = res.data?.technician.find(
          tech => tech._id === technicianId,
        );

        if (technician) {
          setTechnisian([technician]);
        } else {
          console.warn('Technician not found for the given order');
        }
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching technician data: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            margin: 10,
            flexWrap: 'wrap',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
            {' '}
            {call.category}
          </Text>
        </View>

        {call && call.paymentMode === 'cash' ? (
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
                <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                  Thanks for Choosing Vijay Home Servicess
                </Text>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 5}}>
                  <Text style={{color: 'green'}}> ● paid</Text>
                  <Text style={{color: 'black', marginLeft: 5}}>
                    ₹ {call.serviceInfo[0].serviceCharge}
                  </Text>
                </TouchableOpacity>
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
              <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
                Thanks for Choosing Vijay Home Servicess
              </Text>

              <TouchableOpacity style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{color: 'black'}}> ● Service Charge</Text>
                <Text style={{color: 'black', marginLeft: 5}}>
                  ₹ {call?.serviceInfo[0]?.serviceCharge}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', marginTop: 5}}>
                <Text style={{color: 'black'}}> ● Service Date</Text>
                <Text style={{color: 'black', marginLeft: 5}}>
                  {call?.serviceDate}
                </Text>
              </TouchableOpacity>
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

        {technisian.map(data => (
          <View>
            <View
              style={{
                // flexDirection: "row",
                backgroundColor: 'white',
                elevation: 3,
                padding: 15,
                borderRadius: 5,
                margin: 10,
              }}>
              <Text style={{color: 'black', fontWeight: '700', fontSize: 15}}>
                Technician
              </Text>

              <Text style={{color: 'grey', fontSize: 14, marginTop: 5}}>
                ● {data.vhsname}
              </Text>
              <Text style={{color: 'grey', fontSize: 14, marginTop: 5}}>
                ● {data.number}
              </Text>
              <Text style={{color: 'grey', fontSize: 14, marginTop: 5}}>
                ● {data.languagesknow}
              </Text>
              <Text style={{color: 'grey', fontSize: 14, marginTop: 5}}>
                ● {data.experiance}
              </Text>
            </View>
          </View>
        ))}

        <View
          style={{
            backgroundColor: 'white',
            elevation: 3,
            borderRadius: 5,
            padding: 15,
            margin: 10,
          }}>
          <Text style={{fontSize: 15, color: 'darkred', fontWeight: '700'}}>
            Addons
          </Text>
          <View style={{flexDirection: 'row', marginTop: 7}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.text}>Plan Name</Text>
            </View>
            <View style={{flex: 0.3, alignItems: 'flex-end'}}>
              <Text style={{color: 'black', fontSize: 14}}>
                {call.serviceInfo[0]?.AddOns[0]?.planName}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 7}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.text}>Plan Price</Text>
            </View>
            <View style={{flex: 0.3, alignItems: 'flex-end'}}>
              <Text style={{color: 'black', fontSize: 14}}>
                {call.serviceInfo[0]?.AddOns[0]?.planPrice}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 7}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.text}>Offer Price</Text>
            </View>
            <View style={{flex: 0.3, alignItems: 'flex-end'}}>
              <Text style={{color: 'black', fontSize: 14}}>
                {call.serviceInfo[0]?.AddOns[0]?.oferprice}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 7}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.text}>Quantity</Text>
            </View>
            <View style={{flex: 0.3, alignItems: 'flex-end'}}>
              <Text style={{color: 'black', fontSize: 14}}>
                {call.serviceInfo[0]?.AddOns[0]?.qty}
              </Text>
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
          <Text style={{fontSize: 15, color: 'black', fontWeight: '700'}}>
            Booking Details
          </Text>

          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{flex: 0.1}}>
              <MaterialCommunityIcons name="cash" color="black" size={28} />
            </View>
            <View style={{flex: 0.8, justifyContent: 'center', marginLeft: 10}}>
              <Text style={{color: 'black'}}>
                Service Amount : ₹ {call.serviceInfo[0]?.serviceCharge}
              </Text>
            </View>
            <View
              style={{
                flex: 0.1,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              {/* <AntDesign name="right" color="grey" size={15} /> */}
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 0.1}}>
              <Entypo name="location-pin" color="black" size={28} />
            </View>
            <View
              style={{
                flex: 0.8,
                // justifyContent: "center",
                // marginLeft: 10,
                flexDirection: 'row',
                padding: 10,
                marginTop: -5,
              }}>
              <Text style={{color: 'black', fontSize: 13}}>
                {call.serviceInfo[0].deliveryAddress.platNo}
              </Text>
              <Text style={{color: 'black', fontSize: 13}}>
                ,{call.serviceInfo[0].deliveryAddress.landmark}
              </Text>
              <Text style={{color: 'black', fontSize: 13}}>
                ,{call.serviceInfo[0].deliveryAddress.address}
              </Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', marginTop: 20}}>
            <View style={{flex: 0.1}}>
              <AntDesign name="clockcircleo" color="black" size={20} />
            </View>
            <View style={{flex: 0.9, justifyContent: 'center', marginLeft: 10}}>
              <Text style={{color: 'grey', fontSize: 13}}>
                Booking Date :{call.bookingDate}
              </Text>
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
            Payment Summary
          </Text>

          {call && call.servicedetails[0].TotalAmt ? (
            <>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <View style={{flex: 0.7}}>
                  <Text style={styles.text}>Total Amount</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    ₹ {call.servicedetails[0].TotalAmt}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            ''
          )}

          {call && call.servicedetails[0].discAmt ? (
            <>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <View style={{flex: 0.7}}>
                  <Text style={styles.text}>Discount</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                  <Text style={{color: 'black', fontSize: 14}}>
                    ₹ {call.servicedetails[0].discAmt}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            ''
          )}

          {call && call.servicedetails[0].totalSaved ? (
            <>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <View style={{flex: 0.7}}>
                  <Text style={styles.text1}>Saved</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                  <Text style={styles.text1}>
                    ₹ {call.servicedetails[0].totalSaved}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            ''
          )}

          {call && call.servicedetails[0].couponCode ? (
            <>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <View style={{flex: 0.8}}>
                  <Text style={styles.text}>Coupons</Text>
                </View>
                <View style={{flex: 0.2, alignItems: 'center'}}>
                  <Text style={{color: 'black', fontSize: 12}}>
                    ₹ {call.servicedetails[0].couponCode}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            ''
          )}

          <View style={{flexDirection: 'row', marginTop: 7}}>
            <View style={{flex: 0.7}}>
              <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
                GrandTotal
              </Text>
            </View>
            <View style={{flex: 0.3, alignItems: 'flex-end'}}>
              <Text style={{color: 'black', fontSize: 14, fontWeight: '600'}}>
                ₹ {call.servicedetails[0].GrandTotal}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text1: {
    color: 'green',
    fontSize: 14,
  },
});
export default Livedetail;
