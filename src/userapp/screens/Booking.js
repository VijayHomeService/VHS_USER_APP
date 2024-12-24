import * as React from "react";
import { View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Allorder from "./Allorder";
import Cancelorder from "./Cancelorder";
import Completed from "./Completed";
import Video from "react-native-video";

const renderScene = ({ route, jumpTo, navigation }) => {
  switch (route.key) {
    case "first":
      return <Allorder navigation={navigation} />;
    case "second":
      return <Completed navigation={navigation} />;
  
    case "third":
      return     <Cancelorder navigation={navigation} />;
    default:
      return null;
  }
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "darkred" }}
    style={{ backgroundColor: "white" }}
    renderLabel={({ route, focused, color }) => {
      if (focused) return <Text style={{ color: "darkred" }}>{route.title}</Text>;
      else return <Text style={{ color: "black" }}>{route.title}</Text>;
    }}
  />
);

function Booking() {
  const layout = useWindowDimensions();
  const [isLoading, setIsLoading] = React.useState(true); 
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Upcoming" },
    { key: "second", title: "Completed" },
    { key: "third", title: "Enquiry/Quotation" },
    
  ]);

 

  return (

   

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />


  );
}
export default Booking;