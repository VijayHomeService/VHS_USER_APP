import React from 'react';
import Navigations from './src/Navigations';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {mystore} from './src/userapp/screens/Redux1/Mystore';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={mystore}>
        <Navigations />
      </Provider>
    </SafeAreaProvider>
  );
}
