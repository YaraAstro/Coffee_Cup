import React from 'react'
import { COLORS } from '../themes/theme'
import { BlurView } from '@react-native-community/blur'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CustomIcons from '../components/CustomIcons'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarHideOnKeyboard : true,
      headerShown : false,
      tabBarShowLabel : false,
      tabBarStyle : styles.tabBarStyles,
      tabBarBackground : () => (
        <BlurView overlayColor='' blurAmount={15} style={styles.BlurStyles} />
      )
    }}>
        <Tab.Screen
            name='Home'
            component={HomeScreen}
            options={{
              tabBarIcon : ({ focused, color, size}) => (
                <CustomIcons name='home' size={25} color={ focused ? COLORS.themeLightOrange : COLORS.themeGray }/>
              )
            }}
        ></Tab.Screen>
        <Tab.Screen
            name='Cart'
            component={CartScreen}
            options={{
              tabBarIcon : ({ focused, color, size}) => (
                <CustomIcons name='cart' size={25} color={ focused ? COLORS.themeLightOrange : COLORS.themeGray }/>
              )
            }}
        ></Tab.Screen>
        <Tab.Screen
            name='Favourites'
            component={FavouritesScreen}
            options={{
              tabBarIcon : ({ focused, color, size}) => (
                <CustomIcons name='heart' size={25} color={ focused ? COLORS.themeLightOrange : COLORS.themeGray }/>
              )
            }}
        ></Tab.Screen>
        <Tab.Screen
            name='Orders'
            component={OrderHistoryScreen}
            options={{
              tabBarIcon : ({ focused, color, size}) => (
                <CustomIcons name='bell' size={25} color={ focused ? COLORS.themeLightOrange : COLORS.themeGray }/>
              )
            }}
        ></Tab.Screen>
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
  tabBarStyles : {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.themeDarkGayRGBA,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  BlurStyles : {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
})