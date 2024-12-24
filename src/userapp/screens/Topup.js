import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';


const ListTab = [
  {
    status: '₹100',
  },
  {
    status: '₹200',
  },
  {
    status: '₹300',
  },
  {
    status: '₹400',
  },
  {
    status: '₹500',
  },
];

function Topup() {
  const [status, setStatus] = useState('All');
  const setStatusFilter = status => {
    setStatus(status);
  };
  return (
    <View style={styles.container}>
      <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
        Top Up Your Wallet
      </Text>

      <TextInput placeholder="Enter Amount" style={styles.textinput} />
      <Text style={{color: 'black', fontSize: 14, marginTop: 20}}>
        Or select toop up amount
      </Text>

      <View style={styles.listTab}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {ListTab.map(e => (
            <TouchableOpacity
              style={[
                styles.btnTab,
                status === e.status && styles.btnTabActive,
              ]}
              onPress={() => setStatusFilter(e.status)}>
              <Text
                style={[
                  styles.textTab,
                  status === e.status && styles.textTabActive,
                ]}>
                {e.status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.button}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Top Up Wallet
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  textinput: {
    backgroundColor: '#eee',
    width: '100%',
    fontSize: 14,
    marginTop: 20,
    borderRadius: 5,
  },
  listTab: {
    // flex: 1,
    // backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 20,
  },
  btnTab: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    borderRadius: 20,
    marginRight: 10,
    width: 80,
    justifyContent: 'center',
    // width: Dimensions.get('window').width / 3.5,
  },
  textTab: {
    fontSize: 10,
    color: 'black',
    // fontWeight: 'bold',
  },
  btnTabActive: {
    backgroundColor: 'red',
    borderWidth: 0,
  },
  textTabActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
});
export default Topup;
