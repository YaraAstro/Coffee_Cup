import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../themes/theme'
import HeaderBar from '../components/HeaderBar'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

const FavouritesScreen = () => {
  
  const tabBarHeight = useBottomTabBarHeight()
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.themeBlack}/> 
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View style={[styles.InsideScrollView, {marginBottom: tabBarHeight}]}>
          <View style={{flex: 1}}>
            <HeaderBar title='Favourites' />
          </View>
        </View>
      </ScrollView>     
    </View>
  )
}

export default FavouritesScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.themeBlack
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  InsideScrollView: {
    flex: 1,
    justifyContent: 'space-between',
  },
})