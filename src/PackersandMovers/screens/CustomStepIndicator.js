// CustomStepIndicator.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomStepIndicator = ({iconName, isActive, isCompleted}) => {
  return (
    <View
      style={[
        styles.container,
        isCompleted ? styles.completed : {},
        isActive ? styles.active : {},
      ]}>
      <Icon
        name={iconName}
        size={20}
        color={isCompleted || isActive ? '#fff' : '#4BB543'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4BB543',
    backgroundColor: 'white',
  },
  active: {
    backgroundColor: '#4BB543',
  },
  completed: {
    backgroundColor: '#4BB543',
  },
});

export default CustomStepIndicator;
