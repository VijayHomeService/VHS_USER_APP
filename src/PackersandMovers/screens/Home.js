import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './Header';
import Banner from './Banner';
import Category from './Category';
import Howitworks from './Howitworks';
import Exclusiveoffer from './Exclusiveoffer';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Servicedetails from './Servicedetails';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Arrow3 from '../../../assets/Arrows-03.svg';
import {opacity} from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import DatePicker from 'react-native-date-picker';
import PMVideo from './PMVideo';

export default function Home({navigation}) {
  const deviceWidth = Dimensions.get('window').width;
  const [showQuote, setShowQuote] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const openModal = () => setShowQuote(true);
  const closeModal = () => setShowQuote(false);

  useEffect(() => {
    AsyncStorage.getItem('pickup').then(value => {
      const parsedValue = JSON.parse(value);
      console.log('pickupLocation', parsedValue);
    });
    AsyncStorage.getItem('drop').then(value => {
      const parsedValue = JSON.parse(value);
      console.log('dropLocation', parsedValue);
    });
  }, []);
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
    <View style={styles.container}>
      <StatusBar backgroundColor="#FF8343" barStyle="light-content" />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../../assets/Images/tloader.gif')}
            style={{width: 150, height: 150}}
          />
        </View>
      ) : (
        <ScrollView style={styles.container}>
          <Header navigation={navigation} />
          <PMVideo />

          {/* <Category navigation={navigation} /> */}
          <Servicedetails navigation={navigation} />
          <Banner />
          {/* <Exclusiveoffer navigation={navigation} /> */}
          <Howitworks />
        </ScrollView>
      )}

      {/* <View style={styles.trybookui}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <View
            style={{
              width: 40,
              height: 35,
              borderRadius: 30,
              overflow: 'hidden',
            }}>
            <Image
              source={require('../../../assets/moving-truck.gif')}
              style={{width: 40, height: 35}}
            />
          </View>

          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 13,
              color: 'white',
            }}>
            Complete your booking
          </Text>

          <TouchableOpacity>
            <EvilIcons name="close-o" size={22} color={'white'} />
          </TouchableOpacity>
        </View>
      </View> */}

      <Modal
        animationIn="slideInUp"
        isVisible={showQuote}
        // deviceWidth={deviceWidth}
        style={{
          // margin: 10,
          position: 'absolute',
          width: deviceWidth - 35,
          backgroundColor: 'white',
          shadowColor: '#000',
          marginTop: '15%',
          borderRadius: 20,
        }}
        transparent={true}>
        <TouchableOpacity
          style={{position: 'absolute', right: '50%', top: -30}}
          onPress={closeModal}>
          <AntDesign
            name="closecircleo"
            color={'white'}
            size={25}
            onPress={closeModal}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            textAlign: 'center',
            padding: 10,
            fontFamily: 'Poppins-Medium',
            marginTop: 15,
            // letterSpacing: 1,
          }}>
          Get quotes on your shipment
        </Text>
        <View style={{paddingLeft: 20, alignItems: 'left'}}>
          <Text
            style={{
              fontSize: 13,
              color: 'black',
              fontFamily: 'Poppins-Medium',
              // letterSpacing: 1,
            }}>
            Fill up the Form
          </Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#a3a3a3"
            style={{
              borderRadius: 10,
              width: '90%',
              fontSize: 13,
              // height: 50,
              padding: 5,
              color: 'black',
              fontFamily: 'Poppins-Medium',
              paddingLeft: 16,
              borderColor: '#d7d7d7',
              borderWidth: 1,
              marginTop: 15,
              // letterSpacing: 1,
            }}
          />
          <TextInput
            placeholder="Mobile Number"
            placeholderTextColor="#a3a3a3"
            keyboardType="numeric"
            maxLength={10}
            style={{
              borderRadius: 10,
              fontSize: 13,
              width: '90%',
              // height: 50,
              padding: 5,
              color: 'black',
              fontFamily: 'Poppins-Medium',
              paddingLeft: 16,
              borderColor: '#d7d7d7',
              borderWidth: 1,
              marginTop: 15,
              // letterSpacing: 1,
            }}
          />
          <View style={{position: 'absolute', right: -20, bottom: 70}}>
            <Arrow3 style={{opacity: 0.5}} width={220} height={90} />
          </View>
          <TextInput
            placeholder="Name of the Service"
            placeholderTextColor="#a3a3a3"
            style={{
              borderRadius: 10,
              fontSize: 13,
              width: '90%',
              // height: 50,
              padding: 5,
              color: 'black',
              fontFamily: 'Poppins-Medium',
              paddingLeft: 16,
              borderColor: '#d7d7d7',
              borderWidth: 1,
              marginTop: 15,
              // letterSpacing: 1,
            }}
          />
          {/* <TouchableOpacity onPress={() => setOpen(true)}>
            <TextInput
              placeholder="Shifting date"
              placeholderTextColor="#a3a3a3"
              value={date}
              style={{
                borderRadius: 10,
                fontSize: 13,
                width: '90%',
                // height: 50,
                padding: 5,
                color: 'black',
                fontFamily: 'Poppins-Medium',
                paddingLeft: 16,
                borderColor: '#d7d7d7',
                borderWidth: 1,
                marginTop: 15,
                // letterSpacing: 1,
              }}
            />
          </TouchableOpacity>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          /> */}
          <View style={{marginHorizontal: 40, marginVertical: 10}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'orange',
                padding: 10,
                borderRadius: 7,
                // flexDirection: 'row',
                // alignContent: 'center',
                // justifyContent: 'space-between',
                width: '90%',
                marginVertical: 15,
              }}
              onPress={closeModal}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  fontFamily: 'Poppins-SemiBold',
                  // letterSpacing: 1,
                  textAlign: 'center',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#FCF8F3',
    flex: 1,
  },
  animation: {
    width: 200,
    height: 200,
  },
  trybookui: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#FF8343',
    height: 45,
    elevation: 5,

    width: '92%',
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
