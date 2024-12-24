import React from 'react';
import {Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {View} from 'react-native';
import Video from 'react-native-video';
import {useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

function ESuccess({navigation}) {
  const route = useRoute();
  const {data, appoTime, appoDate} = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'center',
        // alignContent: 'center',
      }}>
      <ScrollView>
        <Image
          source={require('../../../assets/booksuc.jpeg')}
          style={{
            width: '90%',
            height: 300,
            justifyContent: 'center',
            alignSelf: 'center',
            // resizeMode: 'cover',
            marginTop: 10,
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Video
            source={require('../../../assets/a.mp4')}
            style={{
              width: 50,
              height: 50,
              marginTop: 10,
            }}
            muted={false}
            repeat={true}
            resizeMode="contain"
            paused={false}
          />
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text
              style={{
                backgroundColor: '',
                color: 'black',
                padding: 5,
                fontSize: 18,
                fontWeight: '500',
                marginTop: 20,
              }}>
              {/* Thank for enquiry our executive will visit place as per scheduled ... */}
              {data?.serviceDirection === 'enquiry'
                ? 'Thank for enquiry our executive will visit place as per scheduled.'
                : ' Thanks for enquiry our team will call you shortly to discuss about the service.'}
            </Text>
          </View>
        </View>
        {/* <Text style={{textAlign:"center",color:"grey",marginBottom:10,fontSize:12}}>{data?._id}</Text> */}

        <View style={{margin: 15}}>
          <View style={{flexDirection: 'row', padding: 4}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '700',
                fontSize: 17,
                flex: 0.6,
              }}>
              Booking Details
            </Text>
          </View>
          <View style={{flexDirection: 'row', padding: 4}}>
            <Text style={{color: 'black', fontSize: 15, flex: 0.3}}>
              Service Name
            </Text>
            <Text style={{flex: 0.2, color: 'black'}}>:</Text>
            <Text style={{color: 'black', fontSize: 15, flex: 0.5}}>
              {data?.serviceName}
            </Text>
          </View>

          <View style={{flexDirection: 'row', padding: 4}}>
            <Text style={{color: 'black', fontSize: 15, flex: 0.3}}>
              Category
            </Text>
            <Text style={{flex: 0.2, color: 'black'}}>:</Text>
            <Text style={{color: 'black', fontSize: 15, flex: 0.3}}>
              {data?.category}
            </Text>
          </View>
          {data?.serviceDirection === 'enquiry' ? (
            <></>
          ) : (
            <View>
              <View style={{flexDirection: 'row', padding: 4}}>
                <Text style={{color: 'black', fontSize: 15, flex: 0.3}}>
                  Enquiry Date
                </Text>
                <Text style={{flex: 0.2, color: 'black'}}>:</Text>
                <Text style={{color: 'black', fontSize: 15, flex: 0.3}}>
                  {appoDate ? appoDate : '--'}
                </Text>
              </View>

              <View style={{flexDirection: 'row', padding: 4}}>
                <Text style={{color: 'black', fontSize: 15, flex: 0.3}}>
                  Selected Slot{' '}
                </Text>
                <Text style={{flex: 0.2, color: 'black'}}>:</Text>
                <Text style={{color: 'black', fontSize: 15, flex: 0.3}}>
                  {appoTime ? appoTime : '---'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('tab')}
        style={{
          backgroundColor: 'darkred',
          position: 'absolute',
          bottom: 10,
          width: '90%',
          padding: 8,
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          borderRadius: 5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Close
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default ESuccess;
