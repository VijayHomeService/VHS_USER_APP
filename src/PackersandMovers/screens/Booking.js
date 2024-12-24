import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {ApiUrl} from '../../ApiServices/ApiUrl';
import WebView from 'react-native-webview';
import {deletePMAddonsCartItems} from '../../userapp/screens/Redux/PMAddons';
import {deletePMCartItems} from '../../userapp/screens/Redux/Items';

const Booking = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const MyCartItems = useSelector(state => state.Items);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const route = useRoute();
  const [user, setuser] = useState('');
  const {data} = route.params;
  const [savecity, setsavecity] = useState('');
  const [pickupFloor, setpickupFloor] = useState();
  const [dropFloor, setdropFloor] = useState();
  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [loader, setloader] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Within city');

  const ttFloor = Math.abs((Number(pickupFloor) - Number(dropFloor)) * 100);

  console.log('ttFloor', ttFloor);

  useEffect(() => {
    AsyncStorage.getItem('pickup').then(value => {
      const parsedValue = JSON.parse(value);
      setPickupLocation(parsedValue);
    });
    AsyncStorage.getItem('drop').then(value => {
      const parsedValue = JSON.parse(value);
      setDropLocation(parsedValue);
    });

    AsyncStorage.getItem('user').then(value => {
      const parsedValue = JSON.parse(value);
      setuser(parsedValue);
    });
    AsyncStorage.getItem('savecity').then(value => {
      setsavecity(value);
    });
  }, []);

  const [pickuplat, setpickuplat] = useState();
  const [pickuplong, setpickuplong] = useState();
  const [droplat, setdroplat] = useState();
  const [droplong, setdroplong] = useState();
  const [couponCode, setcouponCode] = useState('');
  const [voucherdata, setvoucherdata] = useState([]);
  const [CouponApplybtn, setCouponApplyBtn] = useState('');

  // Find the object where voucherCode matches the couponCode
  const foundVoucher = voucherdata.find(
    voucher => voucher.voucherCode === couponCode,
  );

  // Get the discountPercentage or handle if not found
  const discountPercentage = foundVoucher ? foundVoucher.discountPercentage : 0; // Default to 0 if not found

  useEffect(() => {
    getvoucher();
  }, []);

  const getvoucher = async () => {
    let res = await axios.get(
      'https://pm.vijayhomeservice.in/api/voucher/getvoucher',
    );
    if ((res.status = 200)) {
      setvoucherdata(res.data?.voucher);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('pickuplat').then(value => {
      const parsedValue = JSON.parse(value);
      setpickuplat(parsedValue);
    });
    AsyncStorage.getItem('pickuplong').then(value => {
      const parsedValue = JSON.parse(value);
      setpickuplong(parsedValue);
    });
    AsyncStorage.getItem('droplat').then(value => {
      const parsedValue = JSON.parse(value);
      setdroplat(parsedValue);
    });
    AsyncStorage.getItem('droplong').then(value => {
      const parsedValue = JSON.parse(value);
      setdroplong(parsedValue);
    });
  }, []);

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

  console.log('activeCategory', activeCategory);
  const distanceInKm =
    activeCategory === 'Society'
      ? 10
      : haversineDistance(pickuplat, pickuplong, droplat, droplong);

  //Calculate Total quantities in the cart

  console.log('distanceInKm', distanceInKm, activeCategory === 'Society');
  const calculateQty = () => {
    return MyCartItems.reduce((total, item) => {
      return total + (item.qty || 0);
    }, 0);
  };

  ///top bar steps code

  const totalItems = calculateQty();

  const labels = ['Moving details', 'Add Items', 'Add ons', 'Review'];
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 1,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: '#FF8343',
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: 'green',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#0e101a',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: 'white',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#FF8343',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: 'black',
    stepIndicatorLabelUnFinishedColor: 'red',
    labelColor: '#999999',
    labelSize: 11,
    labelFontFamily: 'Arial',
    currentStepLabelColor: '#FF8343',
  };

  const renderStepIndicator = (stepStatus, stepPosition) => {
    if (stepStatus === 'finished') {
      return <Icon name="check" size={15} color="green" />;
    }

    let iconName = '';

    switch (stepPosition) {
      case 0:
        iconName = 'truck';
        break;
      case 1:
        iconName = 'list';
        break;
      case 2:
        iconName = 'gift';
        break;
      case 3:
        iconName = 'wpforms';
        break;
      default:
        iconName = 'circle';
        break;
    }

    return (
      <Icon
        name={iconName}
        size={15}
        color={stepStatus === 'current' ? '#ffffff' : 'grey'}
      />
    );
  };

  const goToStep = step => {
    setCurrentPosition(step);
  };

  const CouponApply = step => {
    setCouponApplyBtn(step);
  };

  /////step1 code
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // MM
    const day = today.getDate().toString().padStart(2, '0'); // DD
    return `${month}-${day}-${year}`; // MM-DD-YYYY
  };
  const [singleLayer, setsingleLayer] = useState(false);
  const [multilayer, setmultilayer] = useState(false);
  const [unpacking, setunpacking] = useState(false);
  const [dismantling, setdismantling] = useState(false);
  const [slot, setSlot] = useState('');
  const PMAddonsItems = useSelector(state => state.PMAddons);

  const [selected, setSelected] = useState();

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

  console.log('pickupFloor', pickupFloor);

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setSelectedDate(selected);
  }, [selected]);

  // Function to switch states
  const singleLayerSwitch = () => {
    setsingleLayer(previousState => !previousState);
    setmultilayer(false);
  };

  const multilayerSwitch = () => {
    setmultilayer(previousState => !previousState);
    setsingleLayer(false);
  };

  const unpackingSwitch = () => setunpacking(previousState => !previousState);
  const dismantlingSwitch = () =>
    setdismantling(previousState => !previousState);

  const [dateModel, setdateModel] = useState(false);

  const checkNext = () => {
    if (activeCategory !== 'Society') {
      if (!dropLocation) {
        alert('Please select the drop location');
        return;
      }
    }

    if (!pickupLocation) {
      alert('Please select the pickup location');
      return;
    }

    if (!pickupLocation) {
      alert('Please select the pickup location');
      return;
    }

    setCurrentPosition(currentPosition + 1);
  };

  const calculatePackingPrice = () => {
    return MyCartItems.reduce((total, item) => {
      // Ensure the item has both qty and offerPrice before calculation
      const itemTotal =
        item.qty && item.packingPrice ? item.qty * item.packingPrice : 0;
      return total + itemTotal;
    }, 0);
  };
  const packingAmt = calculatePackingPrice();

  const [VehicleData, setVehicleData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [fare, setFare] = useState(0);

  useEffect(() => {
    getVehicles();
  }, []);

  const getVehicles = async () => {
    let res = await axios.get(ApiUrl.BASEURL + '/getvehical');
    if ((res.status = 200)) {
      setVehicleData(res.data);
    }
  };

  // Function to calculate total volume and weight
  const calculateTotals = () => {
    const totalVolume = MyCartItems.reduce(
      (sum, item) => sum + item.volume * item.qty,
      0,
    );
    const totalWeight = MyCartItems.reduce(
      (sum, item) => sum + item.weight * item.qty,
      0,
    );

    return {totalVolume, totalWeight};
  };

  // Function to select the appropriate vehicle
  const selectVehicle = (totalVolume, totalWeight) => {
    return VehicleData.find(
      vehicle =>
        vehicle.volumeCapacity >= totalVolume &&
        vehicle.weightCapacity >= totalWeight,
    );
  };

  // Function to calculate the total fare
  const calculateFare = vehicle => {
    if (!vehicle) return 0;

    // Find the city object that matches savecity
    const cityObject = vehicle.cities.find(city => city.city === savecity);

    // Extract the base price if the city is found
    const basePrice = cityObject ? cityObject.price : vehicle.basePrice;

    // const basePrice = vehicle.basePrice
    const additionalDistance = parseFloat(distanceInKm) - vehicle.baseDistance;
    const distanceFare =
      additionalDistance > 0 ? additionalDistance * vehicle.distanceRate : 0;
    const totalFare = Number(basePrice) + distanceFare;

    return totalFare;
  };

  // Effect to recalculate totals, select vehicle, and calculate fare when cart items change
  useEffect(() => {
    const {totalVolume, totalWeight} = calculateTotals();

    const vehicle = selectVehicle(totalVolume, totalWeight);
    setSelectedVehicle(vehicle);

    const totalFare = calculateFare(vehicle);
    setFare(totalFare);
  }, [MyCartItems, VehicleData, distanceInKm]);

  let GrandTotal =
    fare +
    (activeCategory === 'Society' ? ttFloor : 0) +
    (singleLayer ? packingAmt : 0) +
    (multilayer ? packingAmt * 2 : 0) +
    (unpacking ? packingAmt : 0) +
    (dismantling ? packingAmt : 0);

  // Apply discount if discountPercentage is defined and greater than 0
  if (discountPercentage > 0 && CouponApplybtn) {
    const discountAmount = (GrandTotal * discountPercentage) / 100;
    GrandTotal -= discountAmount; // Subtract discount amount from GrandTotal
  }

  console.log('GrandTotal1111', GrandTotal + PMAddonstotal);
  let baseAmount = fare;

  const [AddOnsdata, setAddOnsdata] = useState([]);

  useEffect(() => {
    GetAddonsData();
  }, []);

  const GetAddonsData = async () => {
    let res = await axios.get(
      'https://pm.vijayhomeservice.in/api/AddOns/getAddOns',
    );
    if (res.status === 200) {
      setAddOnsdata(res.data);
    }
  };

  const renderStepContent = () => {
    switch (currentPosition) {
      case 0:
        return (
          <Step1
            navigation={navigation}
            goToStep={goToStep}
            data={data}
            setpickupFloor={setpickupFloor}
            pickupFloor={pickupFloor}
            dropFloor={dropFloor}
            setdropFloor={setdropFloor}
            selected={selected}
            setSelected={setSelected}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        );
      case 1:
        return <Step2 navigation={navigation} goToStep={goToStep} />;
      case 2:
        return (
          <Step3
            navigation={navigation}
            goToStep={goToStep}
            singleLayer={singleLayer}
            multilayer={multilayer}
            unpacking={unpacking}
            dismantling={dismantling}
            singleLayerSwitch={singleLayerSwitch}
            multilayerSwitch={multilayerSwitch}
            unpackingSwitch={unpackingSwitch}
            dismantlingSwitch={dismantlingSwitch}
            distanceInKm={distanceInKm}
            fare={fare}
            selectedVehicle={selectedVehicle}
            GrandTotal={GrandTotal}
          />
        );
      case 3:
        return (
          <Step4
            navigation={navigation}
            goToStep={goToStep}
            sdata={data}
            singleLayer={singleLayer}
            multilayer={multilayer}
            unpacking={unpacking}
            dismantling={dismantling}
            distanceInKm={distanceInKm}
            setSlot={setSlot}
            slot={slot}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
            dateModel={dateModel}
            couponCode={couponCode}
            setcouponCode={setcouponCode}
            GrandTotal={GrandTotal}
            CouponApply={CouponApply}
            AddOnsdata={AddOnsdata}
          />
        );
      default:
        return <Text>Invalid Step</Text>;
    }
  };

  // const handleSubmit1 = async e => {
  //   e.preventDefault();
  //   if (!selectedDate) {
  //     setdateModel(true);
  //     return;
  //   }

  //   const paydata1 = {
  //     customer: user?.customerName,
  //     email: user?.email,
  //     phone: user?.mainContact,
  //     Items: MyCartItems,
  //     userId: user?._id,
  //     pickupLocation: pickupLocation,
  //     dropLocation: dropLocation,
  //     Services: data?.servicename,
  //     serviceId: data?._id,
  //     amount: GrandTotal.toFixed(2),
  //     baseAmount: baseAmount,
  //     bookingDate: moment().format('LLL'),
  //     serviceDate: selectedDate
  //       ? selectedDate
  //       : moment(selected).format('DD/MM/YYYY'),
  //     slot: slot,
  //     city: savecity,
  //     category: 'Packers & Movers',
  //     packingLayer: singleLayer ? 'single' : multilayer ? 'multi' : '',
  //     unpacking: unpacking ? true : false,
  //     dismantling: dismantling ? true : false,
  //     distance: distanceInKm,
  //     paymentStatus: '',
  //     pickupFloor: pickupFloor,
  //     dropFloor: dropFloor,
  //     vehicleName: selectedVehicle?.vehicalName,
  //     vehiclePrice: selectedVehicle?.basePrice,
  //   };

  //   try {
  //     const response = await axios.post(
  //       'http://192.168.1.231:8200/api/CCAvenue/CCAvenueMoverspayment',
  //       {updateddata: paydata1},
  //     );

  //     if (response && response.data && response.data.url) {
  //       setShowWebView(true);
  //       setPaymentUrl(response.data.url);
  //     }
  //   } catch (error) {
  //     console.error(
  //       'Error initiating payment:',
  //       error.response || error.message || error,
  //     );
  //   }
  // };

  console.log(
    " moment(selected).format('DD/MM/YYYY')",
    moment(selected).format('DD/MM/YYYY'),
  );

  const handleSubmit1 = async e => {
    e.preventDefault();
    if (!selectedDate) {
      setdateModel(true);
      return;
    }

    let GT = GrandTotal + PMAddonstotal;
    console.log('GT', GT);
    try {
      setloader(true);
      const config = {
        url: '/order/addorder',
        method: 'post',
        baseURL: ApiUrl.BASEURL,
        headers: {'content-type': 'application/json'},
        data: {
          customer: user?.customerName,
          email: user?.email,
          phone: user?.mainContact,
          Items: MyCartItems,
          userId: user?._id,
          pickupLocation: pickupLocation,
          dropLocation: dropLocation,
          Services: activeCategory,
          serviceName: activeCategory,
          serviceId: data?._id,
          amount: GT.toFixed(2),
          PMAddonsItems: PMAddonsItems,
          baseAmount: GrandTotal,
          bookingDate: moment().format('LLL'),
          serviceDate: selectedDate
            ? moment(selectedDate).format('DD/MM/YYYY')
            : moment(selected).format('DD/MM/YYYY'),
          slot: slot,
          city: savecity,
          category: 'Packers & Movers',
          packingLayer: singleLayer ? 'single' : multilayer ? 'multi' : '',
          unpacking: unpacking ? true : false,
          dismantling: dismantling ? true : false,
          distance: distanceInKm,
          paymentStatus: 'cash',
          pickupFloor: pickupFloor,
          dropFloor: dropFloor,
          vehicleName: selectedVehicle?.vehicalName,
          vehiclePrice: selectedVehicle?.basePrice,
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        setloader(false);
        deletePMAddonsCartItems();
        deletePMCartItems();
        navigation.navigate('ThankYou');
        // alert('Thank for your booking is confirmed');
      } else {
        // Handle unexpected response status codes
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      setloader(false);
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
  const handlePress = () => {
    checkNext();
  };
  return (
    <View style={{flex: 1}}>
      {showWebView ? (
        <>
          <TouchableOpacity onPress={() => navigation.navigate('Bottomtab')}>
            <Text
              style={{backgroundColor: 'white', padding: 10, color: 'blue'}}>
              Back
            </Text>
          </TouchableOpacity>
          <WebView source={{uri: paymentUrl}} style={{flex: 1}} />
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: 'lightgrey',
              padding: 10,
            }}>
            <AntDesign
              name="arrowleft"
              color={'black'}
              size={22}
              onPress={() => {
                if (currentPosition > 0) {
                  setCurrentPosition(currentPosition - 1);
                } else {
                  navigation.navigate('Bottomtab');
                }
              }}
            />
            <Text style={{color: 'black', fontFamily: 'Poppins-Medium'}}>
              Packers & Movers
            </Text>
            <Text></Text>
          </View>
          <View style={styles.container}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={currentPosition}
              labels={labels}
              stepCount={4}
              renderStepIndicator={params =>
                renderStepIndicator(params.stepStatus, params.position)
              }
            />
            <View style={styles.stepContainer}>{renderStepContent()}</View>

            <View style={styles.buttonContainer}>
              {currentPosition === 2 && (
                <TouchableOpacity
                  onPress={() => setCurrentPosition(currentPosition - 1)}
                  style={styles.button2}>
                  <Text style={{color: 'black', fontFamily: 'Poppins-Medium'}}>
                    <FontAwesome5 name={'rupee-sign'} /> {GrandTotal.toFixed(0)}
                  </Text>
                  <Text style={styles.buttonText2}>
                    {totalItems} items added
                  </Text>
                </TouchableOpacity>
              )}

              {currentPosition === 1 && (
                <TouchableOpacity
                  onPress={() => setCurrentPosition(currentPosition - 1)}
                  style={styles.button1}>
                  <Text style={styles.buttonText1}>
                    {totalItems} items added
                  </Text>
                </TouchableOpacity>
              )}

              {currentPosition === 0 && (
                <TouchableOpacity
                  onPress={() => {
                    checkNext();
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}
              {currentPosition === 2 && (
                <TouchableOpacity onPress={handlePress} style={styles.button}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}
              {currentPosition === 1 && (
                <TouchableOpacity
                  onPress={() => {
                    if (MyCartItems.length === 0) {
                      // Check if the cart is empty
                      alert('Please add items'); // Show alert if cart is empty
                    } else {
                      setCurrentPosition(currentPosition + 1); // Move to next step if items are in the cart
                    }
                  }}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
              )}

              {currentPosition === labels.length - 1 && (
                <TouchableOpacity onPress={handleSubmit1} style={styles.button}>
                  {loader ? (
                    <ActivityIndicator color={'white'} />
                  ) : (
                    <Text style={styles.buttonText}>Book Now</Text>
                  )}
                </TouchableOpacity>
              )}

              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Successfully ordered</Text>

                    <Image
                      source={require('../../../assets/tsucuss.gif')}
                      style={{width: 250, height: 250}}
                    />
                    <Pressable
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        navigation.navigate('Bottomtab');
                      }}>
                      <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 20,
    elevation: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    borderColor: 'white',
  },
  button: {
    flex: 1,
    backgroundColor: '#FF8343',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
    // marginHorizontal: 1, // To add space between buttons
  },
  button1: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
    marginHorizontal: 1, // To add space between buttons
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
  buttonText1: {
    color: 'grey',
    fontSize: 14,
    // textAlign: 'center',
  },
  button2: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    height: 40,
    marginHorizontal: 1, // To add space between buttons
  },
  buttonText2: {
    color: 'grey',
    fontSize: 12,
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
  textStyle: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#eee3',
    padding: 7,
    borderRadius: 10,
    width: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: 'green',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default Booking;
