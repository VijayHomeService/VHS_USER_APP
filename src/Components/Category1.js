import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const Category1 = ({navigation, category, subdata, title, color}) => {
  // Filter data based on the selected category and sort by numerical order
  const filteredData = subdata
    .filter(item => item.category === category)
    .sort((a, b) => a.order - b.order); // Ensure numerical sorting by `order`

  const renderItem = ({item}) => (
    <TouchableOpacity
      key={item._id}
      onPress={() =>
        navigation.navigate('repairing', {
          cdata: item,
        })
      }
      style={styles.itemContainer}>
      <View style={styles.servicesimgrow1}>
        <Image
          source={{
            uri: `https://api.vijayhomesuperadmin.in/subcat/${item.subcatimg}`,
          }}
          style={styles.servicesimg1}
        />
      </View>
      <Text style={styles.servicestext1}>
        {item.subcategory || 'Subcategory'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
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
          data={filteredData} // Filtered data
          renderItem={renderItem} // Render each item
          keyExtractor={(item, index) => item._id || index.toString()} // Unique key
          horizontal // Make it a horizontal scroll list
          showsHorizontalScrollIndicator={false} // Hide scroll indicator
          contentContainerStyle={{paddingHorizontal: 10}} // Add padding to the list
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    margin: 20,
  },
  homepagetitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',

    paddingVertical: 5,
  },
  itemContainer: {
    alignItems: 'center', // Center align the content
    marginRight: 10, // Add spacing between items
    width: 90, // Ensure a fixed width for proper alignment
    marginTop: 10, // Add spacing between items
  },
  servicesimgrow1: {
    width: 80,
    height: 80,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  servicesimg1: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  servicestext1: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
    color: 'black',
    width: 80, // Ensure the text wraps within this width
    fontFamily: 'Poppins-Medium',
    flexWrap: 'wrap', // Allow the text to wrap to the next line
  },
});

export default Category1;
