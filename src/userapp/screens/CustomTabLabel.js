import React from 'react';
import {Text} from 'react-native';

const CustomTabLabel = () => {
  return (
    <Text style={{flexDirection: 'row', marginBottom: 5}}>
      <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
        X {''}
      </Text>

      <Text style={{color: 'blue', fontWeight: 'bold', fontSize: 18}}>O</Text>
    </Text>
  );
};

export default CustomTabLabel;
