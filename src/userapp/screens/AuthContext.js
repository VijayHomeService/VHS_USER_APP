import React from 'react'
import { View ,Text} from 'react-native'

import DeviceInfo from 'react-native-device-info';




function AuthContext() {




  return (
    <View><Text>
        {'Curreent App Version' + DeviceInfo.getVersion()}
        </Text></View>
  )
}

export default AuthContext