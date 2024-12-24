import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';

function Delete({navigation}) {
  // const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   setInterval(() => {
  //     setVisible(visible);
  //   }, 2000);
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('delete');
    }, 5000);
  }, []);

  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          marginTop: '50%',
          marginLeft: '50%',
          marginRight: '50%',
          zIndex: 1,
        }}>
        <Bubbles size={6} color="blue" style={{textAlign: 'center'}} />
      </View>
      <View style={styles.container}>
        <View style={styles.container1}>
          {/* <Spinner visible={!isLoading} /> */}
          {/* <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        /> */}
          <View style={{margin: 20}}>
            <TextInput
              style={styles.textinput}
              placeholder="Vijay Home Services"
              editable={false}
            />

            <TextInput
              style={styles.textinput}
              placeholder="9345678855"
              editable={false}
            />

            <TextInput
              style={styles.textinput}
              multiline={true}
              numberOfLines={6}
              placeholder="Reason For Deletion"
            />
          </View>
          <View style={styles.button}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              Request Deletion
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    minHeight: '100%',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  container1: {
    flex: 1,
    minHeight: '100%',
    margin: 10,
  },
  textinput: {
    backgroundColor: '#eee',
    width: '100%',
    fontSize: 16,
    marginTop: 20,
    paddingLeft: 10,
    borderRadius: 5,
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
export default Delete;

// import React from 'react';
// import React, {useState} from 'react';
// import {Modal, TouchableOpacity, View, Text, Animated} from 'react-native';

// function Delete() {
//   const [isModalVisible, setIsModalVisible] = useState(false);

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };
//   const animatedOpacity = new Animated.Value(0);

//   Animated.timing(animatedOpacity, {
//     toValue: isModalVisible ? 1 : 0,
//     duration: 300,
//     useNativeDriver: true,
//   }).start();
//   return (
//     <View>
//       <Modal animationType="none" transparent={true} visible={isModalVisible}>
//         <TouchableOpacity style={{flex: 1}} onPress={toggleModal}>
//           <View style={{flex: 1}} />
//         </TouchableOpacity>
//         <Animated.View
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             backgroundColor: '#fff',
//             opacity: animatedOpacity,
//             transform: [
//               {
//                 translateY: animatedOpacity.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [400, 0],
//                 }),
//               },
//             ],
//           }}>
//           <Text>Modal content here</Text>
//         </Animated.View>
//       </Modal>
//       <TouchableOpacity>
//         <Text onPress={toggleModal}>Open</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// export default Delete;
