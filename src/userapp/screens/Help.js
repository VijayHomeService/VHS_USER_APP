import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  Linking,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Help = () => {
  const bottomSheet = useRef();
  const handlePhoneCall = () => {
    Linking.openURL(`tel:8453748478`);
  };
  const handleWhatsApp = () => {
    const phoneNumber = '+919611600990';
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <View>
            <Image
              source={require('../../../assets/helpc.jpg')}
              style={{
                width: '100%',
                height: 300,
                marginTop: 10,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{margin: 10}}>
            {/* <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Online Help Center
            </Text> */}
            <Text style={styles.hpcontent}>
              Step into a world of elevated living with Vijay Home Services –
              Your Trusted Partner for Comprehensive Home Solutions! 🏡✨
            </Text>

            <Text
              style={{
                marginTop: 20,
                color: 'grey',
                textAlign: 'justify',
                margin: 10,
              }}>
              Immerse yourself in excellence, where every detail matters. From
              precision in cleaning services to seamless home maintenance, we
              are committed to transforming your living spaces. Dive into our
              services, get acquainted with our dedicated team, and join us on a
              journey towards a cleaner, more comfortable home. Your
              satisfaction is not just a goal; it's our unwavering commitment.
              Let's redefine home care together, with Vijay Home Services.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity
          onPress={handleWhatsApp}
          style={{
            flex: 0.5,
            backgroundColor: 'green',
            borderRadius: 5,
            padding: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <FontAwesome name="whatsapp" color="white" size={20} />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Whatsapp
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePhoneCall}
          style={{
            flex: 0.5,
            backgroundColor: 'blue',
            borderRadius: 5,
            padding: 10,
            marginLeft: 20,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <FontAwesome name="phone" color="white" size={20} />
            <Text
              style={{
                color: 'white',
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Call Now
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#140078',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowColor: '#8559da',
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: 'white',
    fontWeight: '600',
  },
  mastercardimg: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  mastercardtext: {
    color: 'black',
    fontSize: 16,
    marginLeft: 10,
  },
  paymentrow: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  paymentrow1: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    borderColor: 'grey',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  button1: {
    backgroundColor: 'red',
    borderRadius: 15,
    padding: 10,
    width: '100%',
    marginTop: 20,
  },
  hpcontent: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Help;
