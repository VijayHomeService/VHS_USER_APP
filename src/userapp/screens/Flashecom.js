import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image as RneImage } from "react-native-elements";

const Splashscreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("ecommersbottomtab");
    }, 1000);
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            position: "absolute",
            zIndex: 11,
            color: "black",
            fontWeight: "bold",
            fontSize: 24,

            flex: 1,
          }}
        >
          Vijaya Home Services
        </Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
  },
});
export default Splashscreen;
