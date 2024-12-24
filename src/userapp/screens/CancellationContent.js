import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const CancellationContent = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Vijay Home Services Cancellation Policy
        </Text>
        <Text style={styles.subtitle}>
          At Vijay Home Services, we understand that plans can change. Our
          cancellation policy is designed to be fair and transparent for all our
          customers.
        </Text>
        <Text style={styles.sectionTitle}>No Cancellation Charges !!</Text>
        <Text style={styles.sectionText}>
          Before 4 Hours: If you cancel your service more than 4 hours before
          the scheduled slot, there will be no cancellation charges.
        </Text>
        <Text style={styles.sectionTitle}>Cancellation Charges !!</Text>
        <Text style={styles.sectionText}>
          Within 4 Hours to 1 Hour Before Scheduled Slot:
          {"\n"}- Full House Cleaning: ₹500
          {"\n"}- Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹100
          {"\n"}- Home Repair Services: ₹200
          {"\n"}- Appliances Services: ₹200
        </Text>
        <Text style={styles.sectionText}>
          Within 1 Hour and After Scheduled Slot:
          {"\n"}- Full House Cleaning: ₹700
          {"\n"}- Sofa/Kitchen/Bathroom/Mini-Services Cleaning: ₹150
        </Text>
        <Text style={styles.sectionText}>
          We appreciate your understanding and cooperation. Please contact us as
          soon as possible if you need to cancel or reschedule your service to
          avoid any charges.
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default CancellationContent;
