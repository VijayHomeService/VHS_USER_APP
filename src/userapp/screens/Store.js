import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";
import Loader from "./Loader";

function Store({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [exbanner, setSliderImages] = useState([]);
  const [sdata, setsdata] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    spotlightbanner();
    getservices();
  }, []);

  const spotlightbanner = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservicebengaluru.in/api/userapp/getallexbanner"
    );
    if ((res.status = 200)) {
      console.log("res.data?.banner", res.data?.banner);
      setSliderImages(res.data?.banner);
    }
  };
  const getservices = async () => {
    let res = await axios.get(
      "https://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat"
    );
    if (res.status === 200) {
      setsdata(res.data?.subcategory);
    }
  };

  const handlePress = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred while opening the URL:", err)
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView style={{ marginBottom: 80 }}>
          {exbanner.map((i) => (
            <Pressable onPress={() => handlePress(i.Link)}>
              <Image
                source={{
                  uri: `https://api.vijayhomesuperadmin.in/exbanner/${i.banner}`,
                }}
                style={{
                  width: "100%",
                  height: parseInt(i.Height),
                  // resizeMode: "contain",
                  borderRadius: 5,
                  marginTop: 20,
                }}
              />
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // img:{
  //   width:"100%",
  //   height:200
  // }
});
export default Store;
