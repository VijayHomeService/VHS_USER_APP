import * as React from 'react';
import {View, Text, useWindowDimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Orders from './Orders';
import Enquiry from './Enquiry';
import BookingHistory from './BookingHistory';

const FirstRoute = () => (
  <View style={styles.firstRoute}>
    <Orders />
  </View>
);

const SecondRoute = () => (
  <View style={styles.secondRoute}>
    <Enquiry />
  </View>
);
const ThirdRoute = () => (
  <View style={styles.secondRoute}>
    <BookingHistory />
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

const renderTabBar = props => (
  <TabBar
    {...props}
    style={styles.tabBar}
    indicatorStyle={styles.indicator}
    labelStyle={styles.label}
  />
);

export default function OrderTab() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Ongoing'},
    {key: 'second', title: 'Quotation'},
    {key: 'third', title: ' History'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  firstRoute: {
    flex: 1,
    backgroundColor: '#ff4081',
  },
  secondRoute: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabBar: {
    backgroundColor: 'orange', // Background color of the tab bar
  },
  indicator: {
    backgroundColor: 'red', // Color of the tab indicator
  },
  label: {
    color: 'black', // Color of the tab labels
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
  },
});
