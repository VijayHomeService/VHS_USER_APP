import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addToCart1, removeMyCartItem, clearCart} from './Redux1/MyCartSlice';
import {deleteMyCartItem} from './Redux1/MyCartSlice'; // Adjust the path as needed
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';

function Cart({navigation}) {
  const dispatch = useDispatch();

  const handle = item => {
    dispatch(addToCart1(item));
  };

  const MyCartItmes = useSelector(state => state.cart);
  console.log(MyCartItmes.lenght);

  const Carttotal = MyCartItmes.reduce((accumulator, item) => {
    const offerPrice = parseFloat(item?.offerprice);
    const quantity = parseInt(item?.qty);

    if (!isNaN(offerPrice) && !isNaN(quantity)) {
      const subtotal = offerPrice * quantity;

      return accumulator + subtotal;
    } else {
      return accumulator;
    }
  }, 0);

  

  const clear = () => {
    dispatch(clearCart());
  };

  
    const webViewRef = useRef(null);
  
    const [loading, setLoading] = useState(true);
    
    // URL for the video
    const videoUrl = "https://iframe.mediadelivery.net/play/212658/47f4ad74-ee8e-4541-b3d1-ea462987e39b";
  
    // Log WebView loading events
    const handleLoadStart = () => {
      console.log("WebView started loading");
      setLoading(true);
    };
  
    const handleLoad = () => {
      console.log("WebView loaded successfully");
      setLoading(false);
    };
  
    const handleError = (error) => {
      console.log("WebView error: ", error);
      setLoading(false);
    };
  
    const handleHttpError = (error) => {
      console.log("WebView HTTP error: ", error);
      setLoading(false);
    };
  

  return (
    <View style={styles.container}>
      {MyCartItmes ? (
        <View>
          <ScrollView>
            {MyCartItmes.map(item => (
              <View style={styles.card}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 0.7}}>
                    <View style={{marginLeft: 5}}>
                      <View></View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '600',
                          color: 'darkred',
                        }}>
                        {item.planName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: 'black',
                        }}>
                        {item.service?.serviceName}
                      </Text>

                      <View style={{flexDirection: 'row'}}>
                        <Text
                          style={{
                            marginLeft: 10,
                            color: 'grey',
                            textDecorationLine: 'line-through',
                          }}>
                          <FontAwesome name="rupee" size={14} />
                          {item.planPrice}
                        </Text>
                        <Text style={{marginLeft: 10, color: 'grey'}}>
                          <FontAwesome name="rupee" size={14} />{' '}
                          {item.offerprice}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flex: 0.3}}>
                    <View
                      style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <FontAwesome
                        name="rupee"
                        size={14}
                        color="black"
                        style={{marginTop: 4}}
                      />

                      <Text
                        style={{
                          textAlign: 'center',
                          marginLeft: 2,
                          color: 'black',
                          fontSize: 15,
                          fontWeight: '500',
                        }}>
                        {item.qty * item.offerprice}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        backgroundColor: 'green',
                        elevation: 15,
                        padding: 5,
                        justifyContent: 'center',
                        width: 100,
                      }}>
                      <TouchableOpacity
                        style={{}}
                        onPress={() => {
                          if (item.qty > 1) {
                            dispatch(removeMyCartItem(item));
                          } else {
                            dispatch(deleteMyCartItem(item.id));
                          }
                        }}>
                        <Text>
                          <AntDesign
                            name="minuscircleo"
                            size={18}
                            color="white"
                          />{' '}
                        </Text>
                      </TouchableOpacity>
                      <Text style={{color: 'orange', marginLeft: 5}}>
                        {item.qty}
                      </Text>

                      <TouchableOpacity
                        style={{marginLeft: 10}}
                        onPress={() => handle(item)}>
                        <Text>
                          <AntDesign
                            name="pluscircleo"
                            size={18}
                            color="white"
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{justifyContent: 'center', alignItems: 'center', top: '50%'}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
            {' '}
            No data found! Please add service
          </Text>
        </View>
      )}

<View style={{ marginTop: 50, alignItems: 'center' }}>
     
      <View
        style={{
          backgroundColor: 'darkred',
          paddingVertical: 10,
          paddingHorizontal: 20,
          
          marginBottom: 0, 
          width: 400,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          YEAR END SALE IS NOW LIVE!
        </Text>
      </View>

     
      <Video
        source={require('../../../assets/painting.webm')}
        ref={(ref) => {
          this.player = ref;
        }}
        onBuffer={this.onBuffer}
        onError={this.videoError}
        style={{ width: 400, height: 224 }}
        controls={false} 
        resizeMode="contain"
        muted={true} 
      />
    </View>
      {/* <TouchableOpacity onPress={clear}>
<Text>clear</Text>
      </TouchableOpacity > */}
      <View style={styles.btm}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            Total :
          </Text>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            {Carttotal}
          </Text>
        </View>
        {MyCartItmes !== undefined ? (
          <TouchableOpacity
            style={{
              backgroundColor: 'darkred',
              padding: 5,
              borderRadius: 5,
              width: 130,
            }}
            onPress={() => navigation.navigate('cartbook')}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 17,
                textAlign: 'center',
              }}>
              Continue
            </Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
  },
  card: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: 10,
  },
  remove: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'green',
    color: 'green',
    borderRadius: 5,
    // width: 100,
    textAlign: 'center',
  },
  btm: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Cart;
