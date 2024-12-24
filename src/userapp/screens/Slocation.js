import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

function Slocation({navigation}) {
  const [address, setaddress] = useState();

  const [storagedata, setStoragedata] = useState([]);
  const [platNo, setPlatNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [otherData, setotherData] = useState('');

  const [saveAs, setsaveAs] = useState('');
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 12.9716,
    longitude: 77.5946,
  });

  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isOthersClicked, setIsOthersClicked] = useState(false);

  const handleHomePress = () => {
    setIsHomeClicked(true);
    setIsOthersClicked(false); // Reset other button's state
    setsaveAs('Home');
  };

  const handleOthersPress = () => {
    setIsHomeClicked(false); // Reset home button's state
    setIsOthersClicked(true);
    setsaveAs('other');
  };

  const homeButtonStyle = {
    borderColor: isHomeClicked ? 'orange' : 'black',
    borderWidth: 1,
    padding: 6,
    marginRight: 10,
    borderRadius: 5,
    width: 70,
    textAlign: 'center',
  };

  const othersButtonStyle = {
    borderColor: isOthersClicked ? 'orange' : 'black',
    borderWidth: 1,
    padding: 6,
    borderRadius: 5,
    width: 70,
  };

  useEffect(() => {
    AsyncStorage.getItem('locationData').then(value => {
      setStoragedata(value);
    });
  }, []);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the LOCATION');
      } else {
        console.log('LOCATION permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const searchLocation = async query => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk`,
      );

      if (response.data && response.data.results.length > 0) {
        const result = response.data.results[0];
        const {geometry, formatted_address} = result;

        const lat = geometry.location.lat;
        const lng = geometry.location.lng;

        setSelectedLocation({latitude: lat, longitude: lng});
        setaddress(formatted_address);

        // Open the modal after searching for a location
        setIsModalVisible(true);
      } else {
        setaddress('Location not found.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const saveData = async () => {
    try {
      if (!platNo) {
        alert('House/Flat/Block No is required');
        return;
      }

      if (!landmark) {
        alert('Landmark/Society name is required');
        return;
      }

      const data = {
        platNo,
        landmark,
        address,
        otherData,
        saveAs,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('locationData', jsonData);
      closeModal();
     
      console.log('Data saved successfully:', jsonData);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


  return (
    <View style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          zIndex: 1111,
          marginTop: 10,
          paddingLeft: 10,
        }}>
        <EvilIcons name="search" color="black" size={25} />
      </View>
      <GooglePlacesAutocomplete
        placeholder="Search location..."
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          if (details) {
            console.log('Latitude:', JSON.stringify(data));
            console.log(
              'Longitude:',
              JSON.stringify(details?.geometry?.location),
            );
          }
          searchLocation(data.description); // Update the selected location
        }}
        query={{
          key: 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk', // Replace with your API key
          language: 'en',
        }}
        onFail={error => console.log(error)}
        fetchDetails={true} // Important: Enables fetching details including coordinates
        styles={{
          container: {
            backgroundColor: 'white',
            borderColor: 'orange',
            borderWidth: 1,
            position: 'absolute',
            width: '100%',
            height: 'auto',
            zIndex: 11,
            paddingLeft: 25,
          },
        }}
      />

      <View style={{flex: 1, zIndex: 1}}>
        <MapView
          ref={mapRef}
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            latitudeDelta: 0.015, // Adjust this value for your desired zoom level
            longitudeDelta: 0.0121, // Adjust this value for your desired zoom level
          }}
          onRegionChange={x => {
            console.log(x);
          }}>
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        </MapView>
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={closeModal}
              style={{
                position: 'absolute',
                right: 0,
                backgroundColor: 'white',
                zIndex: 1,
                borderRadius: 50,
              }}>
              <AntDesign name="closecircle" color="darkred" size={35} />
            </TouchableOpacity>
            <Text style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}>
              Address:
            </Text>
            <Text style={{color: 'black', fontSize: 14}}>{address}</Text>

            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.label}>House /Flat/ Block No</Text>
                <Text style={{color: 'red'}}> *</Text>
              </View>

              <TextInput
                style={styles.input}
                value={platNo}
                onChangeText={text => setPlatNo(text)}
              />
            </View>

            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.label}>Landmark / Society name</Text>
                <Text style={{color: 'red'}}> *</Text>
              </View>

              <TextInput
                style={styles.input}
                value={landmark}
                onChangeText={text => setLandmark(text)}
              />
            </View>

            <View style={{flexDirection: 'row', marginTop: 10}}>
              <Text style={styles.label}>Save as</Text>
              <Text style={{color: 'red'}}> *</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={handleHomePress}
                  style={homeButtonStyle}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      marginLeft: 0,
                    }}>
                    Home
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleOthersPress}
                  style={othersButtonStyle}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      marginLeft: 0,
                    }}>
                    Others
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {isOthersClicked ? (
              <View style={{marginTop: 10}}>
                <TextInput
                  style={styles.input}
                  value={otherData}
                  onChangeText={text => setotherData(text)}
                />
              </View>
            ) : (
              <></>
            )}

            <TouchableOpacity
              onPress={saveData}
              style={{
                backgroundColor: 'darkred',
                padding: 8,
                borderRadius: 5,
                marginTop: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  textinputicon: {
    position: 'absolute',
    top: 20,
    left: 16,
  },
  modalContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  label: {
    color: 'black',
    fontSize: 13,
    fontWeight: '600',
    paddingBottom: 5,
  },
  input: {
    borderWidth: 1,
    height: 45,
    borderRadius: 5,
    borderColor: 'grey',
    paddingLeft: 15,
  },
});

export default Slocation;
