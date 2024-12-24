import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Arrow2 from '../../../assets/Arrows-02.svg';
import Arrow4 from '../../../assets/Arrow-04.svg';

function Howitworks() {
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 15, margin: 10}}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            color: 'black',
          }}>
          How we Work
        </Text>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.bg}>
              <Ionicons
                name="document-text-outline"
                size={30}
                color={'#EF5A6F'}
                style={styles.icon}
              />
            </View>

            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 25,
                  color: 'black',
                  textAlign: 'center',
                }}>
                1
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  color: 'black',
                }}>
                Share your shifting requirement
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 10,
                  color: 'black',
                }}>
                where do you want to move
              </Text>
            </View>
          </View>
          <View style={{position: 'absolute', left: 50, top: 50}}>
            <Arrow2 width={220} height={90} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 25,
                  color: 'black',
                  textAlign: 'center',
                }}>
                2
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  color: 'black',
                }}>
                Receive Free instant Quote
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 10,
                  color: 'black',
                }}>
                your shifting instantly
              </Text>
            </View>
            <View style={styles.bg}>
              <MaterialIcons
                name="request-quote"
                size={30}
                color={'#EF5A6F'}
                style={styles.icon}
              />
            </View>
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.bg}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={30}
                color={'#EF5A6F'}
                style={styles.icon}
              />
            </View>
            <View style={{position: 'absolute', left: 60, top: 50}}>
              <Arrow2 width={220} height={90} />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 25,
                  color: 'black',
                  textAlign: 'center',
                }}>
                3
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 11,
                  color: 'black',
                }}>
                Assign Quality Service Expert
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 10,
                  color: 'black',
                }}>
                To ensure safe relocation
              </Text>
            </View>
          </View>
          <View style={{position: 'absolute', left: 50, top: -65}}>
            <Arrow4 width={220} height={100} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 25,
                  color: 'black',
                  textAlign: 'center',
                }}>
                4
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 13,
                  color: 'black',
                }}>
                Leave the Heavy Lifting to Us
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 10,
                  color: 'black',
                }}>
                Enjoy hassle-free on-time movement
              </Text>
            </View>
            <View style={styles.bg}>
              <Feather
                name="truck"
                size={30}
                color={'#EF5A6F'}
                style={styles.icon}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 10,
    // backgroundColor: 'white',
  },
  bg: {
    backgroundColor: 'lightgrey',
    width: 60,
    height: 60,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
    backgroundColor: 'lightgrey',
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    lineHeight: 35,
  },
});

export default Howitworks;
