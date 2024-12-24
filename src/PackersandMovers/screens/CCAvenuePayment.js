import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';

const CCAvenuePayment = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [encRequest, setEncRequest] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    // Optional: Generate a unique order ID here if needed
  }, []);

  const initiatePayment = async () => {
    if (!orderId || !amount) {
      Alert.alert('Error', 'Please enter Order ID and Amount');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.vijayhomeservicebengaluru.in/api/payment/paymentccavenue',
        {orderId, amount},
      );

      setPaymentUrl(response.data.url);
      setEncRequest(response.data.encRequest);
      setAccessCode(response.data.accessCode);
    } catch (error) {
      console.error('Error initiating payment:', error);
      Alert.alert('Error', 'Failed to initiate payment');
      setLoading(false);
    }
  };

  const handleResponse = async url => {
    try {
      const encResp = extractEncResp(url);
      const response = await axios.post(
        'http://192.168.1.100:8500/api/payment/responsepayment',
        {encResp},
      );

      const result = response.data;
      if (result.order_status === 'Success') {
        Alert.alert('Success', 'Payment was successful');
      } else {
        Alert.alert('Failure', 'Payment failed');
      }
      navigation.goBack();
    } catch (error) {
      console.error('Error handling response:', error);
      Alert.alert('Error', 'Failed to handle payment response');
    }
  };

  const extractEncResp = url => {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('encResp');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
        />
      ) : (
        <View>
          <Text>Order ID:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Order ID"
            value={orderId}
            onChangeText={setOrderId}
          />
          <Text>Amount:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <Button title="Pay Now" onPress={initiatePayment} />
        </View>
      )}
      {paymentUrl && (
        <WebView
          source={{
            uri: paymentUrl,
            method: 'POST',
            body: `encRequest=${encRequest}&access_code=${accessCode}`,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          }}
          onNavigationStateChange={navState => {
            if (navState.url.includes('YOUR_REDIRECT_URL')) {
              handleResponse(navState.url);
            }
            if (navState.url.includes('YOUR_CANCEL_URL')) {
              Alert.alert(
                'Payment Cancelled',
                'The payment has been cancelled',
              );
              navigation.goBack();
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CCAvenuePayment;
