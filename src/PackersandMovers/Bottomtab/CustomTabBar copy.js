import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const TAB_WIDTH = width / 4; // Adjusted for four tabs

const CustomTabBar = ({state, descriptors, navigation}) => {
  const animatedValue = useSharedValue(0);

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

  return (
    <View style={styles.tabBar}>
      <Animated.View style={[styles.highlight, animatedStyle]} />
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Orders':
            iconName = 'cart';
            break;
          case 'Profile':
            iconName = 'account';
            break;
          case 'Services':
            iconName = 'cog'; // Example icon for Services tab
            break;

          default:
            iconName = 'circle';
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => handlePress(index)}
            style={styles.tab}>
            <MaterialCommunityIcons
              name={iconName}
              size={30}
              color={isFocused ? '#e91e63' : '#222'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 70,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  highlight: {
    width: TAB_WIDTH / 1.3,
    height: 4,
    backgroundColor: '#e91e63',
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
});

export default CustomTabBar;
