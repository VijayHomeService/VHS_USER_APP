import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Loader';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

function Completed() {
  const [enquiry, setEnquiry] = useState([]);
  const [value, setValue] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userValue = await AsyncStorage.getItem('user');
        if (userValue !== null) {
          setValue(JSON.parse(userValue));
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    getenquiry();
  }, [value]);

  const getenquiry = async () => {
    if (!value?._id) {
      return;
    }
    let res = await axios.get(
      `https://api.vijayhomeservicebengaluru.in/api/findwithuseridinenquiryfollowup/${value?._id}`,
    );
    if (res.status === 200) {
      setEnquiry(res.data?.enquiryfollowup);
    }
  };

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
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loader />
      ) : (
        <View style={styles.container}>
          {!enquiry.length > 0 ? (
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
                No data found!
              </Text>
            </View>
          ) : (
            <ScrollView>
              {enquiry.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.textinput, styles.elevation]}
                  onPress={() => {
                    navigation.navigate('Enquirydetails', {enquirydata: item});
                  }}>
                  <Text
                    style={{
                      color: 'darkred',
                      fontFamily: 'Poppins-Bold',
                      fontSize: 15,
                      marginTop: 5,
                    }}>
                    {item.category}
                  </Text>

                  {item.appoDate ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 5,
                        marginBottom: 5,
                      }}>
                      <Text
                        style={{
                          color: 'gray',

                          fontSize: 12,
                        }}>
                        {item.appoTime}
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

                          fontSize: 12,
                          marginLeft: 5,
                        }}>
                        {item.appoDate}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}

                  <View style={{flexDirection: 'row'}}>
                    {/* <MaterialIcons name="category" size={20} color="grey" /> */}
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 12,

                        marginTop: 3,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
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
