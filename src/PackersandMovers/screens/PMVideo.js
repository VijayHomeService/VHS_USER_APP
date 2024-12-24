import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getData} from '../../ApiServices/ApiServices';
import Video from 'react-native-video';
import {ApiUrl} from '../../ApiServices/ApiUrl';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function PMVideo() {
  const scrollViewRef = useRef(null);
  const videoRefs = useRef([]); // Use an array to manage multiple video refs

  const [imgActive, setImgActive] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);
  const [Data, setData] = useState([]);
  console.log('Data', Data);

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    try {
      const response = await getData(ApiUrl.GETVIDEOBANNER);

      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = imgActive < Data.length - 1 ? imgActive + 1 : 0;
      scrollViewRef.current.scrollTo({
        x: nextIndex * WIDTH,
        animated: true,
      });
      setImgActive(nextIndex);
    }, 3000); // Adjust the interval as needed

    return () => clearInterval(interval);
  }, [imgActive, Data.length]);

  const onChange = event => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / WIDTH);
    if (slide !== imgActive) {
      setImgActive(slide);
    }
  };

  const onLoad = () => {
    // Handle video load if necessary
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={onChange}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        style={styles.scrollView}>
        {Data.map((e, index) => (
          <View key={index.toString()} style={styles.imageContainer}>
            <Video
              ref={ref => (videoRefs.current[index] = ref)}
              source={{
                uri: e.videoLink,
              }}
              resizeMode="cover"
              repeat
              autoplay
              shouldPlay
              onLoad={onLoad}
              style={styles.video}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.wrapDot}>
        {Data.map((_, index) => (
          <Text
            key={index}
            style={imgActive === index ? styles.dotActive : styles.dot}>
            ●
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 20,
    backgroundColor: 'white',
  },
  scrollView: {
    width: WIDTH,
    height: HEIGHT * 0.23,
    marginTop: 10,
  },
  imageContainer: {
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden', // Ensure that content respects borderRadius
  },
  video: {
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
