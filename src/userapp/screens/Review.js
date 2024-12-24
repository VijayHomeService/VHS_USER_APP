import React from 'react';
import StarRating from 'react-native-star-rating-widget';

function Review() {
  const [rating, setRating] = useState(0);

  return (
    <View style={{margin: 10}}>
      <View>
        <Text style={{color: 'black', fontWeight: 'bold', fontSize: 17}}>
          Bathroom Deep Cleaning
        </Text>
        <Text style={{color: 'black', fontSize: 13}}>3232u1861276128712</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}>
        <StarRating rating={rating} onChange={setRating} color="darkred" />
        <TouchableOpacity
          style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 5,
            width: 100,
            justifyContent: 'center',
            borderColor: 'darkred',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'darkred',
              fontWeight: 'bold',
            }}>
            {' '}
            Save Rating
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Review
        </Text>
        <TextInput
          style={{
            borderRadius: 10,
            elevation: 10,
            backgroundColor: 'white',
            color: 'black',
            marginTop: 10,
            textAlignVertical: 'top',
            height: 200,
          }}
          multiline={true}
          numberOfLines={6}
          underlineColorAndroid={Platform.OS === 'android' ? 'white' : null}
        />
      </View>

      <TouchableOpacity
        style={{
          borderWidth: 1,
          padding: 5,
          borderRadius: 5,
          width: 110,
          justifyContent: 'center',
          marginTop: 30,
          borderColor: 'darkred',
          flexDirection: 'row',
          alignSelf: 'flex-end',
          backgroundColor: 'darkred',
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}>
          Save Review
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Review;
