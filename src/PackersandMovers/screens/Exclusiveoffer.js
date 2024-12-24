import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function Exclusiveoffer({navigation}) {
  return (
    <View style={styles.offerContainer}>
      <View style={styles.offerContent}>
        <Image
          source={require('../../../assets/sale.gif')}
          style={styles.offerGif}
        />
        <View style={styles.textContainer}>
          <Text style={styles.offerTitle}>Exclusive Offer!</Text>
          <Text style={styles.offerText}>
            Up to 25% off on your first booking 🎉
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('Servicedetails')}>
            <Text style={styles.ctaButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  offerContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: '#FFF5E5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  offerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerGif: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,

    color: '#FF7A00',
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
  },
  offerText: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Poppins-Medium',
  },
  ctaButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
  },
});
