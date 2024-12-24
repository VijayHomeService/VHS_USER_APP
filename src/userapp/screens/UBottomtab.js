// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   BackHandler,
//   Alert,
//   ToastAndroid,
//   Linking,
//   TouchableOpacity,
// } from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Home from './Home';
// import Booking from './Booking';
// import Profile from './Profile';
// import Store from './Store';
// import Call from './Call';

// import CustomTabLabel from './CustomTabLabel';
// import {Bottomtab} from '../../PackersandMovers';
// import {useDispatch, useSelector} from 'react-redux';
// import BottomTab from '../../PackersandMovers/Bottomtab/Bottomtab';
// import {updateBTSwitch} from './Redux/BTSwitch';
// import ComingSoon from './ComingSoon';

// const Tab = createBottomTabNavigator();

// function UBottomtab({navigation}) {
//   const dispatch = useDispatch();
//   const BTSwitch = useSelector(state => state.BTSwitch);

//   const handlePhoneCall = () => {
//     const phoneNumber = '8453748478';
//     const phoneCallURL = `tel:${phoneNumber}`;

//     Linking.openURL(phoneCallURL)
//       .then(() => {
//         console.log('Phone call initiated successfully');
//       })
//       .catch(() => {
//         console.error('Error initiating phone call');
//       });
//   };

//   const useDoubleBackExit = () => {
//     const lastBackPressed = useRef(0);

//     const onBackPress = () => {
//       const currentTime = new Date().getTime();
//       const DOUBLE_PRESS_DELAY = 2000;

//       if (currentTime - lastBackPressed.current < DOUBLE_PRESS_DELAY) {
//         BackHandler.exitApp();
//         return true;
//       }

//       lastBackPressed.current = currentTime;
//       ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
//       return true;
//     };

//     useEffect(() => {
//       BackHandler.addEventListener('hardwareBackPress', onBackPress);

//       return () => {
//         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
//       };
//     }, []);
//   };

//   useDoubleBackExit();

//   useEffect(() => {
//     if (BTSwitch.type === 'PM') {
//       navigation.reset({
//         index: 0,
//         routes: [{name: 'Bottomtab'}],
//       });
//     }
//   }, [BTSwitch.type, navigation]);

//   console.log('BTSwitch type in UBottomtab:', BTSwitch.type);
//   return (
//     <>
//       {BTSwitch.type === 'PM' ? (
//         <BottomTab />
//       ) : (
//         <Tab.Navigator
//           initialRouteName="home"
//           screenOptions={({route}) => ({
//             tabBarActiveTintColor: 'darkred',
//             headerShown: false,
//             tabBarInactiveTintColor: 'grey',
//             tabBarStyle: {
//               position: 'absolute',
//               // backgroundColor: "#f7f7f7",
//               backgroundColor: '#fff',
//               borderTopWidth: 0,
//               elevation: 10,
//               zIndex: 100,
//               bottom: 0,
//               left: 0,
//               right: 0,
//               // borderRadius: 10,
//               height: 60,
//               shadowColor: '#000', // shadow color
//               shadowOffset: {width: 0, height: 2}, // shadow offset (top and bottom)
//               shadowOpacity: 0.45, // shadow opacity
//               shadowRadius: 3.84, // shadow radius
//             },
//             tabBarVisible: route.name !== 'ecommersbottom', // Fix: Use consistent name here
//           })}>
//           <Tab.Screen
//             name="home"
//             component={Home}
//             options={{
//               tabBarLabel: 'Home',
//               tabBarIcon: ({color, size}) => (
//                 <MaterialCommunityIcons name="home" color={color} size={23} />
//               ),
//               tabBarLabelStyle: {
//                 fontWeight: 'bold', // or any other desired font weight
//                 fontSize: 12,
//                 paddingBottom: 8,
//               },
//             }}
//           />
//           <Tab.Screen
//             name="booking"
//             component={Booking}
//             options={{
//               headerShown: true,
//               headerTitle: 'My Booking',
//               headerLeft: () => (
//                 <View
//                   style={{
//                     backgroundColor: 'black',
//                     padding: 7,
//                     borderRadius: 7,
//                     marginLeft: 10,
//                   }}>
//                   <SimpleLineIcons name="handbag" color="white" size={20} />
//                 </View>
//               ),
//               tabBarLabel: 'Bookings',
//               tabBarIcon: ({color, size}) => (
//                 <SimpleLineIcons name="handbag" color={color} size={20} />
//               ),
//               tabBarLabelStyle: {
//                 fontWeight: 'bold', // or any other desired font weight
//                 fontSize: 12,
//                 paddingBottom: 8,
//               },
//             }}
//           />
//           <Tab.Screen
//             name="Exclusive Offer"
//             component={Store}
//             options={{
//               tabBarShowLabel: false, // Hide the tab label
//               headerShown: true,
//               tabBarIcon: null,
//               tabBarLabel: () => <CustomTabLabel />,
//               tabBarIcon: ({color, size}) => (
//                 <FontAwesome5 name="store" color={color} size={18} />
//               ),
//               tabBarLabelStyle: {
//                 fontWeight: 'bold', // or any other desired font weight
//                 fontSize: 12,
//                 paddingBottom: 18,
//               },
//             }}
//           />
//           <Tab.Screen
//             name="Bottomtab "
//             component={Bottomtab}
//             options={{
//               headerShown: true,
//               headerTitle: 'Packers & Movers',
//               tabBarLabel: 'Movers',
//               tabBarIcon: ({color, size}) => (
//                 <TouchableOpacity
//                   onPress={() => {
//                     dispatch(
//                       updateBTSwitch({
//                         type: 'PM',
//                         // Add other properties if needed
//                       }),
//                     );
//                     navigation.navigate('Bottomtab');
//                   }}>
//                   <Image
//                     source={require('../../../assets/moving-truck.gif')}
//                     style={{width: 30, height: 30}}
//                   />
//                 </TouchableOpacity>
//               ),
//               tabBarLabelStyle: {
//                 fontWeight: 'bold', // or any other desired font weight
//                 fontSize: 12,
//                 paddingBottom: 8,
//               },
//             }}
//           />
//           <Tab.Screen
//             name="call"
//             component={Call}
//             options={{
//               tabBarLabel: 'Call',

//               tabBarIcon: ({color, size}) => (
//                 <TouchableOpacity onPress={handlePhoneCall}>
//                   <Image
//                     source={require('../../../assets/call2.gif')}
//                     style={{width: 30, height: 30}}
//                   />
//                 </TouchableOpacity>
//               ),
//               tabBarLabelStyle: {
//                 fontWeight: 'bold', // or any other desired font weight
//                 fontSize: 12,
//                 paddingBottom: 8,
//               },
//             }}
//           />
//         </Tab.Navigator>
//       )}
//     </>
//   );
// }

// export default UBottomtab;

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Home from './Home';

import CustomTabBar from './CustomTabBar';
import {useSelector} from 'react-redux';
import Booking from './Booking';
import Store from './Store';

const Tab = createBottomTabNavigator();

function UBottomtab({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name="booking"
        component={Booking}
        options={{headerShown: false}}
      />
      <Tab.Screen name="XO" component={Store} options={{headerShown: false}} />
    </Tab.Navigator>
  );
}

export default UBottomtab;
