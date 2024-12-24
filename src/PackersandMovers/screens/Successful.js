import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';

export default function Successful({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Bottomtab');
    }, 3000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.modalView}>
        <Image
          source={require('../../../assets/tsucuss.gif')}
          style={{width: 250, height: 250}}
        />

        <Text style={styles.modalText}>Booking Successfully </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#eee3',
    padding: 7,
    borderRadius: 10,
    width: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'green',
  },
});
