import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {ApiUrl} from '../../ApiServices/ApiUrl';
import {getData} from '../../ApiServices/ApiServices';
import Video from 'react-native-video';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function Banner() {
  const scrollViewRef = useRef(null);
  const videoRef = useRef(null);

  const [imgActive, setImgActive] = React.useState(0);
  const [sliderImages, setSliderImages] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (imgActive < sliderImages.length - 1) {
        scrollViewRef.current.scrollTo({
          x: (imgActive + 1) * WIDTH,
          animated: true,
        });
      } else {
        scrollViewRef.current.scrollTo({x: 0, animated: true});
      }
    }, 3000); // Change the interval (in milliseconds) according to your needs

    return () => clearInterval(interval);
  }, [imgActive]);

  const onChange = event => {
    const slide = Math.ceil(
      event.contentOffset.x / event.layoutMeasurement.width,
    );
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };
  const [Data, setData] = useState([]);

  console.log('Data', Data);

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    try {
      const response = await getData(ApiUrl.BANNER);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const imagenew = Data.map(item => item.Bannerimg);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={({nativeEvent}) => onChange(nativeEvent)}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.scrollView}>
        {Data.map((e, index) => (
          <View key={index.toString()} style={styles.imageContainer}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{uri: e.Bannerimg}}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {imagenew.map((e, index) => (
          <Text
            key={e}
            style={imgActive === index ? styles.dotActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>

      {/* <Video
        source={{
          uri: 'https://vz-28b37692-9ae.b-cdn.net/0f4f1f37-068a-4f27-9e81-802e8829d242/playlist.m3u8',
        }}
        resizeMode="cover"
        repeat={true}
        paused={false}
        style={{width: '100%', height: 180}}
      /> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    width: WIDTH,
    height: HEIGHT * 0.23,
    marginTop: 10,
  },
  imageContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
  },
  image: {
    width: WIDTH - 20,
    height: HEIGHT * 0.23,
    borderRadius: 10,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: '#ffff',
  },
});
