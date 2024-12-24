import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VehicleMovers({navigation}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = ['Bike', 'Car', 'Auto', 'Others'];
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Locations</Text>
      <View style={{height: 100}}>
        <Text style={styles.label}>Pickup Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search your locality"
          onPress={(data, details = null) => {
            if (details) {
              const {lat, lng} = details.geometry.location;
              console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            }
          }}
          query={{
            key: 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk',
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            listView: styles.listView,
            description: styles.description,
            predefinedPlacesDescription: styles.predefinedPlacesDescription,
            row: styles.row,
            separator: styles.separator,
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
        />
      </View>
      <View style={{height: 100}}>
        <Text style={styles.label}>Drop Location</Text>
        <GooglePlacesAutocomplete
          placeholder="Search your locality"
          onPress={(data, details = null) => {
            if (details) {
              const {lat, lng} = details.geometry.location;
              console.log(`Latitude: ${lat}, Longitude: ${lng}`);
            }
          }}
          query={{
            key: 'AIzaSyBF48uqsKVyp9P2NlDX-heBJksvvT_8Cqk',
            language: 'en',
          }}
          fetchDetails={true}
          styles={{
            textInputContainer: styles.textInputContainer,
            textInput: styles.textInput,
            listView: styles.listView,
            description: styles.description,
            predefinedPlacesDescription: styles.predefinedPlacesDescription,
            row: styles.row,
            separator: styles.separator,
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
        />
      </View>
      <Text style={styles.label}> Shifting date</Text>
      <Pressable style={styles.frlinput} onPress={() => setOpen(true)}>
        <AntDesign name="calendar" size={22} color={'#132c57'} />
        <View>
          <Text style={{marginLeft: 10}}>{date.toString()}</Text>
        </View>
      </Pressable>

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
      />

      <Text style={[styles.label, {marginTop: 20}]}>Items to be shifted </Text>

      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.item, selectedItem === item && styles.selectedItem]}
            onPress={() => setSelectedItem(item)}>
            <Text
              style={[
                styles.itemText,
                selectedItem === item && styles.selectedItemText,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    marginBottom: 10,
  },
  textInputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  textInput: {
    height: 50,
    color: 'black',
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  listView: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    zIndex: 1000,
    marginTop: 50,
    position: 'absolute',
  },
  row: {
    backgroundColor: 'white',
    padding: 10,
    height: 50,
    flexDirection: 'row',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c7cc',
  },
  description: {
    color: 'black',
    fontFamily: 'Poppins-Light',
    fontSize: 11,
    height: 15,
    padding: 0,
  },
  predefinedPlacesDescription: {
    color: '#1faadb',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#1faadb',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'white',
  },
  frlinput: {
    width: '100%',

    borderColor: '#ddd',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  it1: {
    flex: 1,
    height: 40,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 10,
    width: '45%', // Adjust width as needed
    alignItems: 'center',
    marginBottom: 20,
  },
  selectedItem: {
    backgroundColor: '#1faadb',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: 'black',
  },
  selectedItemText: {
    color: 'white',
  },
});
