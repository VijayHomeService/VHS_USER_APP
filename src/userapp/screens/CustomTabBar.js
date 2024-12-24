import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
  Linking,
  Pressable,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {updateBTSwitch} from '../../userapp/screens/Redux/BTSwitch';
import {useDispatch, useSelector} from 'react-redux';
import {Image} from 'react-native';

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
  const BTSwitch = useSelector(state => state.BTSwitch);

  const handleBackPress = () => {
    dispatch(
      updateBTSwitch({
        type: 'user',
      }),
    );
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Bottomtab',
        },
      ],
    });
  };
  const handlePhoneCall = () => {
    const phoneNumber = '8453748478';
    const phoneCallURL = `tel:${phoneNumber}`;

    Linking.openURL(phoneCallURL)
      .then(() => {
        console.log('Phone call initiated successfully');
      })
      .catch(() => {
        console.error('Error initiating phone call');
      });
  };

  return (
    <View style={styles.container}>
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
                  size={25}
                  color={isFocused ? '#e91e63' : '#222'}
                />
              );
              label = 'Home';
              break;
            case 'booking':
              iconComponent = (
                <SimpleLineIcons
                  name="handbag"
                  size={23}
                  color={isFocused ? '#e91e63' : '#222'}
                />
              );
              label = 'Booking';
              break;
            case 'XO':
              iconComponent = (
                <Fontisto
                  name="shopping-sale"
                  size={23}
                  color={isFocused ? '#e91e63' : '#222'}
                />
                // <Image
                //   source={require('../../../assets/Images/sale.png')}
                //   style={{
                //     width: 25,
                //     height: 22,
                //     resizeMode: 'contain',
                //     borderRadius: 30,
                //   }}
                // />
              );
              label = (
                <Text>
                  <Text style={styles.labelX}>X</Text>
                  <Text style={styles.labelO}>O</Text>
                </Text>
              );
              break;
            // default:
            //   iconComponent = (
            //     <MaterialCommunityIcons
            //       name="circle"
            //       size={25}
            //       color={isFocused ? '#e91e63' : '#222'}
            //     />
            //   );
            //   label = route.name;
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
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <Image
          source={require('../../../assets/moving-truck.gif')}
          style={{width: 30, height: 25}}
        />
        <Text style={styles.label}>Movers</Text>
      </Pressable>
      <Pressable onPress={handlePhoneCall} style={styles.backButton}>
        <Image
          source={require('../../../assets/call2.gif')}
          style={{width: 30, height: 25}}
        />
        <Text style={styles.label}>Call</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    elevation: 15,
  },
  backButton: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 58,
    backgroundColor: 'white',
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
    fontSize: 11,
    color: '#222',
    marginTop: 4,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  labelFocused: {
    color: '#e91e63',
  },
  labelX: {
    color: 'red',
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
  },
  labelO: {
    color: 'blue',
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
  },
});

export default CustomTabBar;
