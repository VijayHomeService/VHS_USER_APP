import * as React from 'react';
import {View, useWindowDimensions, Text} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Allorder from './Allorder';
import Cancelorder from './Cancelorder';

const renderScene = ({route, jumpTo}) => {
  switch (route.key) {
    case 'first':
      return <Allorder jumpTo={jumpTo} />;
    case 'second':
      return <Completed jumpTo={jumpTo} />;
      case 'third':
        return <Cancelorder jumpTo={jumpTo} />;
    default:
      return null;
  }
};

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{backgroundColor: 'red'}}
    style={{backgroundColor: 'white'}}
    renderLabel={({route, focused, color}) => {
      if (focused) return <Text style={{color: 'red'}}>{route.title}</Text>;
      else return <Text>{route.title}</Text>;
    }}
  />
);

function Mybooking() {
  const layout = useWindowDimensions();
const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'All Orders'},
    {key: 'second', title: 'Cancelled'},
    {key: 'third', title: 'Enquiry/Quotation'},
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
export default Mybooking;
