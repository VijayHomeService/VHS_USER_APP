import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToPMCart,
  deletePMCartItems,
  removePMCartItems,
} from '../../userapp/screens/Redux/Items';
import {getData} from '../../ApiServices/ApiServices';
import {ApiUrl} from '../../ApiServices/ApiUrl';

const Step2 = () => {
  const [activeCategory, setActiveCategory] = useState('Living room');
  const [activeLivItem, setActiveLivItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query
  const [categoryData, setCategoryData] = useState([]);
  const [itemsData, setItemsData] = useState([]);

  const dispatch = useDispatch();
  const MyCartItems = useSelector(state => state.Items);
  const scrollViewRef = useRef(null);
  const mainScrollViewRef = useRef(null); // Ref for the main ScrollView

  const calculateQty = () => {
    return MyCartItems.reduce((total, item) => {
      return total + (item.qty || 0); // Sum up the qty of each item, default to 0 if qty is not defined
    }, 0);
  };
  const totalItems = calculateQty();

  useEffect(() => {
    getCategories();
    getItems();
  }, []);

  const getCategories = async () => {
    try {
      const response = await getData(ApiUrl.GETCATEGORY);
      if (response.status === 200) {
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error('Error getting categories:', error);
    }
  };

  const getItems = async () => {
    try {
      const response = await getData(ApiUrl.GETITEMS);
      if (response.status === 200) {
        setItemsData(response.data);
      }
    } catch (error) {
      console.error('Error getting Items:', error);
    }
  };

  const showLivingItem = item => {
    setActiveLivItem(prevActiveItem => (prevActiveItem === item ? null : item));
  };

  const handleAddToCart = (item, category, subcategory) => {
    dispatch(
      addToPMCart({
        id: item._id,
        category: category,
        subcategory: subcategory,
        itemname: item.itemname,
        offerPrice: item.offerPrice,
        volume: item.volume,
        weight: item.weight,
        packingPrice: item.packingPrice,
        qty: 1,
      }),
    );
  };

  const filteredItems = itemsData.filter(item =>
    item.itemname.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    const {
      category,
      subcategory,
      _id,
      itemname,
      offerPrice,
      volume,
      weight,
      packingPrice,
    } = item;

    if (!acc[category]) {
      acc[category] = {};
    }

    if (!acc[category][subcategory]) {
      acc[category][subcategory] = [];
    }

    acc[category][subcategory].push({
      _id,
      itemname,
      offerPrice,
      volume,
      weight,
      packingPrice,
    });

    return acc;
  }, {});

  const handleCategoryPress = (category, index) => {
    setActiveCategory(category);

    // Scroll to the selected category's section
    const yOffset = index * 200; // Adjust 200 to your section height
    mainScrollViewRef.current?.scrollTo({y: yOffset, animated: true});
  };
  const handle = item => {
    dispatch(addToPMCart(item));
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={24} color="grey" style={styles.icon} />
        <TextInput
          placeholder="Search..."
          style={styles.input}
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.categoryContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {totalItems ? ( // Conditional rendering: Only show if totalItems exists
            <>
              <TouchableOpacity
                onPress={() => handleCategoryPress('Added Items')}
                style={[
                  styles.categoryButton,
                  {
                    backgroundColor:
                      activeCategory === 'Added Items'
                        ? '#FF8343'
                        : 'transparent',
                    borderWidth: 1,
                    borderColor: 'lightgrey',
                    borderRadius: 25,
                    padding: 7,
                  },
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    {
                      color:
                        activeCategory === 'Added Items' ? 'white' : 'black',
                    },
                  ]}>
                  {/* Display totalItems in parentheses */}
                  Added Items {totalItems ? `(${totalItems})` : ''}
                </Text>
              </TouchableOpacity>
              <Text
                style={{
                  borderRightWidth: 2,
                  marginLeft: 5,
                  borderColor: 'grey',
                }}
              />
            </>
          ) : null}

          {categoryData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCategoryPress(item.category, index)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor:
                    activeCategory === item.category
                      ? '#FF8343'
                      : 'transparent',
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  borderRadius: 25,
                  padding: 7,
                },
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  {color: activeCategory === item.category ? 'white' : 'black'},
                ]}>
                {item.category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {activeCategory === 'Added Items' ? (
        <ScrollView>
          {MyCartItems.map(item => (
            <View key={item._id} style={styles.subTextView}>
              {/* Render Minus Button, Quantity Text, and Plus Button for Each Item */}
              <View style={{flex: 0.7}}>
                <Text style={styles.subText}>{item.itemname}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 15,
                  backgroundColor: 'green',
                  padding: 3,
                  borderRadius: 5,
                  borderColor: 'green',
                  borderWidth: 1,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (item.qty > 1) {
                      dispatch(removePMCartItems(item));
                    } else {
                      dispatch(deletePMCartItems(item.id));
                    }
                  }}
                  style={styles.button}>
                  <AntDesign name="minus" size={18} color="white" />
                </TouchableOpacity>

                <Text style={[styles.qty, {color: 'white'}]}>{item.qty}</Text>

                <TouchableOpacity
                  onPress={() => handle(item)}
                  style={styles.button}>
                  <AntDesign name="plus" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView ref={mainScrollViewRef}>
          {Object.entries(groupedItems).map(
            ([category, subcategories], catIndex) => (
              <View key={catIndex} style={styles.categorySection}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.sectionTitle}>{category}</Text>
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      fontSize: 11,
                    }}>
                    {MyCartItems.reduce((total, item) => {
                      if (item.category === category) {
                        return total + item.qty;
                      }
                      return total;
                    }, 0) > 0
                      ? `${MyCartItems.reduce((total, item) => {
                          if (item.category === category) {
                            return total + item.qty;
                          }
                          return total;
                        }, 0)} items added`
                      : ''}
                  </Text>
                </View>
                {Object.entries(subcategories).map(
                  ([subcategory, items], subIndex) => (
                    <View key={subIndex}>
                      <TouchableOpacity
                        style={styles.subTextView}
                        onPress={() => showLivingItem(subcategory)}>
                        <Text
                          style={[
                            styles.subText,
                            {
                              color:
                                activeLivItem === subcategory
                                  ? '#ff8c00'
                                  : '#353535',
                            },
                          ]}>
                          {subcategory}
                        </Text>
                        <Ionicons
                          name="chevron-down"
                          size={14}
                          style={{
                            color:
                              activeLivItem === subcategory
                                ? '#ff8c00'
                                : '#353535',
                          }}
                        />
                      </TouchableOpacity>
                      {activeLivItem === subcategory && (
                        <>
                          {items.map((item, itemIndex) => (
                            <View
                              key={itemIndex}
                              style={{
                                backgroundColor: '#f9f9f9',
                                borderTopColor: '#ebebeb',
                                borderTopWidth: 1,
                              }}>
                              <View style={styles.subTextView}>
                                <Text style={[styles.subText, {flex: 0.8}]}>
                                  {item.itemname}
                                </Text>
                                <View>
                                  {MyCartItems.find(i => i.id === item._id) ? (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        gap: 15,
                                        backgroundColor: 'green',
                                        padding: 5,
                                        borderRadius: 3,
                                      }}>
                                      <TouchableOpacity
                                        onPress={() => {
                                          const cartItem = MyCartItems.find(
                                            i => i.id === item._id,
                                          );
                                          if (cartItem.qty > 1) {
                                            dispatch(
                                              removePMCartItems(cartItem),
                                            );
                                          } else {
                                            dispatch(
                                              deletePMCartItems(cartItem.id),
                                            );
                                          }
                                        }}>
                                        <AntDesign
                                          name="minus"
                                          size={18}
                                          color="white"
                                        />
                                      </TouchableOpacity>
                                      <Text style={styles.qty}>
                                        {
                                          MyCartItems.find(
                                            i => i.id === item._id,
                                          )?.qty
                                        }
                                      </Text>
                                      <TouchableOpacity
                                        onPress={() =>
                                          handleAddToCart(
                                            item,
                                            category,
                                            subcategory,
                                          )
                                        }>
                                        <AntDesign
                                          name="plus"
                                          size={18}
                                          color="white"
                                        />
                                      </TouchableOpacity>
                                    </View>
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleAddToCart(
                                          item,
                                          category,
                                          subcategory,
                                        )
                                      }
                                      style={{
                                        borderWidth: 1,
                                        backgroundColor: 'white',
                                        paddingHorizontal: 15,
                                        borderRadius: 3,
                                        borderColor: 'green',
                                      }}>
                                      {/* <AntDesign
                               name="plus"
                               size={20}
                               color="green"
                             /> */}
                                      <Text
                                        style={{
                                          fontFamily: 'Poppins-Medium',
                                          color: 'green',
                                        }}>
                                        Add
                                      </Text>
                                    </TouchableOpacity>
                                  )}
                                </View>
                              </View>
                            </View>
                          ))}
                        </>
                      )}
                      <View style={styles.subTextBorder}></View>
                    </View>
                  ),
                )}
              </View>
            ),
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: '#f6f7f7',
    borderRadius: 15,
    width: '100%',
    gap: 10,
  },
  categoryButton: {
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    // width: 80,
    textAlign: 'center',
  },
  categorySection: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ebebeb',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 14,
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
    fontFamily: 'Poppins-Medium',
    color: 'black',
    padding: 10,
  },
  subTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  subText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#353535',
  },
  subTextBorder: {
    borderBottomColor: '#ebebeb',
    borderBottomWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f7f7',
    borderRadius: 8,
    paddingHorizontal: 10,
    // marginTop: 20,
    margin: 5,
  },
  icon: {
    marginRight: 10,
  },
  qty: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default Step2;
