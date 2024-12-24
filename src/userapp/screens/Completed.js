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
import moment from 'moment';
import Video from 'react-native-video';
import Loader from './Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';

function Completed() {
  const [allorder, setAllorder] = useState([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setValue(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData1();

    const interval = setInterval(() => {
      fetchData1();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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

  const cdata = allorder.filter(item => item?.dsrdata[0]?.endJobTime);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, [value]);

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
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {!cdata.length > 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Video
                source={require('../../../assets/nodata.mp4')}
                style={{
                  width: 200,
                  height: 200,
                }}
                muted={false}
                repeat={true}
                resizeMode="contain"
                paused={false}
              />
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                Please Book Any Services and Come Back Later!
              </Text>
            </View>
          ) : (
            <ScrollView>
              <View>
                {cdata.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigation.navigate('completedetail', {allorder: item});
                    }}
                    style={[styles.textinput, styles.elevation]}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 0.8}}>
                        <Text
                          style={{
                            color: 'darkred',
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginTop: 5,
                          }}>
                          {item.service}
                        </Text>

                        <View
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
                        </View>
                        <View>
                          <Text
                            style={{
                              color: 'darkgreen',
                              backgroundColor: 'rgb(190, 204, 196)',
                              width: 90,
                              padding: 2,
                              textAlign: 'center',
                            }}>
                            Completed
                          </Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                          <MaterialIcons
                            name="category"
                            size={20}
                            color="grey"
                          />
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
                      </View>
                      <View
                        style={{
                          flex: 0.2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <AntDesign
                          name="checkcircleo"
                          size={22}
                          color="green"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
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
export default Completed;
