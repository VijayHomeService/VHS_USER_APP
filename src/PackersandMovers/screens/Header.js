import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import GetLocation from 'react-native-get-location';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceholder = createShimmerPlaceholder();
export default function Header({navigation}) {
  const [address, setAddress] = useState('');
  const [latitude, setlatitude] = useState('');
  const [longitude, setlongitude] = useState('');
  const [PickupLocation, setPickupLocation] = useState('');
  const firstLineRef = React.createRef();

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
        setlatitude(latitude);
        setlongitude(longitude);
        fetchAddress(latitude, longitude);

        AsyncStorage.setItem('pickuplat', JSON.stringify(latitude));
        AsyncStorage.setItem('pickuplong', JSON.stringify(longitude));
      } catch (error) {
        const {code, message} = error;
        console.warn(code, message);
      }
    };

    const fetchAddress = async (latitude, longitude) => {
      try {
        const response = await Geocoder.from(latitude, longitude);
        const address = response.results[0].formatted_address;
        AsyncStorage.setItem('pickup', JSON.stringify(address));
        setAddress(address);
      } catch (error) {
        console.error('Error fetching address: ', error);
      }
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('pickup').then(value => {
      const parsedValue = JSON.parse(value);
      setPickupLocation(parsedValue);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../../assets/Images/Doodle_1.jpg')}
          style={{height: 80, width: '100%'}}
        />
        <View style={styles.subhead}>
          <TouchableOpacity style={styles.direction}>
            <Image
              source={require('../../../assets/locationpm.gif')}
              style={styles.gif}
            />
            <View style={{flexDirection: 'row', flex: 0.7}}>
              <View>
                <Text style={styles.headtitle}>Pick up from</Text>
                {address ? (
                  <Text style={styles.location} numberOfLines={1}>
                    {PickupLocation ? PickupLocation : address}
                  </Text>
                ) : (
                  <ShimmerPlaceholder
                    ref={firstLineRef}
                    stopAutoRun
                    duration={100}
                  />
                )}
              </View>
            </View>
            <Octicons
              size={18}
              name="chevron-down"
              style={styles.icon}
              color={'black'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 110,
  },

  subhead: {
    margin: 10,
    marginBottom: 30,
    position: 'absolute',
    // zIndex: 11,
    marginTop: 40,
    width: '95%',
    flex: 1,
  },
  direction: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    padding: 10,
    width: '100%',
    borderRadius: 20,
    alignItems: 'center', // Align items vertically
  },
  location: {
    color: 'black',
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    // width: '50%',
  },
  headtitle: {
    color: 'black',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    // marginLeft: 5,
  },
  gif: {
    width: 40,
    height: 40,
    flex: 0.15,
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 10,
    marginTop: 20,
    flex: 0.1,
  },
});
