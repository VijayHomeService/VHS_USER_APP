import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Loader from './Loader';

function Allorder() {
  const [allorder, setAllorder] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setValue(JSON.parse(userData));
          console.log(userData);
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [value]);

  const fetchData = async () => {
    if (!value?._id) {
      return;
    }
    try {
      const response = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/mybookingdata/${value?._id}`,
      );

      if (response.status === 200) {
        setAllorder(response.data?.runningdata);

        setLoading(false);
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [value]);

  const cdata = allorder.filter(i => i.dsrdata[0]?.endJobTime === undefined);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate loading for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    // Clear the timer when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {cdata?.length > 0 ? (
            <ScrollView>
              <View>
                {cdata.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('upcomingdetail', {allorder: item});
                    }}
                    style={[styles.textinput, styles.elevation]}>
                    <Text
                      style={{
                        color: 'darkred',
                        fontFamily: 'Poppins-Bold',
                        fontSize: 14,
                        marginTop: 5,
                      }}>
                      {item.service}
                    </Text>

                    {/* <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: 'gray',

                          fontSize: 14,
                        }}>
                        ₹ {item.serviceCharge}
                      </Text>

                      <Text
                        style={{
                          borderRightWidth: 1,
                          borderColor: 'grey',
                          marginLeft: 5,
                        }}></Text>

                      <Text
                        style={{
                          color: 'gray',

                          fontSize: 14,
                          marginLeft: 5,
                        }}>
                        {item.startDate}
                      </Text>
                    </View> */}

                    <View style={{flexDirection: 'row'}}>
                      <MaterialIcons name="category" size={20} color="grey" />
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 14,
                          marginLeft: 5,
                          marginTop: 3,
                        }}>
                        {item.category}
                      </Text>
                    </View>
                    {/* <View style={{flexDirection: 'row'}}>

                      <AntDesign name="clockcircleo" color="black" size={17} style={{marginTop:5}}/>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 14,
                          marginLeft: 5,
                          marginTop: 3,
                        }}>
                        {item.date}
                      </Text>
                    </View> */}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text style={{margin: 15, fontSize: 18, color: 'black'}}>
                No data ! Please Book service
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  textinput: {
    borderRadius: 10,

    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    margin: 10,
    padding: 10,
  },
  elevation: {
    elevation: 5,
  },
  textinput1: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 16,
    marginTop: 5,
    width: 80,
  },
  elevation1: {
    elevation: 15,
  },
  filterimg: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
});
export default Allorder;
