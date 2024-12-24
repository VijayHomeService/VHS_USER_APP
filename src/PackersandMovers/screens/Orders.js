import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ApiUrl} from '../../ApiServices/ApiUrl';

export default function Orders() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // Initialize with null for better type consistency
  const [data, setData] = useState([]); // Use camelCase for variable naming consistency
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData(); // Fetch data only after the user data is loaded
    }
  }, [user]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${ApiUrl.BASEURL}${ApiUrl.GETORDERBYUSERID}/${user?._id}`,
      );
      if (response.status === 200) {
        setData(response.data.data);
      } else {
        throw new Error(`Request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const onRefresh = async () => {
    setRefreshing(true); // Show refreshing indicator
    await fetchData(); // Fetch new data
    setRefreshing(false); // Hide refreshing indicator
  };

  const renderItem = ({item}) => (
    <ScrollView>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('OrderDetails', {orders: item})}>
        <View style={styles.orderItem}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/Images/delivery-truck.png')}
              style={styles.image}
            />
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.orderTitle}>{item.bookingDate}</Text>
            {/* <Text style={styles.orderDate}>{item.vehicleType}</Text> */}
          </View>
          <View style={styles.orderStatus}>
            <Feather name="chevron-right" size={20} color="#313131" />
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <FontAwesome6 name="location-dot" size={15} color="#009688" />
            <Text style={styles.locationText}>{item.pickupLocation}</Text>
          </View>
          <View style={styles.separator}>
            <Text style={styles.separatorText}>|</Text>
          </View>
          <View style={styles.locationRow}>
            <FontAwesome6 name="location-dot" size={15} color="#e91e63" />
            <Text style={styles.locationText}>{item.dropLocation}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text
            style={[styles.orderStatusText, getStatusStyle(item.jobStatus)]}>
            {item.jobStatus || 'Status Unknown'}
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );

  const getStatusStyle = status => {
    switch (status) {
      case 'Completed':
        return {color: 'green', backgroundColor: '#a6ffa663'};
      case 'Pending':
        return {color: 'orange', backgroundColor: '#ffe0a86b'};
      case 'In Progress':
        return {color: 'blue', backgroundColor: '#b0b0ff59'};
      default:
        return {color: 'black'};
    }
  };

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          } // Add pull-to-refresh
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Image
            source={require('../../../assets/Images/emptypm.jpg')}
            style={styles.img}
          />
          <Text style={{fontFamily: 'Poppins-Medium', color: 'black'}}>
            No Enquiry found!
          </Text>
          <TouchableOpacity></TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    padding: 3,
  },
  img: {
    width: 350,
    height: 250,

    resizeMode: 'contain',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 3,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.2,
  },
  image: {
    width: 50,
    height: 50,
  },
  orderDetails: {
    flex: 0.7,
  },
  orderTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  orderStatus: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  locationContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 11,
    color: '#565656',
    fontFamily: 'Poppins-Regular',
  },
  separator: {
    marginLeft: 3,
  },
  separatorText: {
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  statusContainer: {
    flexDirection: 'row',
  },
  orderStatusText: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    paddingHorizontal: 5,
    borderRadius: 5,
  },
});