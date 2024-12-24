import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToPMAddonsCart,
  deletePMAddonsCartItems,
  removePMAddonsCartItems,
} from '../../userapp/screens/Redux/PMAddons';

export default function Step4({
  navigation,
  goToStep,
  sdata,
  singleLayer,
  multilayer,
  unpacking,
  dismantling,
  setSlot,
  slot,
  setSelectedDate,
  selectedDate,
  dateModel,
  couponCode,
  setcouponCode,
  GrandTotal,
  CouponApply,
  AddOnsdata,
}) {
  const refRBSheet = useRef();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const MyCartItems = useSelector(state => state.Items);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const PMAddonsItems = useSelector(state => state.PMAddons);
  const count = singleLayer ? 1 : 0;
  const count1 = multilayer ? 1 : 0;
  const count2 = unpacking ? 1 : 0;
  const count3 = dismantling ? 1 : 0;
  const allcount = count + count1 + count2 + count3;

  const parsedSlots = sdata?.Slot;
  const dispatch = useDispatch();

  const handleAddToCart = item => {
    console.log('item,', item);
    dispatch(
      addToPMAddonsCart({
        id: item?._id,
        name: item?.name,
        offerPrice: item?.offerPrice,
        price: item?.price,
        qty: 1,
      }),
    );
  };
  useEffect(() => {
    if (dateModel == true) {
      refRBSheet.current.open();
    }
  }, [dateModel]);

  const calculateQty = () => {
    return MyCartItems.reduce((total, item) => {
      return total + (item.qty || 0); // Sum up the qty of each item, default to 0 if qty is not defined
    }, 0);
  };

  const totalItems = calculateQty();

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
  const [selectedIndex, setSelectedIndex] = useState(null);

  const dates = [];

  for (let i = 0; i <= 15; i++) {
    const date = moment().add(i, 'days');
    const formattedDate = {
      day: date.format('DD'),
      month: date.format('MMM'),
      year: date.format('YYYY'),
      week: date.format('ddd'),
      isToday: date.isSame(moment(), 'day'),
      isTomorrow: date.isSame(moment().add(1, 'day'), 'day'),
      isWeekend: date.day() === 6 || date.day() === 0, // 6 = Saturday, 0 = Sunday
    };
    dates.push(formattedDate);
  }

  const PMAddonstotal = PMAddonsItems.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerPrice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);
  return (
    <View style={styles.container}>
      <ScrollView style={{margin: 5}} showsVerticalScrollIndicator={false}>
        <View>
          <Text style={[styles.headerText, {fontFamily: 'Poppins-Medium'}]}>
            Moving details
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.row, {marginTop: 20}]}
          onPress={() => {
            goToStep(0);
          }}>
          <View style={styles.iconContainer}>
            <AntDesign name="arrowup" size={12} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Pickup location</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {pickupLocation}
            </Text>
          </View>
          <Entypo name="chevron-small-right" size={20} />
        </TouchableOpacity>

        <View style={styles.dashedLineContainer}>
          <View style={styles.dashedLine}></View>
        </View>

        <TouchableOpacity
          style={styles.row}
          onPress={() => {
            goToStep(0);
          }}>
          <View style={styles.dropicon}>
            <AntDesign name="arrowdown" size={13} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Drop location</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {dropLocation}
            </Text>
          </View>
          <Entypo name="chevron-small-right" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // padding: 15,
            // margin: 10,
            // elevation: 2,
            borderWidth: 1,
            borderColor: '#dbe8f3',
            height: 50,
            backgroundColor: 'white',
            marginTop: 20,
            borderRadius: 10,
          }}
          onPress={() => {
            goToStep(1);
          }}>
          <Text
            style={{fontFamily: 'Poppins-Medium', color: 'black', padding: 10}}>
            {totalItems} items added{' '}
            {allcount ? '& ' + allcount + 'add ons' : ''}
          </Text>
          <Entypo
            name="chevron-small-right"
            size={20}
            style={{marginTop: 10}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: 'black',
            marginTop: 10,
            fontSize: 15,
          }}>
          AddOns
        </Text>

        <ScrollView horizontal={true}>
          {AddOnsdata.map(item => (
            <View
              key={item.id} // Make sure each item has a unique key
              style={{
                width: 180,
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10, // Add margin between items
                borderWidth: 1,
                borderColor: '#dbe8f3',
                borderRadius: 5,
                marginBottom: 10,
                backgroundColor: 'white',
              }}>
              <Image
                source={{uri: item.imgUrl}}
                style={{width: 150, height: 100, borderRadius: 5}}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                  fontSize: 13,
                }}>
                {item.name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                }}>
                {item.price ? (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      color: 'black',
                      fontSize: 13,
                      textDecorationLine: 'line-through',
                    }}>
                    <FontAwesome name="rupee" color={'grey'} /> {item.price}
                  </Text>
                ) : (
                  <></>
                )}

                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: 'black',
                    fontSize: 13,
                  }}>
                  <FontAwesome name="rupee" /> {item.offerPrice}
                </Text>
              </View>

              {/* <TouchableOpacity
                style={{
                  backgroundColor: '#d2efb1',
                  width: 80,
                  padding: 3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => handleAddToCart(item)}>
                <Text style={{color: 'black'}}>Add</Text>
              </TouchableOpacity> */}

              <View>
                {PMAddonsItems.find(i => i.id === item._id) ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 15,
                      backgroundColor: '#57d357',
                      padding: 5,
                      borderRadius: 3,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        const cartItem = PMAddonsItems.find(
                          i => i.id === item._id,
                        );
                        if (cartItem.qty > 1) {
                          dispatch(removePMAddonsCartItems(cartItem));
                        } else {
                          dispatch(deletePMAddonsCartItems(cartItem.id));
                        }
                      }}>
                      <AntDesign name="minus" size={18} color="white" />
                    </TouchableOpacity>
                    <Text style={[styles.qty, {color: 'white'}]}>
                      {PMAddonsItems.find(i => i.id === item._id)?.qty}
                    </Text>
                    <TouchableOpacity onPress={() => handleAddToCart(item)}>
                      <AntDesign name="plus" size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    style={{
                      borderWidth: 1,
                      backgroundColor: 'white',
                      paddingHorizontal: 15,
                      borderRadius: 3,
                      borderColor: 'green',
                      width: 80,
                      alignItems: 'center',
                      padding: 2,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Poppins-Medium',
                        color: 'green',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.coupon}>
          <MaterialCommunityIcons
            name="ticket-percent-outline"
            color={'green'}
            size={25}
          />
          <TextInput
            placeholder="Enter referral or coupon code"
            style={[styles.textInput, {color: 'black'}]}
            value={couponCode}
            onChangeText={setcouponCode}
            placeholderTextColor="gray"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              CouponApply('yes');
            }}>
            <Text style={styles.apply}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: 'black',
              marginTop: 20,
              fontSize: 14,
            }}>
            Payment summary
          </Text>
          <View style={[styles.ps, {marginTop: 20}]}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'grey',
                fontSize: 12,
              }}>
              Quoted amount
            </Text>
            <Text>
              <FontAwesome5 name="rupee-sign" />
              {''} {GrandTotal.toFixed(0)}
            </Text>
          </View>
          <View style={styles.ps}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: 'black',
                fontSize: 12,
              }}>
              Packers and Movers Service
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: 'black',
                gap: 10,
                flexDirection: 'row',
              }}>
              <FontAwesome5 name="rupee-sign" />
              {GrandTotal}
            </Text>
          </View>
          {PMAddonsItems.map(item => (
            <View style={styles.ps}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                  fontSize: 12,
                }}>
                {item.name}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                  gap: 10,
                  flexDirection: 'row',
                }}>
                <FontAwesome5 name="rupee-sign" />
                {item.qty * item.offerPrice}
              </Text>
            </View>
          ))}

          <Image
            source={require('../../../assets/kiru-shape-05.png')}
            style={{
              width: '100%',
              height: 14,
              position: 'Relative',
              bottom: 10,
            }}
          />
          <View style={styles.ps}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: 'black',
                fontSize: 12,
              }}>
              Total amount to be paid
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: 'black',
                gap: 10,
                flexDirection: 'row',
              }}>
              <FontAwesome5 name="rupee-sign" />
              {GrandTotal + PMAddonstotal}
            </Text>
          </View>
          {/* <View style={styles.ps}>
            <View style={{flex: 0.8}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: 'black',
                  fontSize: 12,
                }}>
                Booking amount
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: 'grey',

                  fontSize: 10,
                }}>
                An adjustable amount of Rs.99 needs to be paid for order
                confirmation
              </Text>
            </View>

            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'black',
                flex: 0.3,
                textAlign: 'right',
              }}>
              <FontAwesome5 name="rupee-sign" color={'black'} />
              {''} 99
            </Text>
          </View> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('TermsAndConditions')}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                color: 'black',
                fontSize: 12,
                marginTop: 20,
              }}>
              By proceeding you accept the{' '}
              <Text style={{color: '#FF8343', textDecorationLine: 'underline'}}>
                Terms & Conditions
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.date}
        onPress={() => refRBSheet.current.open()}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name="calendar-arrow-right"
            size={20}
            color={'black'}
          />
          <Text style={{color: 'black', fontFamily: 'NanumGothic-Regular'}}>
            {''} {''} Shifting on {selectedDate} / {slot}
          </Text>
        </View>

        <AntDesign name="edit" color={'#23527c'} size={18} />
      </TouchableOpacity>

      <View style={{flex: 1}}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,

              height: 'auto',
            },
          }}>
          <View style={{padding: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.headerText}>
                Confirm your shifting Date & Slot
              </Text>
              <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                <AntDesign name="closesquareo" color={'grey'} size={20} />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.head}>Select Pickup Date</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>
                {dates.map((date, index) => {
                  const finalPrice = date.isWeekend
                    ? (GrandTotal + 1000).toFixed(0)
                    : GrandTotal.toFixed(0);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dateContainer,
                        {
                          borderColor:
                            selectedIndex === index ? 'orange' : '#80808014',
                          backgroundColor:
                            selectedIndex === index ? '#ffa50036' : 'white',
                        },
                      ]}
                      onPress={() => {
                        setSelectedIndex(index);
                        const formattedSelectedDate = moment(
                          `${date.day} ${date.month} ${date.year}`,
                          'DD MMM YYYY',
                        ).format('DD/MM/YYYY');
                        setSelectedDate(formattedSelectedDate);
                      }}>
                      <Text style={styles.week}>
                        {date.isToday
                          ? 'Today'
                          : date.isTomorrow
                          ? 'Tomorrow'
                          : date.week}
                      </Text>
                      <Text
                        style={[
                          styles.day,
                          {fontSize: selectedIndex === index ? 12 : 10},
                        ]}>
                        {date.day} {date.month}
                      </Text>
                      <Text
                        style={[
                          styles.price,
                          {
                            color: date.isWeekend ? 'red' : 'green',
                            fontSize: selectedIndex === index ? 12 : 10,
                          },
                        ]}>
                        <FontAwesome
                          name="rupee"
                          size={selectedIndex === index ? 13 : 11}
                        />{' '}
                        {finalPrice}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
              <Text style={[styles.head, {marginBottom: 10}]}>
                Select Pickup Slot
              </Text>
              <View style={styles.rowContainer}>
                {parsedSlots?.map((slot, index) => (
                  <View key={index} style={styles.slotWrapper}>
                    <TouchableOpacity
                      style={[
                        styles.slot,
                        {
                          borderColor:
                            selectedSlot === slot._id ? 'orange' : '#80808014',
                          backgroundColor:
                            selectedSlot === slot._id ? '#ffa50036' : 'white',
                        },
                      ]}
                      onPress={() => {
                        setSelectedSlot(slot._id);
                        setSlot(`${slot.startTime} `);
                      }}>
                      <Text
                        style={[
                          styles.slotText,
                          {
                            fontSize: selectedSlot === slot._id ? 13 : 12,
                          },
                        ]}>
                        {`${slot.startTime} `}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.buttonConfirm}
                onPress={() => refRBSheet.current.close()}>
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
  },
  ps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderBottomWidth: 1,
    // borderBottomColor: 'white',
    paddingBottom: 15,
    flex: 1,
    width: '100%',
  },
  headerText: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

    width: '100%',
  },
  iconContainer: {
    backgroundColor: 'green',
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 4,
  },
  dropicon: {
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 4,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  subtitle: {
    color: 'grey',
    fontSize: 12,
  },
  dashedLineContainer: {
    alignItems: 'flex-start',
  },
  dashedLine: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'gray',
    height: 30,
    marginLeft: 14,
  },
  headerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 17,
    color: 'black',
  },
  row1: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to the next line
    justifyContent: 'flex-start', // Adjust alignment of items
    marginBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allows items to wrap to the next line
    justifyContent: 'space-between', // Evenly distributes items in a row
  },
  slotWrapper: {
    width: '30%', // Adjust based on the number of items per row (e.g., 3 items in a row)
    marginBottom: 10,
  },
  slot: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    color: 'black',
  },
  slotText: {
    textAlign: 'center',
    color: 'black',
  },

  coupon: {
    // borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgrey',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F1EEDC',
  },
  textInput: {
    flex: 1,
    // paddingBottom: 8,
    // paddingTop: 8,
    marginLeft: 10, // Space between icon and input
  },
  button: {
    marginLeft: 'auto', // Pushes button to the right
  },
  apply: {
    color: 'green',
    fontFamily: 'Poppins-Medium',
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
    gap: 10,
    // margin: 10,
  },
  dateContainer: {
    width: 80,
    borderWidth: 1,
    height: 100,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  day: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  week: {
    color: 'black',
    fontFamily: 'Poppins-Thin',
    fontSize: 12,
  },
  price: {
    fontFamily: 'Poppins-Medium',
  },
  head: {
    color: 'black',
    fontFamily: 'NanumGothic-Regular',
    marginTop: 20,
  },
  buttonConfirm: {
    backgroundColor: '#FF8343',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
    // marginBottom: 50,
    // marginHorizontal: 1, // To add space between buttons
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  icon: {
    marginRight: 10,
  },
  qty: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },

  row1: {
    alignItems: 'center',
    marginHorizontal: 5, // Adds spacing between slots
  },
});
