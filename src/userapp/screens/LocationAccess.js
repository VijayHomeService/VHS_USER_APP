import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

function Location({navigation}) {
  const GOOGLE_API_KEY = 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk';
  const [address, setAddress] = useState({address: '', markerCoordinate: {}});
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('address').then(value => {
      if (value) {
        console.log('yogesh', value);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('address', JSON.stringify(address));
  }, [address]);

  Geocoder.init(GOOGLE_API_KEY);

  useEffect(() => {
    checkLocationServices();
  }, []);

  const checkLocationServices = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');

        // Check if location services are enabled
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
          message: `
            <h2 style="text-align: center;">Enable Location</h2>
            <p style="text-align: center;">
             Enable location access to discover personalized recommendations and unlock tailored services <br/><br/>
              
            </p>
          `,
          ok: 'YES',
          cancel: 'NO',
        })
          .then(function (success) {
            // Location services are enabled, request location permission
            // requestLocationPermission();
          })
          .catch(function (error) {
            // Location services are disabled, prompt the user to enable them
            Alert.alert(
              'Location Services',
              'Please enable Location Services to use this application.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Open Settings',
                  onPress: () => LocationServicesDialogBox.forceCloseDialog(),
                },
              ],
            );
          });
      } else {
        console.log('Location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn('Error checking location services:', err);
    }
  };

  const getLocation = async () => {
    setIsModalVisible(true);

    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 10000,
        });
      });

      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      Geocoder.from(lat, long).then(data => {
        let fetchedAddress = data.results[0]?.formatted_address;

        setIsModalVisible(false);

        const abc = {
          address: fetchedAddress,
          markerCoordinate: {latitude: lat, longitude: long},
        };
        AsyncStorage.setItem('address', JSON.stringify(abc));
        setAddress({
          address: fetchedAddress,
          markerCoordinate: {latitude: lat, longitude: long},
        });

        navigation.navigate('tab');
      });
    } catch (error) {
      console.error('Error getting location:', error.message);
      setIsModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Address.gif')}
        style={styles.locationGif}
      />

      <View style={styles.bottomContainer}>
        <Text style={styles.txthead}>
          Enable location access to discover personalized recommendations and
          nearby services effortlessly.
        </Text>
        <TouchableOpacity onPress={() => getLocation()} style={styles.button}>
          <Text style={styles.buttonText}>
            {isModalVisible ? (
              <ActivityIndicator size="large" color={'white'} />
            ) : (
              'Allow Location Services'
            )}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('tab')}>
          <Text style={styles.addressText}>Maybe later</Text>
        </TouchableOpacity>
        <Text style={styles.addressText}>{address?.address}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  locationGif: {
    alignSelf: 'center',
    marginTop: 100,
    width: 200,
    height: 200,
  },
  txthead: {
    fontSize: 17,
    padding: 5,
    justifyContent: 'center',
    margin: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },
  skip: {
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    marginTop: 20,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 100,
    justifyContent: 'center',
    width: '100%',
  },
  addressText: {
    padding: 5,
    color: 'black',
    fontFamily: 'Poppins-Light',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'darkred',
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    color: 'black',
    fontSize: 23,
    marginLeft: 10,
  },
});

export default Location;
