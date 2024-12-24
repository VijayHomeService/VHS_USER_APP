import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';

function History() {
  const [User, setUser] = useState("")

  useEffect(() => {
    // Fetch user data from AsyncStorage and parse it
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
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
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderBottomWidth: 1,
            borderBottomColor:"lightgrey",
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
              source={require('../assets/greenwallet.jpg')}
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
              + 500 Rs
            </Text>
          </View>
        </View>

  
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default History;
