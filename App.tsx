/* By hitting 'rnfes' u can get general preset of tsx file

====================================================================================================

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})

====================================================================================================

*/

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React, { useEffect } from 'react'

import DetailsScreen from './src/screens/DetailsScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import TabNavigator from './src/navigators/TabNavigator'

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name='Tab' 
          component={TabNavigator} 
          options={{animation: 'slide_from_bottom'}}>
        </Stack.Screen>
        <Stack.Screen 
          name='Details' 
          component={DetailsScreen} 
          options={{animation: 'slide_from_bottom'}}>
        </Stack.Screen>
        <Stack.Screen 
          name='Payment' 
          component={PaymentScreen} 
          options={{animation: 'slide_from_bottom'}}>
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;