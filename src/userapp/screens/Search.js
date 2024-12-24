import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';

function Search({navigation}) {
  const [searchlist, setSearchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // To store user's search query
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getsearch();
  }, []);

  const getsearch = async () => {
    let res = await axios.get(
      'https://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat',
    );
    if (res.status === 200) {
      setSearchlist(res.data?.subcategory);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchlist.filter(data => {
        const categoryMatches = data.category
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const subcategoryMatches = data.subcategory
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return categoryMatches || subcategoryMatches;
      });
      setFilteredResults(filtered);
    } else {
      setFilteredResults([]); // Clear the results when the search query is empty
    }
  }, [searchQuery, searchlist]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={[styles.textinput, styles.elevation]}
          placeholder="Search"
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          underlineColorAndroid={Platform.OS === 'android' ? 'white' : null}
        />
        <EvilIcons
          name="search"
          color="red"
          size={30}
          style={styles.textinputicon}
        />

        {searchQuery.length > 0 ? (
          // Render search results when a search query is entered
          filteredResults.map(data => (
            <TouchableOpacity
              onPress={() => navigation.navigate('repairing', {cdata: data})}
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,
                margin: 10,
              }}
              key={data._id}>
              <View style={{flex: 0.3}}>
                <Image
                  source={{
                    uri: `https://api.vijayhomesuperadmin.in/subcat/${data?.subcatimg}`,
                  }}
                  style={{
                    width: '100%',
                    height: 70,
                    borderRadius: 5,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{flex: 0.7, justifyContent: 'center', marginLeft: 15}}>
                <Text style={{color: 'black'}}>{data?.category}</Text>
                <Text style={{color: 'black'}}>{data?.subcategory}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'black'}}>No results found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  textinput: {
    margin: 15,
    borderRadius: 10,
    paddingLeft: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
    color: 'black',
    padding: 15,
  },
  textinputicon: {
    position: 'absolute',
    top: 27,
    marginLeft: 13,
    paddingLeft: 10,
  },
  textinputicon1: {
    position: 'absolute',
    top: 27,
    marginLeft: 13,
    paddingLeft: 10,
    right: 30,
  },
  elevation: {
    elevation: 2,
  },
});

export default Search;
