import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

function Refundpolicy() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.height}>
          <Text style={styles.header}>
            Refund/cancellation policies applicable in the following conditions
          </Text>
          <Text style={styles.title}>
            1.In case, the customer cancels the order online before the product
            has been shipped, the entire order amount will be refunded
          </Text>

          <Text style={styles.title}>
            2.In case the customer ordered online and still, has not been
            confirmed the date customer can cancel the order and the order
            amount will be refunded.
          </Text>
          <Text style={styles.title}>
            3.However, the order once delivered cannot be cancelled in any case
          </Text>
          <Text style={styles.title}>
            4.In case of failed transactions or double realization of account
            for the same order, the total deducted amount will be refunded
          </Text>
          <Text style={styles.title}>
            5.In case of cancelled order/failed transactions, the bank/card
            transaction charges of the customer, if any, is likely to be
            forfeited
          </Text>
          <Text style={styles.title}>
            6.Vijayhomeservices offers no guarantees whatsoever for the accuracy
            or timeliness of the refunds in the buyers card/account
          </Text>
          <Text style={styles.title}>
            7.In case of part cancellations, the amount refunded will be
            corresponding to the part cancellation
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    // minHeight: "100%",
    maxWidth: "100%",

    flex: 1,
  },
  height: {
    marginTop: 20,
    margin: 10,
  },
  header: {
    fontWeight: "bold",
    color: "black",
  },
  title: {
    // textAlign: "justify",
    color: "grey",
  },
});
export default Refundpolicy;
