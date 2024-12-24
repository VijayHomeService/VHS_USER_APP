import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import RBSheet from 'react-native-raw-bottom-sheet';

const windowWidth = Dimensions.get('window').width;
const boxWidth = (windowWidth - 30 - 10) / 2; // Subtracting margins and gap

export default function Category({navigation}) {
  const refRBSheet = useRef();
  return (
    <View style={styles.container}>
      {/* <View style={styles.boxmain}>
        <TouchableOpacity
          style={[styles.box, {width: boxWidth}]}
          onPress={() => refRBSheet.current.open()}>
          <Image
            source={require('../../../assets/s1.jpg')}
            style={styles.img}
          />
          <Text style={styles.head}>Trucks</Text>
          <View style={styles.dir}>
            <Text style={styles.subhead}>
              Full fiedged house shifting sevice
            </Text>
            <Feather name="arrow-right-circle" size={22} color={'grey'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, {width: boxWidth}]}
          onPress={() => refRBSheet.current.open()}>
          <Image
            source={require('../../../assets/s2.jpg')}
            style={styles.img}
          />
          <Text style={styles.head}>2 Wheeler</Text>
          <View style={styles.dir}>
            <Text style={styles.subhead}>For shifting a few small items</Text>
            <Feather
              name="arrow-right-circle"
              size={22}
              color={'grey'}
              style={{}}
            />
          </View>
        </TouchableOpacity>
      </View> */}
      <View style={styles.boxmain}>
        <TouchableOpacity
          style={[styles.box, {width: boxWidth}]}
          onPress={() => refRBSheet.current.open()}>
          <View style={styles.dir}>
            <Text style={styles.head}>Trucks</Text>
            <Feather name="chevron-right" size={20} color={'grey'} />
          </View>
          <Image
            source={require('../../../assets/s1.jpg')}
            style={styles.img}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, {width: boxWidth}]}
          onPress={() => refRBSheet.current.open()}>
          <Image
            source={require('../../../assets/s2.jpg')}
            style={styles.img}
          />
          <Text style={styles.head}>2 Wheeler</Text>
          <View style={styles.dir}>
            <Text style={styles.subhead}>For shifting a few small items</Text>
            <Feather
              name="arrow-right-circle"
              size={22}
              color={'grey'}
              style={{}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.boxmain}>
        <TouchableOpacity
          style={[styles.box, {width: boxWidth}]}
          onPress={() => navigation.navigate('Servicedetails')}>
          <Image
            source={require('../../../assets/s1.jpg')}
            style={styles.img}
          />
          <Text style={styles.head}>PACKERS AND MOVERS</Text>
          <View style={styles.dir}>
            <Text style={styles.subhead}>
              Full fiedged house shifting sevice
            </Text>
            <Feather name="arrow-right-circle" size={22} color={'grey'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, {width: boxWidth}]}
          onPress={() => navigation.navigate('Servicedetails')}>
          <Image
            source={require('../../../assets/s2.jpg')}
            style={styles.img}
          />
          <Text style={styles.head}>Vehicle Movers</Text>
          <View style={styles.dir}>
            <Text style={styles.subhead}>For shifting a few small items</Text>
            <Feather
              name="arrow-right-circle"
              size={22}
              color={'grey'}
              style={{}}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}>
          <View style={{padding: 20}}>
            <View>
              <Text>Choose your service</Text>
            </View>
            <View style={styles.trucks}>
              <Image
                source={require('../../../assets/s3.jpg')}
                style={{width: 100, height: 40}}
              />
              <Text style={{fontFamily: 'Poppins-Medium'}}>Local</Text>
              <Entypo name="chevron-small-right" size={18} color={'grey'} />
            </View>
            <View style={styles.trucks}>
              <Image
                source={require('../../../assets/s3.jpg')}
                style={{width: 100, height: 40}}
              />
              <Text style={{fontFamily: 'Poppins-Medium'}}>Outstation</Text>
              <Entypo name="chevron-small-right" size={18} color={'grey'} />
            </View>
            <View style={styles.trucks}>
              <Image
                source={require('../../../assets/s3.jpg')}
                style={{width: 100, height: 40}}
              />
              <Text style={{fontFamily: 'Poppins-Medium'}}>Rentals</Text>
              <Entypo name="chevron-small-right" size={18} color={'grey'} />
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  dir: {
    flexDirection: 'row',
    // flex: 1,
    justifyContent: 'space-between',
  },
  boxmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  box: {
    height: 200,
    backgroundColor: 'white',

    padding: 10,
    borderRadius: 10,
  },
  head: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: 'black',
    // marginTop: 40,
  },
  subhead: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    flex: 0.9,
    color: 'black',
  },
  img: {
    width: '100%',
    height: 80,
  },
  trucks: {
    flexDirection: 'row',
    backgroundColor: '#eeeeee7d',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'space-around',
  },
});
