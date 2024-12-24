import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import Video from 'react-native-video';

function Loader() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading for 2 seconds
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   // Clear the timer when the component unmounts
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      {/* {isLoading ? ( */}
      {/* <Video
        source={require('../../../assets/loader.mp4')}
        style={{
          width: 150,
          height: 150,
        }}
        muted={false}
        repeat={true}
        resizeMode="contain"
        paused={false} // Make sure video is playing while loading
        onError={e => console.log('Video error:', e)}
        onLoadStart={() => console.log('Video is loading...')}
        onLoad={() => console.log('Video loaded')}
      /> */}
      {/* ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )} */}
      <ActivityIndicator size="large" color="darkred" />
    </View>
  );
}

export default Loader;
