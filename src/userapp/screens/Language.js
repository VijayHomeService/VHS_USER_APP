import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RadioButton} from 'react-native-paper';

function Language() {
  const [checked, setChecked] = React.useState('first');
  return (
    <View style={styles.container}>
      <View style={{margin: 20}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>
          Pick your language
        </Text>

        <View style={{backgroundColor: 'white', flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={[styles.textinput, styles.elevation]}>
              English (US)
            </Text>
            <View style={{position: 'absolute', right: 10, top: 30}}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: '100%',
  },
  textinput: {
    borderRadius: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    fontSize: 18,
    marginTop: 20,
    padding: 15,
    color: 'black',
  },
  elevation: {
    elevation: 15,
  },
});
export default Language;
