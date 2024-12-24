import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";

function Enquirydetails() {
  const route = useRoute();
  const { enquirydata } = route.params;
  const [technician, setTechnisian] = useState([]);

  useEffect(() => {
    getalltechnician();
  }, [enquirydata]);

  const handleQuotationLink = () => {
    const quotationLink = `https://vijayhomeservicebengaluru.in/quotations?id=${enquirydata?.EnquiryId}`;
    Linking.openURL(quotationLink);
  };
  const getalltechnician = async () => {
    try {
      const res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/getalltechnician"
      );
      if (res.status === 200) {
        const techdata = res.data?.technician;
        const filteredOrders = res.data?.technician.filter(
          (order) => order._id === enquirydata?.techId
        );

        setTechnisian(filteredOrders);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error fetching service orders: ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          elevation: 3,
          backgroundColor: "white",
          margin: 10,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            backgroundColor: "",
            color: "black",
            padding: 5,
            fontSize: 18,
            fontWeight: "500",
            // marginTop: 20,
          }}
        >
          {enquirydata?.response === "New"
            ? "Thank for enquiry our executive will visit place as per scheduled."
            : " Thanks for enquiry our team will call you shortly to discuss about the service."}
        </Text>
      </View>
      <View
        style={{
          padding: 15,
          elevation: 3,
          backgroundColor: "white",
          margin: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 15, color: "darkred", fontWeight: "700" }}>
          Service details
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <MaterialIcons name="category" size={18} color="black" />
          <Text style={{ marginLeft: 10, color: "grey" }}>
            {enquirydata?.category}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <MaterialIcons name="cleaning-services" size={18} color="black" />
          <Text style={{ marginLeft: 10, color: "grey" }}>
            {enquirydata?.enquirydata[0]?.intrestedfor}
          </Text>
        </View>
      </View>

      <View
        style={{
          padding: 15,
          elevation: 3,
          backgroundColor: "white",
          margin: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 15, color: "darkred", fontWeight: "700" }}>
          Appointment details
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ marginLeft: 10, color: "grey" }}>Appo Date :</Text>
          <Text style={{ marginLeft: 10, color: "grey" }}>
            {enquirydata?.appoDate}
          </Text>
        </View>

        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Text style={{ marginLeft: 10, color: "grey" }}>Appo Time :</Text>
          <Text style={{ marginLeft: 10, color: "grey" }}>
            {enquirydata?.appoTime}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 15,
          elevation: 3,
          backgroundColor: "white",
          margin: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 15, color: "darkred", fontWeight: "700" }}>
          Address
        </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Entypo name="location-pin" size={20} color="black" />
          <Text style={{ marginLeft: 10, color: "grey" }}>
            {enquirydata?.enquirydata[0]?.address}
          </Text>
        </View>
      </View>

      {technician.length > 0 ? (
        <View
          style={{
            padding: 15,
            elevation: 3,
            backgroundColor: "white",
            margin: 10,
            borderRadius: 5,
          }}
        >
          <View style={{}}>
            <Text style={{ fontSize: 15, color: "darkred", fontWeight: "700" }}>
              Executive
            </Text>

            <Text style={{ color: "grey" }}>{technician[0]?.vhsname}</Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      <TouchableOpacity
        onPress={handleQuotationLink}
        style={{
          padding: 15,
          elevation: 3,
          backgroundColor: "white",
          margin: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ fontSize: 15, color: "darkred", fontWeight: "700" }}>
          Quotation
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Enquirydetails;
