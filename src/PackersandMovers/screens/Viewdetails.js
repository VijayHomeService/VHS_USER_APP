import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Video from 'react-native-video';
import YoutubePlayer from 'react-native-youtube-iframe';
import Arrow2 from '../../../assets/Arrows-02.svg';
import Arrow4 from '../../../assets/Arrow-04.svg';
import {ApiUrl} from '../../ApiServices/ApiUrl';
import RenderHTML from 'react-native-render-html';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {ZoomIn} from 'react-native-reanimated';

export default function Viewdetails({navigation, route}) {
  const deviceWidth = Dimensions.get('window').width;
  const service = route.params.serviceData;

  const [serviceIncludes, setServiceIncludes] = useState(true);
  const [serviceExcludes, setServiceExcludes] = useState(false);

  const background1 =
    'https://vijayahomeservices.b-cdn.net/Thoughtful%20creation%20video/Pest%20Control%20Video%20New%20(2).mp4';
  const background2 =
    'https://vijayahomeservices.b-cdn.net/Thoughtful%20creation%20video/Paint%201320.mp4';
  const testimonial = 'https://youtu.be/cNtoymcg154?si=AMPGinyqVIkvZtow';

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          zIndex: 11,
          padding: 5,
          margin: 10,
          borderRadius: 20,
        }}>
        <Ionicons name="arrow-back-circle-outline" color={'black'} size={25} />
      </TouchableOpacity>

      <Image
        source={{uri: ApiUrl.IMAGEURL + `/ServiceImage/${service.Serviceimg}`}}
        style={{width: deviceWidth, height: 250, resizeMode: 'stretch'}}
      />
      <ScrollView
        style={{
          padding: 15,
          backgroundColor: 'white',
          height: '100%',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'relative',
          top: -10,
        }}>
        {/* <ScrollView> */}
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            color: 'red',
          }}>
          Up to 20% Off
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 25,
            color: 'black',
          }}>
          {service.servicename}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <AntDesign name={'star'} size={15} color="#f1c139" />
          </View>
          <View style={{marginTop: 4, marginLeft: 2}}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 15,
                color: 'black',
              }}>
              4.3
            </Text>
          </View>
          <View style={{marginTop: 4, marginLeft: 2}}>
            <Text
              style={{
                fontFamily: 'Poppins-Light',
                fontSize: 13,
                color: 'black',
              }}>
              (1.3M Shiftings Completed)
            </Text>
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 17,
              color: 'black',
            }}>
            Description
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              color: 'black',
              //   letterSpacing: 0.6,
            }}>
            {service.desc}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: '#ebebeb',
            }}>
            <View style={{flex: 0.6}}>
              <TouchableOpacity
                onPress={() => {
                  setServiceIncludes(true);
                  setServiceExcludes(false);
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    textAlign: 'center',
                    color: serviceIncludes ? 'darkred' : '#8d8d8d',
                    fontWeight: serviceIncludes ? '800' : '',
                    letterSpacing: 0.6,
                  }}>
                  Service Includes
                </Text>
                <View
                  style={{
                    borderBottomColor: serviceIncludes
                      ? 'darkred'
                      : 'transparent',
                    borderBottomWidth: serviceIncludes ? 3 : 0,
                    position: 'relative',
                    top: 2,
                  }}></View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 0.6}}>
              <TouchableOpacity
                onPress={() => {
                  setServiceIncludes(false);
                  setServiceExcludes(true);
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    color: serviceExcludes ? 'darkred' : '#8d8d8d',
                    textAlign: 'center',
                    fontWeight: serviceExcludes ? '800' : '',
                    letterSpacing: 0.6,
                  }}>
                  Service Excludes
                </Text>
                <View
                  style={{
                    borderBottomColor: serviceExcludes
                      ? 'darkred'
                      : 'transparent',
                    borderBottomWidth: serviceExcludes ? 3 : 0,
                    position: 'relative',
                    top: 2,
                  }}></View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginTop: 10}}>
            {serviceIncludes
              ? service.includes?.map((htmlContent, index) => (
                  <RenderHTML
                    key={`includes-${index}`}
                    contentWidth={deviceWidth}
                    source={{html: htmlContent}}
                    tagsStyles={{
                      ul: {
                        paddingLeft: 20,
                      },
                      li: {
                        fontFamily: 'Poppins-Regular',
                        fontSize: 12,
                        color: 'black',
                        marginBottom: 5,
                        letterSpacing: 0.6,
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                    }}
                    renderers={{
                      li: ({TDefaultRenderer, ...props}) => (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TDefaultRenderer {...props} />
                        </View>
                      ),
                    }}
                  />
                ))
              : serviceExcludes
              ? service.exludes?.map((htmlContent, index) => (
                  <RenderHTML
                    key={`excludes-${index}`}
                    contentWidth={deviceWidth}
                    source={{html: htmlContent}}
                    tagsStyles={{
                      ul: {
                        paddingLeft: 20,
                      },
                      li: {
                        fontFamily: 'Poppins-Regular',
                        fontSize: 12,
                        color: 'black',
                        marginBottom: 5,
                        letterSpacing: 0.6,
                        flexDirection: 'row',
                        alignItems: 'center',
                      },
                    }}
                    renderers={{
                      li: ({TDefaultRenderer, ...props}) => (
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TDefaultRenderer {...props} />
                        </View>
                      ),
                    }}
                  />
                ))
              : null}
          </View>
        </View>
        {/* <View style={{marginVertical: 5}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 17,
              color: 'black',
            }}>
            Thoughtful curations
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 13,
              color: 'darkred',
            }}>
            Of our finest experiences
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Video
              source={{uri: background1}}
              style={{width: 150, height: 200, borderRadius: 10}}
              resizeMode="cover"
              repeat={true}
            />
          </View>
          <View>
            <Video
              source={{uri: background2}}
              style={{width: 150, height: 200}}
              resizeMode="cover"
              repeat={true}
            />
          </View>
        </View> */}
        <View style={{marginVertical: 15}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 17,
              color: 'black',
            }}>
            Testimonial Video
          </Text>
          <View style={{marginTop: 10}}>
            {/* <Video
              source={{uri: testimonial}}
              style={{width: deviceWidth, height: 200}}
              resizeMode="cover"
              repeat={true}
            /> */}
            <YoutubePlayer height={250} play={true} videoId={'YZXneUfb4hU'} />
          </View>
        </View>
        {/* <View style={{marginVertical: 15}}>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              fontSize: 17,
              color: 'black',
            }}>
            How we Work
          </Text>
          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#FFF1DB',
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 35,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  <Ionicons
                    name="document-text-outline"
                    size={35}
                    color={'#EF5A6F'}
                    style={styles.icon}
                  />
                </Text>
               
              </View>

              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 25,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  1
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 11,
                    color: 'black',
                  }}>
                  Share your shifting requirement
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 10,
                    color: 'black',
                  }}>
                  where do you want to move
                </Text>
              </View>
            </View>
            <View style={{position: 'absolute', left: 50, top: 50}}>
              <Arrow2 width={220} height={90} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 25,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  2
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 11,
                    color: 'black',
                  }}>
                  Receive Free instant Quote
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 10,
                    color: 'black',
                  }}>
                  your shifting instantly
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#FFF1DB',
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 35,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  <MaterialIcons
                    name="request-quote"
                    size={35}
                    color={'#EF5A6F'}
                    style={styles.icon}
                  />
                </Text>
              
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#FFF1DB',
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 35,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    size={35}
                    color={'#EF5A6F'}
                    style={styles.icon}
                  />
                </Text>
              
              </View>
              <View style={{position: 'absolute', left: 60, top: 50}}>
                <Arrow2 width={220} height={90} />
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 25,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  3
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 11,
                    color: 'black',
                  }}>
                  Assign Quality Service Expert
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 10,
                    color: 'black',
                  }}>
                  To ensure safe relocation
                </Text>
              </View>
            </View>
            <View style={{position: 'absolute', left: 50, top: -65}}>
              <Arrow4 width={220} height={90} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 50,
              }}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 25,
                    color: 'black',
                    textAlign: 'center',
                  }}>
                  4
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 13,
                    color: 'black',
                  }}>
                  Leave the Heavy Lifting to Us
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Light',
                    fontSize: 10,
                    color: 'black',
                  }}>
                  Enjoy hassle-free on-time movement
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#FFF1DB',
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 35,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  <Feather
                    name="truck"
                    size={35}
                    color={'#EF5A6F'}
                    style={styles.icon}
                  />
                </Text>
              
              </View>
            </View>
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
