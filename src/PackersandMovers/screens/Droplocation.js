import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import debounce from 'lodash/debounce'; // Import debounce from lodash

import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Droplocation = ({route, navigation}) => {
  const [address, setAddress] = useState('');
  const {latitude, longitude, data} = route.params || {};

  const [region, setRegion] = useState({
    latitude: latitude || 12.900724675418454, // Default value if not provided
    longitude: longitude || 77.52341310849678, // Default value if not provided
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00000421,
  });

  useEffect(() => {
    Geocoder.init('AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk');
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
      AsyncStorage.setItem('drop', JSON.stringify(address));
      AsyncStorage.setItem('droplat', JSON.stringify(latitude));
      AsyncStorage.setItem('droplong', JSON.stringify(longitude));
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
        <TouchableOpacity
          style={styles.header}
          onPress={() => navigation.navigate('Location')}>
          <AntDesign
            name="leftcircleo"
            color={'black'}
            size={30}
            style={{
              width: 30,
              height: 30,
              backgroundColor: 'white',
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Booking',
                  params: {data: data}, // Pass the data as params
                },
              ],
            })
          }
          style={{
            backgroundColor: 'white',
            padding: 12,
            borderRadius: 20,
            position: 'absolute',
            zIndex: 1111,
            bottom: 50,
            width: '90%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'red',
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              marginLeft: 25,
            }}>
            CONFIRM DROP LOCATION
          </Text>
        </TouchableOpacity>

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
              <Text style={styles.txt}>Drop Location</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.txt2} numberOfLines={1}>
                  {address}
                </Text>
                <Entypo name="chevron-small-right" size={15} color={'red'} />
              </View>
            </View>
          </View>
          <FontAwesome name="map-pin" color={'red'} size={25} />
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
    padding: 15,
    width: 40,
    height: 40,
    alignSelf: 'center',
    // backgroundColor: 'white',
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
    color: 'red',
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

export default Droplocation;
