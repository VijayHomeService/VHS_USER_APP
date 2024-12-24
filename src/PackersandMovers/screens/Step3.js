import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';

export default function Step3({
  singleLayer,
  multilayer,
  unpacking,
  dismantling,
  singleLayerSwitch,
  multilayerSwitch,
  unpackingSwitch,
  dismantlingSwitch,
  fare,
  selectedVehicle,
  GrandTotal,
}) {
  const [showMore, setShowMore] = useState(false);

  const MyCartItems = useSelector(state => state.Items);

  const calculateTotal = () => {
    return MyCartItems.reduce((total, item) => {
      // Ensure the item has both qty and offerPrice before calculation
      const itemTotal =
        item.qty && item.offerPrice ? item.qty * item.offerPrice : 0;
      return total + itemTotal;
    }, 0);
  };
  const calculatePackingPrice = () => {
    return MyCartItems.reduce((total, item) => {
      // Ensure the item has both qty and offerPrice before calculation
      const itemTotal =
        item.qty && item.packingPrice ? item.qty * item.packingPrice : 0;
      return total + itemTotal;
    }, 0);
  };
  const packingAmt = calculatePackingPrice();
  const totalAmount = calculateTotal() + selectedVehicle?.basePrice;

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{margin: 10}}>
        <View
          style={[
            styles.header,
            {
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
              paddingBottom: 5,
            },
          ]}>
          <Text style={styles.head}>Base price</Text>
          <Text style={styles.price}>
            <FontAwesome5 name="rupee-sign" /> {GrandTotal.toFixed(0)}
          </Text>
        </View>

        <View style={{margin: 2, marginTop: 10}}>
          <View style={styles.flex}>
            <AntDesign
              name="checkcircle"
              color="green"
              style={{marginTop: 5}}
            />
            <Text style={styles.txt}>Friendly and professional movers</Text>
          </View>
          <View style={styles.flex}>
            <AntDesign
              name="checkcircle"
              color="green"
              style={{marginTop: 5}}
            />
            <Text style={styles.txt}>Loading and unloading included</Text>
          </View>

          {showMore && (
            <>
              <View style={styles.flex}>
                <AntDesign
                  name="checkcircle"
                  color="green"
                  style={{marginTop: 5}}
                />
                <Text style={styles.txt}>
                  Transport items safely with a dedicated vehicle
                </Text>
              </View>
              <View style={styles.flex}>
                <AntDesign
                  name="checkcircle"
                  color="green"
                  style={{marginTop: 5}}
                />
                <Text style={styles.txt}>Rearrangement of big items</Text>
              </View>
            </>
          )}

          <TouchableOpacity onPress={handleToggle}>
            <Text style={styles.more}>
              {showMore ? 'View less' : 'View more'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <Text style={[styles.head, {marginTop: 20}]}>
            Recommended add ons for you
          </Text>
        </View>
        <View style={styles.rao}>
          <View>
            <Text style={styles.recomhead}>Single-layer packing </Text>
            <Text style={styles.price}>
              <FontAwesome5 name="rupee-sign" /> {packingAmt}
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              thumbColor={singleLayer ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={singleLayerSwitch}
              value={singleLayer}
            />
          </View>
        </View>

        <View style={styles.rao}>
          <View>
            <Text style={styles.recomhead}>Multi-layer packing </Text>
            <Text style={styles.price}>
              <FontAwesome5 name="rupee-sign" /> {packingAmt * 2}
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              thumbColor={multilayer ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={multilayerSwitch}
              value={multilayer}
            />
          </View>
        </View>
        <View style={styles.rao}>
          <View>
            <Text style={styles.recomhead}>
              Unpacking all the packed items{' '}
            </Text>
            <Text style={styles.price}>
              <FontAwesome5 name="rupee-sign" />
              {packingAmt}
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              thumbColor={unpacking ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={unpackingSwitch}
              value={unpacking}
            />
          </View>
        </View>
        <View style={styles.rao}>
          <View>
            <Text style={styles.recomhead}>
              Dismantling and reassembly of basic
            </Text>
            <Text style={styles.price}>
              <FontAwesome5 name="rupee-sign" /> {packingAmt}
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              thumbColor={dismantling ? 'white' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={dismantlingSwitch}
              value={dismantling}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: '#127f4c',
          flexDirection: 'row',
          padding: 5,
          position: 'absolute',
          bottom: 10,
          width: '100%',
        }}>
        <Feather name="info" color={'white'} size={17} />
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            marginLeft: 10,
            fontFamily: 'Poppins-Light',
          }}>
          Pay booking amount of 99 to place the order
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  head: {
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
  price: {
    fontFamily: 'Poppins-Regular',
    color: 'black',
    fontSize: 12,
    // flex: 0.2,
  },
  rao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    paddingBottom: 15,
  },
  recomhead: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'black',
    // flex: 0.8,
  },
  flex: {
    flexDirection: 'row',
    gap: 5,
    padding: 5,
  },
  txt: {
    fontFamily: 'Poppins-Regular',
    color: 'grey',
    fontSize: 12,
  },
  more: {
    marginTop: 10,
    color: '#FF8343',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
});
