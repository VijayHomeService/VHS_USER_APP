import React, {useEffect, useRef} from 'react';
import {View, Text, Image, Animated, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image as RneImage} from 'react-native-elements';

const Splashscreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('address').then(value => {
        if (value) {
          navigation.navigate('tab');
        } else {
          navigation.navigate('location');
        }
      });
    }, 0);
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../../../assets/vhs.png')}
          style={{
            width: 120,
            height: 120,
          }}
        />

        <Text
          style={{
            marginTop: 40,
            fontSize: 22,
            fontWeight: 'bold',
            color: 'black',
          }}>
          VIJAY HOME SERVICES
        </Text>
        <Text
          style={{
            marginTop: 40,
            fontSize: 18,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Trusted by 40M+ Customers
        </Text>

        <View style={{flexDirection: 'row', marginTop: 100}}>
          <View style={{flex: 0.3, alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>India</Text>
            <Image
              source={require('../../../assets/india.png')}
              style={{
                width: 40,
                height: 20,
                marginTop: 5,
              }}
            />
          </View>

          <View style={{flex: 0.3, alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>Dubai</Text>
            <Image
              source={require('../../../assets/dubai.jpeg')}
              style={{
                width: 40,
                height: 20,
                marginTop: 5,
              }}
            />
          </View>

          <View style={{flex: 0.3, alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: 'bold'}}>London</Text>
            <Image
              source={require('../../../assets/london.png')}
              style={{
                width: 40,
                height: 20,
                marginTop: 5,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
});
export default Splashscreen;

// import React, {useEffect, useRef} from 'react';
// import {View, Text, Image, Animated, Easing} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// function YourComponent({navigation}) {

//   useEffect(() => {
//     setTimeout(() => {
//       AsyncStorage.getItem('user').then(value => {
//         if (value) {
//           navigation.navigate('tab');
//         } else {
//           navigation.navigate('signin');
//         }
//       });
//     }, 3000);
//   }, []);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(-100)).current;

//   useEffect(() => {
//     Animated.sequence([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 1000,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 1000,
//         easing: Easing.ease,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   return (
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           justifyContent: 'center',
//           alignContent: 'center',
//           alignItems: 'center',
//           flex: 1,
//         }}>
//         <Animated.Image
//           source={require('../assets/vhs.png')}
//           style={{
//             width: 150,
//             height: 150,
//             opacity: fadeAnim,
//             transform: [{translateY: slideAnim}],
//           }}
//         />

//         <Animated.Text
//           style={{
//             marginTop: 40,
//             fontSize: 22,
//             fontWeight: 'bold',
//             color: 'red',
//             opacity: fadeAnim,
//             transform: [{translateY: slideAnim}],
//           }}>
//           VIJAY HOME SERVICES
//         </Animated.Text>

//         <Animated.Text
//           style={{
//             marginTop: 40,
//             fontSize: 18,
//             fontWeight: 'bold',
//             color: 'black',
//             opacity: fadeAnim,
//             transform: [{translateY: slideAnim}],
//           }}>
//           Trusted by 40M+ Customers
//         </Animated.Text>

//         <View style={{flexDirection: 'row', marginTop: 100}}>
//           <View style={{flex: 0.3, alignItems: 'center'}}>
//             <Text style={{color: 'black'}}>India</Text>
//             <Image
//               source={require('../assets/india.png')}
//               style={{
//                 width: 40,
//                 height: 20,
//                 marginTop:5
//               }}
//             />
//           </View>

//           <View style={{flex: 0.3, alignItems: 'center'}}>
//             <Text style={{color: 'black'}}>Dubai</Text>
//             <Image
//               source={require('../assets/dubai.jpeg')}
//               style={{
//                 width: 40,
//                 height: 20,
//                 marginTop:5
//               }}
//             />
//           </View>

//           <View style={{flex: 0.3, alignItems: 'center'}}>
//             <Text style={{color: 'black'}}>London</Text>
//             <Image
//               source={require('../assets/london.png')}
//               style={{
//                 width: 40,
//                 height: 20,
//                 marginTop:5
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// export default YourComponent;
