import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {ApiUrl} from '../../ApiServices/ApiUrl';
import {getData} from '../../ApiServices/ApiServices';

export default function Servicedetails({navigation}) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    try {
      const response = await getData(ApiUrl.GETSERVICE);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Select your shifting needs</Text>
        <View style={styles.offerRow}>
          <Image
            source={require('../../../assets/sale.gif')}
            style={styles.offergif}
          />
          <Text style={styles.offerText}>Upto 25% offer on first booking</Text>
        </View>

        {/* Render each item without animation */}
        <View style={styles.animatedItem}>
          {Data.map(ele => (
            <TouchableOpacity
              key={ele._id}
              style={styles.servcontainer}
              onPress={() =>
                navigation.navigate('Booking', {
                  data: ele,
                })
              }>
              <Image
                source={{
                  uri: ApiUrl.IMAGEURL + `/ServiceImage/${ele.Serviceimg}`,
                }}
                style={styles.simg}
              />
              <View style={styles.s2}>
                <Text style={styles.txt}>{ele.servicename} </Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {ele.desc}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('Viewdetails', {
                        serviceData: ele,
                      })
                    }

                    //  onPress={() => navigation.navigate('Viewdetails')}
                  >
                    <Text style={styles.viewdetails}>View details</Text>
                  </Pressable>
                  <FontAwesome6
                    name="arrow-right-long"
                    size={17}
                    color={'darkred'}
                    style={{
                      width: 35,
                      height: 22,
                      backgroundColor: '#e6e6e647',
                      borderRadius: 10,
                      alignItems: 'center',
                      marginLeft: 10,
                      padding: 2,
                      paddingLeft: 8,
                      marginTop: 10,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
          {/* <TouchableOpacity
            style={styles.servcontainer}
            onPress={() => navigation.navigate('Location')}>
            <Image
              source={{
                uri: 'https://vijayahomeservices.b-cdn.net/Appliance%20Services/10X%20(1).jpg',
              }}
              style={styles.simg}
            />
            <View style={styles.s2}>
              <Text style={styles.txt}>Mini truck with 1 labour</Text>
              <Text style={styles.desc}>
                We handle the entire moving process, making it hassle-free
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable onPress={() => navigation.navigate('Viewdetails')}>
                  <Text style={styles.viewdetails}>View details</Text>
                </Pressable>
                <FontAwesome6
                  name="arrow-right-long"
                  size={17}
                  color={'grey'}
                  style={{
                    width: 35,
                    height: 22,
                    backgroundColor: '#e6e6e647',
                    borderRadius: 10,
                    alignItems: 'center',
                    marginLeft: 10,
                    padding: 2,
                    paddingLeft: 8,
                    marginTop: 10,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={styles.servcontainer}
            onPress={() => navigation.navigate('VehicleMovers')}>
            <Image
              source={{
                uri: 'https://vijayahomeservices.b-cdn.net/Appliance%20Services/8.jpg',
              }}
              style={styles.simg}
            />
            <View style={styles.s2}>
              <Text style={styles.txt}>Vehicle Movers</Text>
              <Text style={styles.desc}>
                We handle the loading and unloading of your vehicle
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Pressable onPress={() => navigation.navigate('Viewdetails')}>
                  <Text style={styles.viewdetails}>View details</Text>
                </Pressable>
                <FontAwesome6
                  name="arrow-right-long"
                  size={17}
                  color={'grey'}
                  style={{
                    width: 35,
                    height: 22,
                    backgroundColor: '#e6e6e647',
                    borderRadius: 10,
                    alignItems: 'center',
                    marginLeft: 10,
                    padding: 2,
                    paddingLeft: 8,
                    marginTop: 10,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    margin: 15,
  },
  header: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 16,
    padding: 5,
    marginTop: 10,
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offergif: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  offerText: {
    color: 'green',
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
  servcontainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#eeeeeec7',
  },
  simg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  s2: {
    marginLeft: 10,
    flex: 1,
  },
  txt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 11,
  },
  view: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    color: 'orange',
    width: 70,
  },
  animatedItem: {
    marginBottom: 5,
  },
  viewdetails: {
    fontFamily: 'Poppins-Light',
    fontSize: 10,
    marginTop: 10,
    backgroundColor: 'orange',
    paddingTop: 2,
    paddingLeft: 4,
    paddingRight: 4,
    color: 'white',
    borderRadius: 5,
  },
});
