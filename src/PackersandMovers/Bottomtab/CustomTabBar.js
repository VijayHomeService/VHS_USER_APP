// import React from 'react';
// import {
//   View,
//   TouchableOpacity,
//   Text,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
// } from 'react-native-reanimated';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const {width} = Dimensions.get('window');
// const TAB_WIDTH = width / 4; // Adjusted for four tabs

// const CustomTabBar = ({state, descriptors, navigation}) => {
//   const animatedValue = useSharedValue(0);

//   const animatedStyle = useAnimatedStyle(() => {
//     const translateX = withTiming(animatedValue.value * TAB_WIDTH, {
//       duration: 250,
//     });
//     return {
//       transform: [{translateX}],
//     };
//   });

//   const handlePress = index => {
//     animatedValue.value = index;
//     const event = navigation.emit({
//       type: 'tabPress',
//       target: state.routes[index].key,
//     });

//     if (!event.defaultPrevented) {
//       navigation.navigate(state.routes[index].name);
//     }
//   };

//   return (
//     <View style={styles.bg}>
//       <View style={styles.tabBar}>
//         <Animated.View style={[styles.highlight, animatedStyle]} />
//         {state.routes.map((route, index) => {
//           const {options} = descriptors[route.key];
//           const isFocused = state.index === index;
//           let iconName, label;

//           switch (route.name) {
//             case 'Home':
//               iconName = 'home';
//               label = 'Home';
//               break;
//             case 'Orders':
//               iconName = 'cart';
//               label = 'Orders';
//               break;
//             case 'Profile':
//               iconName = 'account';
//               label = 'Profile';
//               break;
//             case 'Services':
//               iconName = 'cog'; // Example icon for Services tab
//               label = 'Services';
//               break;
//             default:
//               iconName = 'circle';
//               label = 'Unknown';
//           }

//           // Calculate the icon position based on whether the tab is focused
//           const iconPosition = isFocused ? {} : {};

//           return (
//             <TouchableOpacity
//               key={route.key}
//               onPress={() => handlePress(index)}
//               style={[styles.tab, isFocused && styles.tabActive]}>
//               <View
//                 style={[
//                   styles.iconContainer,
//                   isFocused && styles.activeIconContainer,
//                 ]}>
//                 <MaterialCommunityIcons
//                   name={iconName}
//                   size={25}
//                   color={isFocused ? '#fff' : '#222'}
//                   style={iconPosition} // Apply dynamic style for icon position
//                 />
//               </View>
//               {isFocused && <Text style={styles.label}>{label}</Text>}
//             </TouchableOpacity>
//           );
//         })}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bg: {
//     backgroundColor: 'white',
//   },
//   tabBar: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     height: 60,
//     paddingBottom: 5,
//     margin: 10,
//     borderRadius: 10,
//     position: 'relative',
//     overflow: 'overflow',
//     shadowColor: '#000',
//     shadowOffset: {width: 1, height: 1},
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//   },
//   highlight: {
//     width: TAB_WIDTH / 1.3,
//     height: 0,
//     backgroundColor: '#e91e63',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 10,
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   tabActive: {
//     position: 'relative',
//   },
//   iconContainer: {
//     backgroundColor: 'transparent',
//     borderRadius: 20, // Adjust as needed to match the tabActive borderRadius
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   activeIconContainer: {
//     backgroundColor: '#FF7A00', // Background color for active icon
//     borderRadius: 30, // Adjust as needed to match the tabActive borderRadius
//     width: 40, // Adjust width for the active tab background
//     height: 40, // Adjust height for the active tab background
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: -20, // Adjust position to move icon to top
//   },
//   label: {
//     marginTop: 8,
//     fontSize: 12,
//     color: '#FF7A00',
//     fontFamily: 'Poppins-Medium',
//   },
// });

// export default CustomTabBar;

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {updateBTSwitch} from '../../userapp/screens/Redux/BTSwitch';
import {useDispatch, useSelector} from 'react-redux';

const {width} = Dimensions.get('window');
const TAB_WIDTH = width / 3; // Adjust for the number of tabs

const CustomTabBar = ({state, descriptors, navigation}) => {
  const animatedValue = useSharedValue(0);
  const dispatch = useDispatch();
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(animatedValue.value * TAB_WIDTH, {
      duration: 250,
    });
    return {
      transform: [{translateX}],
    };
  });

  const handlePress = index => {
    animatedValue.value = index;
    const event = navigation.emit({
      type: 'tabPress',
      target: state.routes[index].key,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(state.routes[index].name);
    }
  };

  const handleBackPress = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'tab',
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Ionicons name="arrow-back-circle-outline" size={25} color="black" />
      </TouchableOpacity>
      <View style={styles.tabBar}>
        <Animated.View style={[styles.highlight, animatedStyle]} />
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const isFocused = state.index === index;
          let iconComponent;
          let label;

          switch (route.name) {
            case 'Home':
              iconComponent = (
                <MaterialCommunityIcons
                  name="home"
                  size={18}
                  color={isFocused ? '#e91e63' : '#222'}
                />
              );
              label = 'Home';
              break;
            case 'All orders':
              iconComponent = (
                <MaterialCommunityIcons
                  name="ballot"
                  size={18}
                  color={isFocused ? '#e91e63' : '#222'}
                />
              );
              label = 'Orders';
              break;
            case 'Profile':
              iconComponent = (
                <MaterialCommunityIcons
                  name="account-circle"
                  size={18}
                  color={isFocused ? '#e91e63' : '#222'}
                />
              );
              label = 'Profile';
              break;
            default:
              iconComponent = (
                <MaterialCommunityIcons
                  name="circle"
                  size={25}
                  color={isFocused ? '#e91e63' : '#222'}
                />
              );
              label = route.name;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handlePress(index)}
              style={styles.tab}>
              <View style={styles.iconAndText}>
                {iconComponent}
                <Text style={[styles.label, isFocused && styles.labelFocused]}>
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    elevation: 15,
  },
  backButton: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 43,
    borderRightWidth: 1,
    borderColor: '#f7f2f2c4',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  highlight: {
    width: TAB_WIDTH / 1.6,
    height: 0,
    backgroundColor: '#e91e63',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  iconAndText: {
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    color: '#222',
    marginTop: 4,
    fontFamily: 'NanumGothic-Regular',
  },
  labelFocused: {
    color: '#e91e63',
  },
});

export default CustomTabBar;
