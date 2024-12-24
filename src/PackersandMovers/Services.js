import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Services() {
  return (
    <View style={styles.container}>
      <Text>Services</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});
