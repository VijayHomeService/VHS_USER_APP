import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  useWindowDimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function Wallet({navigation}) {
  const [User, setUser] = React.useState('');

  React.useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error fetching user data: ', error);
      }
    };

    fetchData();
  }, []);

  const isoDateString = User?.createdAt;

  const date = new Date(isoDateString);

  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const year = date.getFullYear();

  // Pad the day and month with leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  const [wHistorydata, setwHistorydata] = React.useState([]);
  React.useEffect(() => {
    getWalletHistroy();
  }, [User?._id]);

  const getWalletHistroy = async () => {
    let res = await axios.get(
      `https://api.vijayhomesuperadmin.in/api/walletHistorybyid/${User?._id}`,
    );
    if ((res.status = 200)) {
      setwHistorydata(res.data?.data);
    }
  };

  // let a = "04/06/2024";
  // const datw = moment(a, 'DD/MM/YYYY');
  // const formattedDate1 = "04/06/2023"; // Example formattedDate
  // const datw1 = moment(formattedDate, 'DD/MM/YYYY');

  // if (datw.isSameOrAfter(datw1, 'day')) {
  //   // If datw is equal to or greater than datw1
  //   // Your logic goes here
  //   console.log('datw is equal to or greater than datw1');
  // }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/wbg.png')}
        style={styles.backgroundImage}
        resizeMode="cover">
        <View style={styles.cardContainer}>
          <View style={styles.leftContent}>
            <Text style={styles.walletText}>
              <FontAwesome name="rupee" size={20} />
              {User?.wAmount ? parseFloat(User?.wAmount).toFixed(2) : '0.00'}
            </Text>

            <Text style={styles.walletText}>Total Balance</Text>
          </View>
          <View style={styles.rightContent}>
            <Entypo name="wallet" color="white" size={50} />
          </View>
        </View>
      </ImageBackground>

      <ScrollView>
        <View>
          <Text
            style={{
              marginLeft: 12,
              fontSize: 18,
              color: 'black',
              marginTop: 10,
            }}>
            Transctions
          </Text>
        </View>
        {User?.wAmount ? (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
              borderColor: 'black',
              padding: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 0.8,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/greenwallet.jpg')}
                style={{width: 50, height: 50}}
              />
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    marginLeft: 10,
                  }}>
                  For welcome bonus
                </Text>
                <Text style={{fontSize: 14, color: 'grey', marginLeft: 10}}>
                  {formattedDate}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'green',
                  fontSize: 16,
                }}>
                + 2000 Rs
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}

        {wHistorydata?.map(i => (
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'lightgrey',
              borderColor: 'black',
              padding: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 0.7,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {/* Wallet image */}
              <Image
                source={require('../../../assets/greenwallet.jpg')}
                style={{width: 50, height: 50}}
              />
              <View>
                {/* Reason for the transaction */}
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    marginLeft: 10,
                  }}>
                  Service utilize
                </Text>
                {/* Date of the transaction */}
                <Text style={{fontSize: 14, color: 'grey', marginLeft: 10}}>
                  {moment(i.createdAt).format('lll')}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* Amount of money involved in the transaction */}
              <Text
                style={{
                  color: 'red',
                  fontSize: 16,
                }}>
                - {(i?.wAmt).toFixed(2)} Rs
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    margin: 10,
    // borderRadius: 15,
    height: 120,
    overflow: 'hidden',
    borderRadius: 15,
  },
  cardContainer: {
    flexDirection: 'row',
    margin: 10,
    backgroundColor: 'transparent',
    padding: 15,
    height: 120,
    borderRadius: 15,
    overflow: 'hidden',
  },

  leftContent: {
    flex: 1,
    // flexDirection: "row",
    // alignItems: "center",
  },
  rightContent: {
    flex: 0.3,
    alignItems: 'flex-end',
    // justifyContent: "center",
  },
  walletIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  walletText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  balanceText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Wallet;
