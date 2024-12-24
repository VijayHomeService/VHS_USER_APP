import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const YourComponent = ({navigation, category, subdata, title, color}) => {
  const [showAll, setShowAll] = useState(false);

  // Filter data based on the selected category and sort by numerical order
  const filteredData = subdata
    .filter(item => item.category === category)
    .sort((a, b) => a.order - b.order); // Ensure numerical sorting by `order`

  // Determine how much data to display based on the toggle state
  const displayData = showAll ? filteredData : filteredData.slice(0, 5);

  const renderItem = ({item}) => {
    if (item.type === 'toggle') {
      // Render the Show More / Show Less button
      return (
        <TouchableOpacity
          onPress={() => setShowAll(prev => !prev)}
          style={styles.serviceCard}>
          <View style={[styles.servicesimgrow1, {backgroundColor: '#b0c4de'}]}>
            <Text style={styles.toggleButtonText}>
              {showAll ? 'View Less' : 'View All Services'}
            </Text>
            <Entypo
              name={showAll ? 'chevron-small-up' : 'chevron-small-down'}
              color={'white'}
              size={25}
            />
          </View>
        </TouchableOpacity>
      );
    }

    // Render regular items
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('repairing', {
            cdata: item,
          })
        }
        style={styles.serviceCard}>
        <View
          style={[
            styles.servicesimgrow1,
            category === 'Painting' && {backgroundColor: '#d3f1df'},
          ]}>
          <Image
            source={{
              uri: `https://api.vijayhomesuperadmin.in/subcat/${item.subcatimg}`,
            }}
            style={styles.servicesimg1}
          />
        </View>
        <Text style={styles.servicestext1}>{item.subcategory}</Text>
      </TouchableOpacity>
    );
  };

  // Append the toggle button dynamically
  const dataWithToggle = [
    ...displayData,
    {type: 'toggle'}, // Add a placeholder for the toggle button
  ];

  return (
    <View
      style={[styles.container, {marginTop: category === 'Cleaning' ? 15 : 0}]}>
      <View style={{flexDirection: 'row', gap: 10}}>
        <Text style={styles.homepagetitle}>{category}</Text>
        <Text
          style={{
            backgroundColor: color,
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 3,
            fontSize: 12,
            color: 'black',
            textTransform: 'uppercase',
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 5,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            fontFamily: 'Poppins-Medium',
          }}>
          {title}
        </Text>
      </View>
      <FlatList
        data={dataWithToggle}
        renderItem={renderItem}
        keyExtractor={(item, index) => item._id || `toggle-${index}`}
        numColumns={3} // Display items in rows of 3
        contentContainerStyle={styles.contentContainer}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures full page usage
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  homepagetitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    // marginBottom: 10,
    paddingVertical: 5,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  serviceCard: {
    flex: 1 / 3, // Ensures 1/3 width for each item
    alignItems: 'center',
    marginVertical: 5, // Ensures consistent vertical spacing
  },
  servicesimgrow1: {
    width: 85,
    height: 85,
    borderRadius: 5,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    backgroundColor: '#f0f0f0', // Default background for items
  },
  servicesimg1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5, // Round corners for image
  },
  servicestext1: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: 5,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  toggleButtonText: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: 'white',
    textAlign: 'center',
  },
});

export default YourComponent;
