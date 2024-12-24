import React from 'react';
import {View, TouchableOpacity, Linking, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use different icon sets based on your preference

function Socialmedia() {
  const handleOpenLink = url => {
    Linking.openURL(url);
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image
        source={require('../../../assets/social.png')}
        style={{
          width: '100%',
          height: 350,
          marginTop: 10,
          resizeMode: 'contain',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            padding: 10,

            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 12,
          }}
          onPress={() => handleOpenLink('https://www.facebook.com')}>
          <Icon name="facebook" size={40} color="#1877F2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            elevation: 12,
            borderRadius: 5,
            padding: 10,
            // borderColor: 'grey',
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleOpenLink('https://twitter.com/vijay_home_serv')}>
          <Icon name="twitter" size={40} color="#1DA1F2" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            // borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            // borderColor: 'grey',
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 12,
          }}
          onPress={() =>
            handleOpenLink('mailto:support@vijayhomeservices.com')
          }>
          <Icon name="envelope" size={40} color="#FF5733" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 5,
            padding: 10,

            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 12,
          }}
          onPress={() =>
            handleOpenLink('whatsapp://send?text=Hello&phone=+919611600990')
          }>
          <Icon name="whatsapp" size={40} color="#25D366" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
        }}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            padding: 10,

            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 12,
          }}
          onPress={() =>
            handleOpenLink('https://www.youtube.com/@vijayhomeservice')
          }>
          <Icon name="youtube" size={40} color="#FF0000" />
        </TouchableOpacity>
        {/* Instagram */}
        <TouchableOpacity
          onPress={() =>
            handleOpenLink(
              'https://www.instagram.com/vijayhomeservices/?igshid=NzZlODBkYWE4Ng%3D%3D&utm_source=qr',
            )
          }
          style={{
            borderRadius: 5,
            padding: 10,

            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 12,
          }}>
          <Icon name="instagram" size={40} color="#E4405F" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderRadius: 5,
            padding: 10,

            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 12,
          }}
          onPress={() =>
            handleOpenLink(
              'https://www.linkedin.com/posts/vijay-home-services_festivalseasonoffer-cleanhome-celebratewithcleanliness-activity-7116018589429637120-vD99?utm_source=share&utm_medium=member_desktop',
            )
          }>
          <Icon name="linkedin" size={40} color="#0077B5" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Socialmedia;
