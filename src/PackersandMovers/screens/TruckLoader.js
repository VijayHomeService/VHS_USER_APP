// import {View, Text} from 'react-native';
// import React from 'react';
// import {Image} from 'react-native';

// export default function TruckLoader() {
//   return (
//     <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//       <Image
//         source={require('../../../assets/Images/tl.gif')}
//         style={{width: 200, height: 200}}
//       />
//     </View>
//   );
// }

import React, {useEffect, useRef} from 'react';

import {View, StyleSheet, Image, Text, Animated} from 'react-native';

export default function TruckLoader({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Images/tl.gif')}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'orange',
  },
  animation: {
    width: 150,
    height: 150,
  },
  head: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  desc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});
