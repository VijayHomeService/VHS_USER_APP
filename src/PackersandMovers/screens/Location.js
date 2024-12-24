import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Animated, // Import Animated from react-native
  Easing,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import debounce from 'lodash/debounce'; // Import debounce from lodash

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';

import Geocoder from 'react-native-geocoding';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Location = ({navigation}) => {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 12.900724675418454,
    longitude: 77.52341310849678,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00000421,
  });

  // Animated values
  const addressOpacity = useRef(new Animated.Value(0)).current;
  const changeLocationOpacity = useRef(new Animated.Value(0)).current;
  const dropButtonOpacity = useRef(new Animated.Value(0)).current;
  const dropButtonTranslation = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Geocoder.init('AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk');

    // Animate address opacity
    Animated.timing(addressOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Animate Change Pickup Location opacity
    Animated.timing(changeLocationOpacity, {
      toValue: 1,
      duration: 1000,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Animate Drop button opacity and translation
    Animated.parallel([
      Animated.timing(dropButtonOpacity, {
        toValue: 1,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(dropButtonTranslation, {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
    ]).start();
  }, []);

  // Debounce onRegionChange to limit the rate of function calls
  const debouncedOnRegionChange = debounce(newRegion => {
    setRegion(newRegion);
    fetchAddress(newRegion.latitude, newRegion.longitude);
  }, 500); // Adjust debounce delay as needed (e.g., 500ms)

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      const address = response.results[0].formatted_address;
      AsyncStorage.setItem('pickup', JSON.stringify(address));

      AsyncStorage.setItem('pickuplat', JSON.stringify(latitude));
      AsyncStorage.setItem('pickuplong', JSON.stringify(longitude));
      setAddress(address);
    } catch (error) {
      console.error('Error fetching address: ', error);
    }
  };

  const mapStyle = [
    // Your custom map styles here
  ];

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="#04c" barStyle="light-content" />
        <View style={styles.header}>
          <Animated.Text
            numberOfLines={1}
            style={[
              {
                backgroundColor: '#f1f3f491',
                borderRadius: 10,
                padding: 8,
                color: 'black',
                fontFamily: 'Poppins-Medium',
                width: '100%',
                fontSize: 14,
                opacity: addressOpacity, // Apply animation
              },
            ]}>
            <Octicons name="dot-fill" color={'green'} size={15} /> {address}
          </Animated.Text>
          <GooglePlacesAutocomplete
            placeholder="Search your locality"
            onPress={(data, details = null) => {
              if (details) {
                const {lat, lng} = details.geometry.location;
                setRegion({
                  latitude: lat,
                  longitude: lng,
                  latitudeDelta: 0.00922,
                  longitudeDelta: 0.00000421,
                });
                console.log(`Latitude: ${lat}, Longitude: ${lng}`);
              }
            }}
            query={{
              key: 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk',
              language: 'en',
            }}
            fetchDetails={true} // Ensure details are fetched
            styles={{
              textInputContainer: {
                width: '100%',
              },
              textInput: {
                height: 40,
                color: 'back',
                fontSize: 14,
                fontFamily: 'Poppins-Light',
              },
              listView: {
                backgroundColor: 'darkgrey', // Background color for the dropdown list
              },
              description: {color: 'black', fontFamily: 'Poppins-Light'},
              predefinedPlacesDescription: {
                color: '#1faadb',
              },
            }}
            nearbyPlacesAPI="GooglePlacesSearch" // Optional: Use the 'GooglePlacesSearch' API
          />
          {/* <Animated.View style={{opacity: changeLocationOpacity}}>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() => navigation.navigate('Picklocationsearch')}>
              <Text
                style={{
                  color: '#04c',
                  fontFamily: 'Poppins-Medium',
                  paddingLeft: 10,
                  padding: 2,
                }}>
                Change Pickup Location
              </Text>
              <Entypo name="chevron-small-right" size={25} color={'#04c'} />
            </TouchableOpacity>
          </Animated.View> */}
        </View>

        <Animated.View
          style={[
            {
              backgroundColor: 'white',
              padding: 12,
              borderRadius: 20,
              position: 'absolute',
              zIndex: 1111,
              bottom: 50,
              width: '90%',
              flexDirection: 'row',
              alignSelf: 'center',
              opacity: dropButtonOpacity,
              transform: [{translateY: dropButtonTranslation}],
            },
          ]}>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: 'Bottomtab',
                  },
                ],
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'green',
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                marginLeft: 25,
              }}>
              CONFIRM Pickup LOCATION
            </Text>
          </TouchableOpacity>
        </Animated.View>

        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={region}
            onRegionChangeComplete={debouncedOnRegionChange} // Use debounced handler
            customMapStyle={mapStyle}
            showsUserLocation>
            {/* <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              draggable
              onDragEnd={e => debouncedOnRegionChange(e.nativeEvent.coordinate)} // Use debounced handler
            >
              <FontAwesome name="map-pin" color={'green'} size={0} />
            </Marker> */}
          </MapView>

          <View style={styles.markerContent}>
            <View>
              <Text style={styles.txt}>Change Pickup</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.txt2} numberOfLines={1}>
                  {address}
                </Text>
                <Entypo name="chevron-small-right" size={15} color={'grey'} />
              </View>
            </View>
          </View>
          <FontAwesome name="map-pin" color={'green'} size={25} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 111,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  markerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    elevation: 15,
    marginBottom: 10,
    width: 255,
  },
  txt: {
    fontFamily: 'Poppins-Medium',
    color: 'green',
    fontSize: 12,
    marginLeft: 10,
  },
  txt2: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 12,

    marginLeft: 10,
  },
});

export default Location;
